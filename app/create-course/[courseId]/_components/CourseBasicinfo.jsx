import React, { useState, useRef } from "react";
import Image from "next/image";
import { Button } from "../../../../components/ui/button.jsx";
import { HiOutlinePuzzlePiece } from "react-icons/hi2";
import Link from "next/link.js";
import EditCourseBasicInfo from "./EditCourseBasicInfo.jsx";
import { db } from "../../../../configs/db";
import { Chapters, CourseList } from "../../../../configs/schema";
import { eq } from "drizzle-orm";
import { generateChapterContent_AI } from "../../../../configs/AiModel";
import { Loader } from "lucide-react";
import service from "../../../../configs/service";

// Utility function to delay execution
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const CourseBasicInfo = ({ course, refreshData }) => {
  const [loading, setLoading] = useState(false);
  const [contentGenerated, setContentGenerated] = useState(false);
  const [error, setError] = useState(null);
  const [videoErrors, setVideoErrors] = useState([]);
  const loaderRef = useRef(null);

  if (!course) return <p className="text-center text-gray-500">Course data not available.</p>;

  const courseName = course?.courseOutput?.["Course Name"] || "Untitled Course";
  const courseDescription = course?.courseOutput?.["Description"] || "No description available.";

  const GenerateCourseContent = async () => {
    setLoading(true);
    setError(null);
    setVideoErrors([]);

    // Scroll to loader
    if (loaderRef.current) {
      loaderRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    let chaptersGenerated = 0;
    try {
      const chapters = course?.courseOutput?.Chapters;
      if (!chapters || chapters.length === 0) {
        throw new Error("No chapters found for the course.");
      }
      if (!course.courseId) {
        throw new Error("Invalid course ID.");
      }

      // Generate content for all chapters
      for (let index = 0; index < chapters.length; index++) {
        const chapter = chapters[index];
        const baseQuery = `${courseName} ${chapter["Chapter Name"]}`;
        let videoId = "";
        let attempts = 0;
        const maxAttempts = 3;

        // Try primary and fallback queries
        const queries = [
          baseQuery,
          `${courseName} ${chapter["Chapter Name"]} tutorial`, // More specific
          `${courseName} basics`, // Fallback for generic chapters
        ];

        while (attempts < maxAttempts) {
          const currentQuery = queries[Math.min(attempts, queries.length - 1)];
          console.log(`🔍 Video search query for Chapter ${index + 1}: "${currentQuery}"`);
          try {
            const videos = await service.getVideos(currentQuery);
            console.log(`🎥 Videos Fetched for Chapter ${index + 1}:`, videos);
            videoId = videos[0]?.id?.videoId || "";
            console.log(`📹 Video ID for Chapter ${index + 1}: ${videoId || "None"}`);
            if (videoId) break;
            attempts++;
            console.log(`🔄 Retrying video fetch for Chapter ${index + 1} (Attempt ${attempts + 1})`);
          } catch (e) {
            console.error(`❌ Error fetching video for Chapter ${index + 1}:`, e.message);
            attempts++;
            if (attempts === maxAttempts) {
              console.warn(`⚠️ No video ID for Chapter ${index + 1} after ${maxAttempts} attempts`);
              setVideoErrors((prev) => [
                ...prev,
                `No video found for Chapter ${index + 1}: ${chapter["Chapter Name"]}`,
              ]);
              videoId = "";
            }
          }
          // Delay to avoid rate limiting
          if (attempts < maxAttempts) {
            await delay(1000); // 1-second delay between attempts
          }
        }

        // Generate AI content
        const prompt = `Explain the concept in Detail on Topic: ${courseName}, Chapter: ${chapter["Chapter Name"]} in JSON Format with list of array with field as title, explanation on given chapter in detail, Code Example (Code field in <precode> format) if applicable`;
        let content;
        try {
          const result = await generateChapterContent_AI.sendMessage(prompt);
          console.log(`🤖 AI Response for Chapter ${index + 1}:`, result?.response?.text());
          content = JSON.parse(result?.response?.text());
        } catch (e) {
          console.error(`❌ Error generating AI content for Chapter ${index + 1}:`, e);
          throw new Error(`Failed to generate content for Chapter ${index + 1}`);
        }

        // Insert chapter content into DB
        await db
          .insert(Chapters)
          .values({
            courseId: course.courseId,
            chapterId: index + 1,
            content: content,
            videoId: videoId,
          })
          .returning({ id: Chapters.id });

        console.log(`✅ Chapter ${index + 1} content generated with videoId: ${videoId}`);
        chaptersGenerated++;

        // Delay between chapters to avoid API overload
        if (index < chapters.length - 1) {
          await delay(1000); // 1-second delay between chapters
        }
      }

      // Update course to published
      try {
        await db
          .update(CourseList)
          .set({ publish: true })
          .where(eq(CourseList.courseId, course.courseId));
        console.log("✅ Course published successfully");
      } catch (e) {
        console.error("❌ Error publishing course:", e);
      }

      setContentGenerated(true);
      console.log(`✅ ${chaptersGenerated} chapters generated and course processing complete`);
      refreshData();
    } catch (e) {
      console.error("❌ Error generating content:", e);
      setError(e.message || "Failed to generate course content. Please try again.");
      if (chaptersGenerated > 0) {
        setContentGenerated(true);
        console.log(`✅ Partial generation: ${chaptersGenerated} chapters generated`);
        try {
          await db
            .update(CourseList)
            .set({ publish: true })
            .where(eq(CourseList.courseId, course.courseId));
          console.log("✅ Course published after partial generation");
        } catch (publishError) {
          console.error("❌ Error publishing course after partial generation:", publishError);
        }
        refreshData();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10 border rounded-xl shadow-sm mt-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Left Side - Course Info */}
        <div>
          <h2 className="font-bold text-3xl">
            {courseName} <EditCourseBasicInfo course={course} />
          </h2>
          <p className="text-sm text-gray-400 mt-3">{courseDescription}</p>
          <h2 className="font-medium mt-2 flex gap-2 items-center">
            <HiOutlinePuzzlePiece /> {course?.category || "No category"}
          </h2>
          <div className="mt-5 flex flex-col gap-2">
            {loading && (
              <div ref={loaderRef} className="flex flex-col items-center gap-2">
                <Loader className="animate-spin" size={48} />
                <p className="text-gray-600 text-sm text-center">
                  Please wait, it may take 5-7 minutes to generate course content.
                </p>
              </div>
            )}
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            {videoErrors.length > 0 && (
              <div className="text-yellow-600 text-sm text-center">
                {videoErrors.map((err, idx) => (
                  <p key={idx}>{err}</p>
                ))}
              </div>
            )}
            {!contentGenerated ? (
              <>
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={GenerateCourseContent}
                  disabled={loading || !course}
                >
                  {loading ? "Generating..." : "Generate Course Content"}
                </Button>
                {!course && (
                  <p className="text-gray-500 text-sm text-center">
                    Please wait for course data to load before generating content.
                  </p>
                )}
              </>
            ) : (
              <Link href={`/course/${course?.courseId}/start`}>
                <Button className="w-full bg-green-600 hover:bg-green-700">Start Course</Button>
              </Link>
            )}
          </div>
        </div>

        {/* Right Side - Course Image */}
        <div>
          <Image
            src={course?.image || "/programming.svg"}
            width={250}
            height={200}
            className="w-full rounded-xl h-[320px] object-cover"
            alt="Course Image"
          />
        </div>
      </div>
    </div>
  );
};

export default CourseBasicInfo;