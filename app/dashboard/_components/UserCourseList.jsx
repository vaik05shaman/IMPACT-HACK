"use client";
import React, { useEffect,useState } from 'react'
import { useUser } from "@clerk/nextjs";
import { db } from "../../../configs/db";
import { CourseList } from "../../../configs/schema";
import { eq } from "drizzle-orm";
import CourseCard from "./CourseCard";
function UserCourseList() {
  const {user} = useUser();
  const [courseList, setCourseList] = useState([]);

  

  const getUserCourses = async () => {
    console.log("🔄 Fetching user courses from DB...");
     const result = await db
       .select()
      .from(CourseList)
      .where(
         eq(CourseList.createdBy, user?.primaryEmailAddress?.emailAddress)
       );
     console.log("✅ User Courses Fetched:", result);
     setCourseList(result );
    
  }

  useEffect(() => {
    if (user) {
      getUserCourses();
    }
  }, [user]);
  return (
    <div className='mt-10'>
      <h2 className='text-center font-bold text-2xl my-3'>Your Courses</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {courseList?.length>0?courseList?.map((course,index) => (
         <CourseCard course={course} key={index}/>
        )):
        [1,2,3,4].map((index) => (
          <div key={index} className='w-full rounded-lg animate-pulse bg-slate-200 h-[200px]'>
           </div>
        ))
         
          }
      </div>
      
    </div>
  )
}

export default UserCourseList
