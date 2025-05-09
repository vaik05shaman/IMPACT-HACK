import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "../../../../@/components/ui/dialog";

import { Textarea } from "../../../../@/components/ui/textarea";
import { Input } from "../../../../@/components/ui/input";

import { db } from "../../../../configs/db";
import { CourseList } from "../../../../configs/schema";
import { eq } from "drizzle-orm"; // Adjust this based on your ORM

import { FaEdit } from 'react-icons/fa';

function EditCourseBasicInfo({ course }) {
  const [name, setName] = useState(course?.courseOutput?.["Course Name"] || "Untitled Course");
  const [description, setDescription] = useState(course?.courseOutput?.["Description"] || "No description available.");

  useEffect(() => {
    setName(course?.courseOutput?.["Course Name"] || "Untitled Course");
    setDescription(course?.courseOutput?.["Description"] || "No description available.");
  }, [course]);

  const onUpdateHandler = async () => {
    course.courseOutput["Course Name"] = name;
    course.courseOutput["Description"] = description;

    console.log("Updated Name:", course.courseOutput["Course Name"]);
    console.log("Updated Description:", course.courseOutput["Description"]);

    const result = await db.update(CourseList)
      .set({ courseOutput: course.courseOutput })
      .where(eq(CourseList.id, course?.id))
      .returning({ id: CourseList.id });

    console.log("DB Update Result:", result);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center gap-2 text-blue-600 hover:underline">
          <FaEdit />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Course Information</DialogTitle>
          <DialogDescription>
            <div className="mt-3 space-y-4">
              <div>
                <label className="block mb-1">Course Title</label>
                <Input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </div>
              <div>
                <label className="block mb-1">Description</label>
                <Textarea
                  className="h-40"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                />
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <button
              onClick={onUpdateHandler}
              className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
            >
              Update
            </button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EditCourseBasicInfo;
