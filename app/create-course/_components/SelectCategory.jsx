import React, { useContext } from "react";
import Image from "next/image";
import CategoryList from "../../_shared/CategoryList";
import { UserInputContext } from "../../_context/UserInputContext";

const SelectCategory = () => {
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);

  const handleCategoryChange = (category) => {
    setUserCourseInput((prev) => ({
      ...prev,
      category, // Simplified assignment
    }));
  };

  return (
    <div className="px-4 sm:px-6 md:px-10 lg:px-20">
      <h2 className="my-4 text-base sm:text-lg md:text-xl font-medium">
        Select the Course Category
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
        {CategoryList.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col p-4 sm:p-5 border rounded-xl items-center cursor-pointer 
              hover:border-primary hover:bg-blue-50 transition-colors 
              ${userCourseInput?.category === item.name ? "border-primary bg-blue-50" : ""}`}
            onClick={() => handleCategoryChange(item.name)}
          >
            <Image
              src={item.icon}
              width={40}
              height={40}
              alt={item.name}
              className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
            />
            <h2 className="text-xs sm:text-sm md:text-base font-semibold mt-2 text-center capitalize">
              {item.name}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectCategory;