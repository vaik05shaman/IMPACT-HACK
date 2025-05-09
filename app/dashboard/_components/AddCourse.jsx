"use client";

import { useUser } from "@clerk/nextjs";
import Link from "next/link";

import React from "react";

const AddCourse = () => {
  const { user } = useUser();

  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-2xl">
          Hello, <span className="font-bold">{user?.fullName || "Guest"}</span>
        </h2>
        <p className="text-sm text-gray-500">
          Create a new course with AI, share it with friends, and earn from it.
        </p>
      </div>
      <Link href={'/create-course'}>
      <button className="px-4 py-2 bg-blue-600 cursor-pointer text-white rounded-lg shadow hover:bg-blue-500 transition">
        + Create AI Course
      </button>
      </Link>
    </div>
  );
};

export default AddCourse;
