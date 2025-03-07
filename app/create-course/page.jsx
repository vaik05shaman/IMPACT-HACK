"use client";
import React, { useState, useContext, useEffect } from "react";
import { HiMiniSquares2X2 } from "react-icons/hi2";
import SelectCategory from "./_components/SelectCategory.jsx";
import TopicDescription from "./_components/TopicDescription.jsx"; 
import SelectOption from "./_components/SelectOption.jsx";
import { UserInputContext } from "../_context/UserInputContext.jsx";
import { GenerateCourseLayout_AI } from "./../../configs/AiModel";
import { CourseList } from "./../../configs/schema";
import { db } from "./../../configs/db";

import { v4 as uuidv4 } from "uuid";
import { useUser } from '@clerk/nextjs';
import { useRouter } from "next/navigation"; // ✅ Correct import

const CreateCourse = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);
  const { user } = useUser();
  const router = useRouter();  // ✅ Fixed: Use `useRouter()` correctly

  useEffect(() => {
    console.log(userCourseInput);
  }, [userCourseInput]);

  const StepperOptions = [
    { id: 1, name: "Category", icon: <HiMiniSquares2X2 /> },
    { id: 2, name: "Topic & Description", icon: <HiMiniSquares2X2 /> },
    { id: 3, name: "Options", icon: <HiMiniSquares2X2 /> },
  ];

  const checkStatus = () => {
    if (!userCourseInput || Object.keys(userCourseInput).length === 0) return true;
    if (activeIndex === 0 && (!userCourseInput.category || userCourseInput.category.trim().length === 0)) return true;
    if (activeIndex === 1 && (!userCourseInput.topic || userCourseInput.topic.trim().length === 0)) return true;
    return false;
  };

  const GenerateCourseLayout = async () => {
    setLoading(true);

    const BASIC_PROMPT = "Generate a Course Tutorial with the following fields: Course Name, Description, Chapter Name, About, Duration.";
    const USER_INPUT_PROMPT = `
      Category: ${userCourseInput?.category}, 
      Topic: ${userCourseInput?.topic}, 
      Level: ${userCourseInput?.level}, 
      Duration: ${userCourseInput?.duration}, 
      No of Chapters: ${userCourseInput?.numOfChapters}
      Format response in JSON.
    `;

    const FINAL_PROMPT = `${BASIC_PROMPT} ${USER_INPUT_PROMPT}`;
    
    try {
      const result = await GenerateCourseLayout_AI.sendMessage(FINAL_PROMPT);
      const responseText = await result.response.text();  

      console.log("Raw API Response:", responseText);
      
      const parsedData = JSON.parse(responseText);
      console.log("Parsed JSON Response:", parsedData);
      
      await SaveCourseLayoutInDb(parsedData);  
    } catch (error) {
      console.error("Error generating course layout:", error);
    }

    setLoading(false);
  };

  const SaveCourseLayoutInDb = async (courseLayout) => {
    const id = uuidv4();  // Ensure `courseId` is a string
    setLoading(true);

    try {
      const result = await db.insert(CourseList).values({
        courseId: id,
        name: userCourseInput?.topic,
        level: userCourseInput?.level,
        category: userCourseInput?.category,
        courseOutput: courseLayout,
        createdBy: user?.primaryEmailAddress?.emailAddress,
        userName: user?.fullName,              
        userProfileImage: user?.imageUrl       
      });

      console.log("Course successfully saved in DB:", result);
      router.replace(`/create-course/${id}`); // ✅ Fixed navigation
    } catch (error) {
      console.error("Error saving course to DB:", error);
    }

    setLoading(false);
  };

  return (
    <div className="p-5">
      {/* Heading */}
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-4xl text-primary font-medium">Create Course</h2>
      </div>

      {/* Stepper */}
      <div className="flex mt-10 justify-center">
        {StepperOptions.map((item, index) => (
          <div key={item.id} className="flex items-center">
            <div className="flex flex-col items-center w-[50px] md:w-[100px]">
              <div
                className={`p-3 rounded-full text-white ${
                  activeIndex >= index ? "bg-primary" : "bg-gray-200"
                }`}
              >
                {item.icon}
              </div>
              <h2 className="hidden md:block md:text-sm">{item.name}</h2>
            </div>

            {index !== StepperOptions.length - 1 && (
              <div
                className={`h-1 w-[50px] md:w-[100px] lg:w-[170px] rounded-full ${
                  activeIndex > index ? "bg-purple-500" : "bg-gray-300"
                }`}
              ></div>
            )}
          </div>
        ))}
      </div>

      {/* Dynamic Step Content */}
      <div className="px-10 md:px-20 lg:px-44 mt-10">
        {activeIndex === 0 ? <SelectCategory /> : activeIndex === 1 ? <TopicDescription /> : <SelectOption />}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-10">
          <button
            disabled={activeIndex === 0}
            className={`px-4 py-2 border rounded ${
              activeIndex === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"
            }`}
            onClick={() => setActiveIndex(activeIndex - 1)}
          >
            Previous
          </button>

          {activeIndex === 2 ? (
            <button
              disabled={checkStatus() || loading}
              className={`px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 ${
                checkStatus() || loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={GenerateCourseLayout}
            >
              {loading ? "Generating..." : "Generate Course Layout"}
            </button>
          ) : (
            <button
              disabled={checkStatus()}
              className={`px-4 py-2 text-white rounded ${
                checkStatus() ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
              }`}
              onClick={() => setActiveIndex(activeIndex + 1)}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateCourse;
