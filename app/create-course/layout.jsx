"use client";

import React, { useState } from "react";

import Header from "../../app/_components/Header.jsx";
import Footer from "../../app/_components/Footer.jsx";
import { UserInputContext } from "../_context/UserInputContext.jsx";

const CreateCourseLayout = ({ children }) => {
  const [userCourseInput, setUserCourseInput] = useState({}); // Use an object instead of an array for better structure

  return (
    <UserInputContext.Provider value={{ userCourseInput, setUserCourseInput }}>
      <Header />
      {children}
      <Footer/>
    </UserInputContext.Provider>

  );
};

export default CreateCourseLayout;
