import { UserButton } from '@clerk/nextjs';
import React from 'react';
import AddCourse from './_components/AddCourse'

function Dashboard() {
  return (
    <div>WELCOME TO DASHBORD
    {/* <UserButton/> */}
    <AddCourse/>
    </div>
  )
}


export default Dashboard