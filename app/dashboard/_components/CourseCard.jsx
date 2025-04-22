import Link from 'next/link';
import React from 'react'
import { IoEllipsisVerticalSharp } from "react-icons/io5";

function CourseCard({course}) {
  return (
    <div className='bg-white shadow-lg rounded-lg p-4 m-4 w-90'>
        <h2 className='font-bold text-xl'>{course?.courseOutput["Course Name"]}</h2>
        <Link href ={'/course/'+course?.courseId}>
          
        {
            course?.category==="programming" && <img src='/programming.svg' alt='programming' className='w-full h-40 object-cover mt-2'/>
        }
        {
            course?.category==="health" && <img src='/health.jpg' alt='health' className='w-full h-40 object-cover mt-2'/>
        }
        {
            course?.category==="creative" && <img src='/creative.jpg' alt='creative' className='w-40 h-40 object-cover mt-2'/>
        }
        </Link>
        <p className='text-sm text-gray-400 mt-2'>Course Description</p>
        <div className='flex gap-2 items-center mt-2'>
           
            <span>Category: {course?.category}</span>
        </div>
        <button className='w-full mt-4 bg-blue-600 text-white rounded-lg py-2'>
            Start
        </button>
    
    </div>
  )
}

export default CourseCard
