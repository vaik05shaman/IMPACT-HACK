"use client";
import { db } from "../../../../configs/db";
import React from 'react'
import { useState, useEffect } from 'react';
import { useUser } from "@clerk/nextjs";
import ChapterList from "./../_components/ChapterList";
import CourseBasicInfo from "../_components/CourseBasicinfo";
import { and, eq } from "drizzle-orm";
import { Chapters, CourseList } from "../../../../configs/schema";
function page({params}) {
    const { user } = useUser();
      const [course, setCourse] = useState(null);
      const [loading, setLoading] = useState(false);
      
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
    
  return (
    <div className="px-10 md:px-20 lg:px-44 my-7">
       <h2 className="text-center font-bold text-2xl my-3">Congrats Your Course is Ready</h2>


     <CourseBasicInfo course={course} />
    </div>
  )
}

export default page

