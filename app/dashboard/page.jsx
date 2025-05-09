"use client";

import React from "react";
import { UserButton } from "@clerk/nextjs";
import AddCourse from "./_components/AddCourse";
import UserCourseList from "./_components/UserCourseList";

function Dashboard() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-black">Welcome to Your Dashboard</h1>
        {/* <UserButton /> */}
      </div>
      <AddCourse />
      <UserCourseList />
    </div>
  );
}

export default Dashboard;