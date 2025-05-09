"use client";

import { db } from "../../../configs/db";
import { Chapters, CourseList } from "../../../configs/schema";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import CourseBasicInfo from "./_components/CourseBasicinfo";
import CourseDetail from "./_components/CourseDetail";
import ChapterList from "./_components/ChapterList";
import { Button } from "../../../components/ui/button";
import { generateChapterContent_AI } from "../../../configs/AiModel";
import { Loader } from "lucide-react";
import service from "../../../configs/service";
import Link from "next/link";

function CourseLayout({ params }) {
  const { user } = useUser();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [contentGenerated, setContentGenerated] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (params?.courseId && user) {
      GetCourse();
    }
  }, [params, user]);

  const GetCourse = async () => {
    try {
      console.log("🔄 Fetching course from DB...");
      const result = await db
        .select()
        .from(CourseList)
        .where(
          and(
            eq(CourseList.courseId, params?.courseId),
            eq(CourseList.createdBy, user?.primaryEmailAddress?.emailAddress)
          )
        );

      console.log("✅ Course Data Fetched:", result);
      setCourse(result[0] || null);
      console.log("📌 Updated Course State:", result[0]);
    } catch (error) {
      console.error("❌ Error fetching course:", error);
      setError("Failed to load course data. Please try again.");
    }
  };

  const GenerateCourseContent = async () => {
    setLoading(true);
    setError(null);
    try {
      const chapters = course?.courseOutput?.Chapters;
      const courseName = course?.courseOutput?.["Course Name"];
      if (!chapters || chapters.length === 0) {
        throw new Error("No chapters found for the course.");
      }

      // Generate content for all chapters
      for (let index = 0; index < chapters.length; index++) {
        const chapter = chapters[index];
        const prompt = `Explain the concept in Detail on Topic: ${courseName}, Chapter: ${chapter["Chapter Name"]} in JSON Format with list of array with field as title, explanation on given chapter in detail, Code Example (Code field in <precode> format) if applicable`;

        // Fetch video ID with retry logic
        let videoId = "";
        let attempts = 0;
        const maxAttempts = 2;
        while (attempts < maxAttempts) {
          try {
            const videos = await service.getVideos(`${courseName} ${chapter["Chapter Name"]}`);
            console.log(`🎥 Videos Fetched for Chapter ${index + 1}:`, videos);
            videoId = videos[0]?.id?.videoId || "";
            if (videoId) break; // Exit loop if video ID is found
            attempts++;
            console.log(`🔄 Retrying video fetch for Chapter ${index + 1} (Attempt ${attempts + 1})`);
          } catch (e) {
            console.error(`❌ Error fetching video for Chapter ${index + 1}:`, e);
            attempts++;
            if (attempts === maxAttempts) {
              console.warn(`⚠️ No video ID for Chapter ${index + 1} after ${maxAttempts} attempts`);
              videoId = "";
            }
          }
        }

        // Generate AI content
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
      }

      // Update course to published
      await db
        .update(CourseList)
        .set({ publish: true })
        .where(eq(CourseList.courseId, course.courseId));

      setContentGenerated(true);
      console.log("✅ All chapters generated and course published");
    } catch (e) {
      console.error("❌ Error generating content:", e);
      setError(e.message || "Failed to generate course content. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-10 px-7 md:px-20 lg:px-44">
      <h2 className="font-bold text-center text-2xl">Course Layout</h2>

      {course ? (
        <>
          <CourseBasicInfo course={course} refreshData={GetCourse} />
          <CourseDetail course={course} />
          <ChapterList course={course} refreshData={GetCourse} />

          <div className="my-10 flex flex-col items-center gap-4">
            {loading && <Loader className="mx-auto animate-spin" size={48} />}
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            {!contentGenerated ? (
              <>
                <Button
                  className="w-full max-w-xs cursor-pointer bg-blue-600 hover:bg-blue-700"
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
                <Link href={`/course/${course.courseId}/start`}>
                <Button className="w-full max-w-xs cursor-pointer bg-blue-500 hover:bg-blue-500">
                  Start Course
                </Button>
              </Link>
              </>
            ) : (
              <Link href={`/course/${course.courseId}/start`}>
                <Button className="w-full max-w-xs cursor-pointer bg-green-600 hover:bg-green-700">
                  Start Course
                </Button>
              </Link>
            )}
          </div>
        </>
      ) : (
        <div className="text-center mt-10">
          <Loader className="mx-auto animate-spin" size={48} />
          <p className="text-gray-500 mt-4">Loading course data...</p>
        </div>
      )}
    </div>
  );
}

export default CourseLayout;