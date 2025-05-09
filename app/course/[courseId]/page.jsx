"use client"
import React, { useEffect, useState } from 'react'
import { db } from "../../../configs/db";
import { CourseList } from "../../../configs/schema";
import { and, eq } from "drizzle-orm";
import CourseBasicInfo from '../../create-course/[courseId]/_components/CourseBasicinfo';
import Header from '../../../app/_components/Header';
import CourseDetail from '../../create-course/[courseId]/_components/CourseDetail';
import ChapterList from '../../create-course/[courseId]/_components/ChapterList';


function Course({params}) {
    const [course, setCourse] = useState([])

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

      useEffect(() => {
        if (params?.courseId) {
          GetCourse();
        }
      }, [params]); // ✅ Ensures course is fetched when params/user change
  return (
    <div>
        <Header/>
        <div className='px-10 p-10 md:px-20 lg:px-44 my-7'>
        <CourseBasicInfo course={course} />
        <CourseDetail course={course} />
        <ChapterList course={course} /> 
        </div>
      
    </div>
  )
}

export default Course
