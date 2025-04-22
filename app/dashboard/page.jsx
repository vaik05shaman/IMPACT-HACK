import { UserButton } from '@clerk/nextjs';
import React from 'react';
import AddCourse from './_components/AddCourse'
import UserCourseList from './_components/UserCourseList';

function Dashboard() {
  return (
    <div>WELCOME TO DASHBORD
    {/* <UserButton/> */}
    <AddCourse/>
    <UserCourseList/>
    </div>
  )
}


export default Dashboard