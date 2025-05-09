import React from "react";
import { HiOutlineCheckCircle, HiOutlineClock } from "react-icons/hi2";
import EditChapters from './EditChapters';

function ChapterList({ course }) {
  
  return (
    <div className="mt-3">
      <h2 className="text-xl font-semibold">Chapters</h2>
      <div className="mt-2 space-y-4">
        {course?.courseOutput?.Chapters?.map((chapter, index) => (
          <div key={index} className="flex gap-3 items-start border p-3 rounded-lg shadow-sm">
           
            <h2 className="bg-primary flex-none text-white h-10 w-10 flex items-center justify-center rounded-full text-lg font-bold">
              {index + 1}
            </h2>

          
            <div>
              <h3 className="font-medium text-lg">{chapter?.["Chapter Name"] || "Untitled Chapter"} <EditChapters/></h3>
              <p className="text-sm text-gray-500">{chapter?.About || "No description available."}</p>
              <p className="flex items-center gap-1 text-sm text-gray-600">
                <HiOutlineClock /> {chapter?.Duration || "Unknown duration"}
              </p>
            </div>
            <HiOutlineCheckCircle className="text-4xl flex-none"/>
          </div>
        ))}
       
      </div>
      
    </div>
  );
}

export default ChapterList;
