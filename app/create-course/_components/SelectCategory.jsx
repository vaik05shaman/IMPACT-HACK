import React, { useContext } from "react";
import Image from "next/image";
import CategoryList from "../../_shared/CategoryList";
import { UserInputContext } from "../../_context/UserInputContext";

const SelectCategory = () => {
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);

  const handleCategoryChange = (category) => {
    setUserCourseInput((prev) => ({
      ...prev,
      category: category, // Fixed typo (caategory -> category)
    }));
  };

  return (
    <div className="px-10 md:px-20">
      <h2 className="my-5 text-lg font-medium">Select the Course Category</h2>

      <div className="grid grid-cols-3 gap-10 px-10 md:px-20">
        {CategoryList.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col p-5 border items-center rounded-xl cursor-pointer 
              hover:border-primary hover:bg-blue-50 
              ${userCourseInput?.category === item.name ? "border-primary bg-blue-50" : ""}`}
            onClick={() => handleCategoryChange(item.name)}
          >
            <Image src={item.icon} width={50} height={50} alt={item.name} />
            <h2 className="text-sm font-semibold mt-2">{item.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectCategory;
