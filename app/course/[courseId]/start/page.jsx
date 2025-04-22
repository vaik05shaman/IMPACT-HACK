"use client"

import React from 'react'
import { db } from "../../../../configs/db";
import { Chapters, CourseList } from "../../../../configs/schema";
import { and, eq } from "drizzle-orm";
import { useState, useEffect } from 'react';
import ChapterListCard from './_components/ChapterListCard';
import ChapterContent from './_components/ChapterContent';

function CourseStart({ params }) {
    const [course, setCourse] = useState([])
    const [selectedChapter, setSelectedChapter] = useState();
    const [chapterContent, setChapterContent] = useState();

    useEffect(() => {
        if (params?.courseId) {
            GetCourse();
        }
    }, [params]); // ✅ Ensures course is fetched when params/user change

    const GetCourse = async () => {
        try {
            console.log("🔄 Fetching course from DB...");
            const result = await db
                .select()
                .from(CourseList)
                .where(
                    and(
                        eq(CourseList.courseId, params?.courseId), // ✅ Fixed syntax

                    )
                );

            console.log("✅ Course Data Fetched:", result);
            setCourse(result[0]); // ✅ Avoids undefined state
            console.log("📌 Updated Course State:", result[0]);
        } catch (error) {
            console.error("❌ Error fetching course:", error);
        }
    }

    const GetChapterContent = async (chapterId) => {
        try {
            console.log("🔄 Fetching chapter content from DB...");
            const result = await db
                .select()
                .from(Chapters)
                .where(
                    and(
                        eq(Chapters?.chapterId, chapterId),
                        eq(Chapters?.courseId, course?.courseId)
                        // ✅ Fixed syntax

                    )
                );
          
            setChapterContent(result[0]);
            console.log("✅ Chapter Content Fetched:", result);

        } catch (error) {
            console.error("❌ Error fetching chapter:", error);
        }
    }

    return (
        <div>

            <div className='fixed md:w-72 hidden md:block h-screen border-r border-gray-200'>
                <h2 className='text-xl font-medium p-3'>{course?.courseOutput?.["Course Name"]}</h2>
                <div>
                    {course?.courseOutput?.Chapters?.map((chapter, index) => (
                        <div key={index} className={`

                cursor-pointer hover:bg-slate-300
                ${selectedChapter?.["Chapter Name"] === chapter["Chapter Name"] && 'bg-slate-300'}

                `}
                            onClick={() => {
                                setSelectedChapter(chapter)
                                GetChapterContent(index)
                            }}
                        >
                            <ChapterListCard chapter={chapter} index={index} />
                        </div>
                    ))}
                </div>



            </div>
            <div className='md:ml-75 md:w-3/4 p-5'>

                <ChapterContent chapter={selectedChapter} content={chapterContent} />

            </div>
        </div>
    )
}

export default CourseStart
