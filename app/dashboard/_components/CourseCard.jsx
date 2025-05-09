import Link from 'next/link';
import React from 'react';
import { IoEllipsisVerticalSharp } from 'react-icons/io5';

function CourseCard({ course }) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 m-2 w-full sm:w-80 md:w-72 lg:w-64 flex flex-col">
      {/* Course Title */}
      <h2 className="font-bold text-lg sm:text-xl line-clamp-2">
        {course?.courseOutput?.['Course Name'] || 'Untitled Course'}
      </h2>

      {/* Image Link */}
      <Link href={`/course/${course?.courseId}`}>
        {course?.category === 'programming' && (
          <img
            src="/programming.svg"
            alt="programming"
            className="w-full h-32 sm:h-40 object-cover mt-2 rounded-md"
          />
        )}
        {course?.category === 'health' && (
          <img
            src="/health.jpg"
            alt="health"
            className="w-full h-32 sm:h-40 object-cover mt-2 rounded-md"
          />
        )}
        {course?.category === 'creative' && (
          <img
            src="/creative.jpg"
            alt="creative"
            className="w-full h-32 sm:h-40 object-cover mt-2 rounded-md"
          />
        )}
      </Link>

      {/* Description */}
      <p className="text-sm text-gray-400 mt-2 line-clamp-3">Course Description</p>

      {/* Category */}
      <div className="flex gap-2 items-center mt-2">
        <span className="text-sm capitalize">Category: {course?.category}</span>
      </div>

      {/* Start Button */}
      <button className="w-full mt-4 bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700 transition-colors">
        Start
      </button>
    </div>
  );
}

export default CourseCard;