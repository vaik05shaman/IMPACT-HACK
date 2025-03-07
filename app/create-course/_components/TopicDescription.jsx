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
    <div className="mx-20 lg:mx-44 space-y-5">
      {/* Course Topic Input */}
      <div>
        <label className="block mb-2 font-medium">
          Write a topic for which you want to generate a course (e.g., Python course, Yoga, etc.):
        </label>
        <Input
          placeholder="Enter course topic..."
          value={userCourseInput?.topic || ""} // ✅ Ensures it's controlled
          onChange={(e) => handleInputChange("topic", e.target.value)}
        />
      </div>

      {/* Course Details Textarea */}
      <div>
        <label className="block mb-2 font-medium">
          Tell us more about what you want to include in the course:
        </label>
        <Textarea
          placeholder="About your course..."
          value={userCourseInput?.description || ""} // ✅ Ensures it's controlled
          onChange={(e) => handleInputChange("description", e.target.value)}
        />
      </div>
    </div>
  );
};

export default TopicDescription;
