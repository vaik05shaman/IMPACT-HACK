"use client";

import { db } from "../../../configs/db";
import { Chapters, CourseList } from "../../../configs/schema";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import CourseBasicInfo from "./_components/CourseBasicinfo";
import CourseDetail from "./_components/CourseDetail";
import SelectOption from "../_components/SelectOption";
import ChapterList from "./_components/ChapterList";
import { Button } from "../../../components/ui/button";
import { generateChapterContent_AI } from "../../../configs/AiModel";
import { Loader } from "lucide-react";
import service from "../../../configs/service";
import { useRouter } from "next/navigation";

function CourseLayout({ params }) {
  const { user } = useUser();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (params?.courseId && user) {
      GetCourse();
    }
  }, [params, user]); // ✅ Ensures course is fetched when params/user change

  const GetCourse = async () => {
    try {
      console.log("🔄 Fetching course from DB...");
      const result = await db
        .select()
        .from(CourseList)
        .where(
          and(
            eq(CourseList.courseId, params?.courseId), // ✅ Fixed syntax
            eq(CourseList.createdBy, user?.primaryEmailAddress?.emailAddress)
          )
        );

      console.log("✅ Course Data Fetched:", result);
      setCourse(result[0] || null); // ✅ Avoids undefined state
      console.log("📌 Updated Course State:", result[0]);
    } catch (error) {
      console.error("❌ Error fetching course:", error);
    }
  };

  const GenerateCourseContent = async () => {
    setLoading(true);
    const chapters = course?.courseOutput?.Chapters;
    const courseName = course?.courseOutput?.["Course Name"];
    let index = 0;
    for (const chapter of chapters) {
      const prompt = `Explain the concept in Detail on Topic: ${courseName}, Chapter: ${chapter["Chapter Name"]} in JSON Format with list of array with field as title, explanation on given chapter in detail, Code Example (Code field in <precode> format) if applicable`;
      index++;
      try {

        let videoId = '';
        service.getVideos(`${courseName} ${chapter["Chapter Name"]}`).then(async (videos) => {
          console.log(videos);
          videoId = videos[0]?.id?.videoId;
        }
        );
        const result = await generateChapterContent_AI.sendMessage(prompt);
        console.log(result?.response?.text());
        const content = JSON.parse(result?.response?.text());

        await db.insert(Chapters).values({
          courseId: course.courseId,
          chapterId: index,
          content: content,
          videoId: videoId,
        }).returning({id:Chapters.id});

      } catch (e) {
        setLoading(false);
        console.error(e);
      }
      await db.update(CourseList).set({
        publish: true,
      });

      router.replace(`/create-course/${course.courseId}/finish`);
    }


  };




  return (
    <div className="mt-10 px-7 md:px-20 lg:px-44">
      <h2 className="font-bold text-center text-2xl">Course Layout</h2>

      {/* 🔍 Debugging Component Rendering */}
      {course ? (
        <>
          {loading && <Loader className="mx-auto mt-10" size={64} />}
          <CourseBasicInfo course={course} refreshData={() => GetCourse} />
          <CourseDetail course={course} />
          <ChapterList course={course} refreshData={() => GetCourse} />

          <Button className="my-10 cursor-pointer" onClick={() => GenerateCourseContent()}>Generate course content</Button>

        </>
      ) : (
        <p className="text-center mt-5 text-gray-500">
          Loading or No Course Found
        </p>
      )}
    </div>
  );
}

export default CourseLayout;
