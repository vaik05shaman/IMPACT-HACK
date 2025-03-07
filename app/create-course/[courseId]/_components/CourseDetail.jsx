import React from "react";
import { HiOutlineChartBar } from "react-icons/hi2";

function CourseDetail({ course }) {
  if (!course) return <p className="text-center text-gray-500">Course details not available.</p>;

  // Extract values safely from AI-generated `courseDataOutput`
  const skillLevel = course?.courseOutput?.["Level"] || "Not specified";
  const duration = course?.courseOutput?.["Duration"] || "Not specified";
  const numberOfChapters = course?.courseOutput?.["No of Chapters"] || "Not specified";
  const videoIncluded = course?.includeVideo ? "Yes" : "No";

  return (
    <div className="border p-6 rounded-xl shadow-sm mt-3">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        
        {/* Skill Level */}
        <div className="flex gap-2 items-center">
          <HiOutlineChartBar className="text-4xl text-primary" />
          <div>
            <h2 className="text-xs text-gray-500">Skill Level</h2>
            <h2 className="font-medium text-lg">{skillLevel}</h2>
          </div>
        </div>

        {/* Duration */}
        <div className="flex gap-2 items-center">
          <HiOutlineChartBar className="text-4xl text-primary" />
          <div>
            <h2 className="text-xs text-gray-500">Duration</h2>
            <h2 className="font-medium text-lg">{duration}</h2>
          </div>
        </div>

        {/* Number of Chapters */}
        <div className="flex gap-2 items-center">
          <HiOutlineChartBar className="text-4xl text-primary" />
          <div>
            <h2 className="text-xs text-gray-500">Number of Chapters</h2>
            <h2 className="font-medium text-lg">{numberOfChapters}</h2>
          </div>
        </div>

        {/* Video Included */}
        <div className="flex gap-2 items-center">
          <HiOutlineChartBar className="text-4xl text-primary" />
          <div>
            <h2 className="text-xs text-gray-500">Video Included</h2>
            <h2 className="font-medium text-lg">{videoIncluded}</h2>
          </div>
        </div>

      </div>
    </div>
  );
}

export default CourseDetail;
