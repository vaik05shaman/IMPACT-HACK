import React, { useContext } from "react";
import { Input } from "../../../@/components/ui/input";
import { Textarea } from "../../../@/components/ui/textarea";
import { UserInputContext } from "../../_context/UserInputContext";

const TopicDescription = () => {
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);

  const handleInputChange = (fieldName, value) => {
    setUserCourseInput((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  return (
    <div className="mx-4 sm:mx-10 md:mx-20 lg:mx-44 max-w-4xl space-y-6 py-6">
      {/* Course Topic Input */}
      <div>
        <label className="block mb-2 text-sm sm:text-base font-medium text-gray-700">
          Write a topic for which you want to generate a course (e.g., Python course, Yoga, etc.):
        </label>
        <Input
          placeholder="Enter course topic..."
          value={userCourseInput?.topic || ""}
          onChange={(e) => handleInputChange("topic", e.target.value)}
          className="w-full text-sm sm:text-base"
        />
      </div>

      {/* Course Details Textarea */}
      <div>
        <label className="block mb-2 text-sm sm:text-base font-medium text-gray-700">
          Tell us more about what you want to include in the course:
        </label>
        <Textarea
          placeholder="About your course..."
          value={userCourseInput?.description || ""}
          onChange={(e) => handleInputChange("description", e.target.value)}
          className="w-full text-sm sm:text-base min-h-[120px]"
        />
      </div>
    </div>
  );
};

export default TopicDescription;