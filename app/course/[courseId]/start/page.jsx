"use client"

import React from 'react'
import { db } from "../../../../configs/db";
import { Chapters, CourseList } from "../../../../configs/schema";
import { and, eq } from "drizzle-orm";
import { useState, useEffect } from 'react';
import ChapterListCard from './_components/ChapterListCard';
import ChapterContent from './_components/ChapterContent';
import Header from '../../../../app/_components/Header';
import Footer from '../../../../app/_components/Footer';

function CourseStart({ params }) {
    const [course, setCourse] = useState([]);
    const [selectedChapter, setSelectedChapter] = useState();
    const [chapterContent, setChapterContent] = useState();

    useEffect(() => {
        if (params?.courseId) {
            GetCourse();
        }
    }, [params]);

    const GetCourse = async () => {
        try {
            console.log("🔄 Fetching course from DB...");
            const result = await db
                .select()
                .from(CourseList)
                .where(
                    and(
                        eq(CourseList.courseId, params?.courseId),
                    )
                );

            console.log("✅ Course Data Fetched:", result);
            setCourse(result[0]);
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
                    )
                );
          
            setChapterContent(result[0]);
            console.log("✅ Chapter Content Fetched:", result);
        } catch (error) {
            console.error("❌ Error fetching chapter:", error);
        }
    }

    const handleChapterSelect = (index) => {
        const chapter = course?.courseOutput?.Chapters[index];
        setSelectedChapter(chapter);
        GetChapterContent(index);
    };

    return (
        <div className="min-h-screen w-full">
            <Header />
            {/* Mobile Chapter Dropdown */}
            <div className="md:hidden mb-6 sm:mb-8">
                <select
                    className="w-full p-2 sm:p-3 border border-gray-300 rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary"
                    onChange={(e) => handleChapterSelect(e.target.value)}
                    value={course?.courseOutput?.Chapters?.findIndex(ch => ch["Chapter Name"] === selectedChapter?.["Chapter Name"]) || ''}
                >
                    <option value="" disabled>Select a Chapter</option>
                    {course?.courseOutput?.Chapters?.map((chapter, index) => (
                        <option key={index} value={index}>
                            {index + 1}. {chapter["Chapter Name"]}
                        </option>
                    ))}
                </select>
            </div>
            {/* Desktop Sidebar */}
            <div className="hidden md:flex w-full">
                <div className="w-72 h-[calc(100vh-4rem)] border-r border-gray-200 bg-white overflow-y-auto">
                    <h2 className="text-lg sm:text-xl font-medium p-3 sm:p-4">{course?.courseOutput?.["Course Name"]}</h2>
                    <div>
                        {course?.courseOutput?.Chapters?.map((chapter, index) => (
                            <div
                                key={index}
                                className={`cursor-pointer hover:bg-slate-300 p-2 sm:p-3 ${
                                    selectedChapter?.["Chapter Name"] === chapter["Chapter Name"] ? 'bg-slate-300' : ''
                                }`}
                                onClick={() => {
                                    setSelectedChapter(chapter);
                                    GetChapterContent(index);
                                }}
                            >
                                <ChapterListCard chapter={chapter} index={index} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-3/4 p-4 sm:p-6">
                    <ChapterContent chapter={selectedChapter} content={chapterContent} />
                </div>
            </div>
            {/* Mobile Content */}
            <div className="md:hidden w-full">
                <ChapterContent chapter={selectedChapter} content={chapterContent} />
            </div>
            <Footer />
        </div>
    )
}

export default CourseStart