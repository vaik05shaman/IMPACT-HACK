"use client";

import { db } from "../../../configs/db";
import { CourseList } from "../../../configs/schema";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import CourseBasicInfo from "./_components/CourseBasicinfo";
import CourseDetail from "./_components/CourseDetail";

function CourseLayout({ params }) {
  const { user } = useUser();
  const [course, setCourse] = useState(null);

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
    <div className="mt-10 px-7 md:px-20 lg:px-44">
      <h2 className="font-bold text-center text-2xl">Course Layout</h2>

      {/* 🔍 Debugging Component Rendering */}
      {course ? (
        <>
          <CourseBasicInfo course={course} />
          <CourseDetail course={course} />
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
