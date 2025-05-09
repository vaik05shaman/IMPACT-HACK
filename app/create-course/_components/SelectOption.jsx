import React, { useContext } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../@/components/ui/select";
import { Input } from "../../../@/components/ui/input";
import { UserInputContext } from "../../_context/UserInputContext";

const SelectOption = () => {
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);

  const handleInputChange = (fieldName, value) => {
    setUserCourseInput((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  return (
    <div className="px-4 sm:px-10 md:px-20 lg:px-44 max-w-4xl mx-auto space-y-6 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10">
        {/* Difficulty Level */}
        <div>
          <label className="text-xs sm:text-sm block mb-1 font-medium text-gray-700">
            Difficulty Level
          </label>
          <Select
            defaultValue={userCourseInput?.level}
            onValueChange={(value) => handleInputChange("level", value)}
          >
            <SelectTrigger className="w-full text-xs sm:text-sm">
              <SelectValue placeholder="Select difficulty level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Course Duration */}
        <div>
          <label className="text-xs sm:text-sm block mb-1 font-medium text-gray-700">
            Course Duration
          </label>
          <Select
            defaultValue={userCourseInput?.duration}
            onValueChange={(value) => handleInputChange("duration", value)}
          >
            <SelectTrigger className="w-full text-xs sm:text-sm">
              <SelectValue placeholder="Select course duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1 Hour">1 Hour</SelectItem>
              <SelectItem value="2 Hours">2 Hours</SelectItem>
              <SelectItem value="More than 3 Hours">More than 3 Hours</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Add Video */}
        <div>
          <label className="text-xs sm:text-sm block mb-1 font-medium text-gray-700">
            Add Video
          </label>
          <Select
            defaultValue={userCourseInput?.display}
            onValueChange={(value) => handleInputChange("display", value)}
          >
            <SelectTrigger className="w-full text-xs sm:text-sm">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Number of Chapters */}
        <div>
          <label className="text-xs sm:text-sm block mb-1 font-medium text-gray-700">
            Number of Chapters
          </label>
          <Input
            type="number"
            placeholder="Enter number of chapters"
            className="w-full text-xs sm:text-sm"
            value={userCourseInput?.numOfChapters || ""}
            onChange={(event) => handleInputChange("numOfChapters", event.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default SelectOption;