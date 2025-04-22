import React from "react";
import Image from "next/image";
import { Button } from "../../../../components/ui/button.jsx"; // Ensure correct path
import { HiOutlinePuzzlePiece } from "react-icons/hi2";
import Link from "next/link.js";

const CourseBasicInfo = ({ course }) => {
  if (!course) return <p className="text-center text-gray-500">Course data not available.</p>;

  // Extract course name and description from AI-generated output
  const courseName = course?.courseOutput?.["Course Name"] || "Untitled Course";
  const courseDescription = course?.courseOutput?.["Description"] || "No description available.";

  return (
    <div className="p-10 border rounded-xl shadow-sm mt-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Left Side - Course Info */}
        <div>
          <h2 className="font-bold text-3xl">{courseName}</h2>
          <p className="text-sm text-gray-400 mt-3">{courseDescription}</p>

          <h2 className="font-medium mt-2 flex gap-2 items-center">
            <HiOutlinePuzzlePiece /> {course?.category || "No category"}
          </h2>
          <Link href={`/course/${course?.courseId}/start`}>
          <Button className="w-full mt-5 cursor-pointer">Start</Button>
          </Link>
        </div>

        {/* Right Side - Course Image */}
        <div>
          <Image
            src={course?.image || "/programming.svg"} // ✅ Fallback image
            width={250}
            height={200}
            className="w-full rounded-xl h-[320px] object-cover"
            alt="Course Image"
          />
        </div>
      </div>
    </div>
  );
};

export default CourseBasicInfo;
