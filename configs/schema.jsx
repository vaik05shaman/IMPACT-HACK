import { json, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const CourseList = pgTable('courseList', { 
  id: serial('id').primaryKey(),
  courseId: varchar('courseId').notNull(),
  name: varchar('name').notNull(),
  category: varchar('category').notNull(),
  level: varchar('level').notNull(),
  includeVideo:varchar('includeVideo').notNull().default('Yes'),
  courseOutput: json('courseOutput').notNull(),  // Fixed incorrect string formatting
  createdBy: varchar('createdBy').notNull(),     // Fixed quotation mark
  userName: varchar('userName').notNull(),       // Fixed missing parenthesis
  userProfileImage: varchar('userProfileImage')  // Fixed missing parenthesis
});

export const Chapters = pgTable('chapters', {
  id: serial('id').primaryKey(),
  courseId: varchar('courseId').notNull(),
  chapterId: varchar('chapterId').notNull(),
  content: json('content').notNull(),
  videoId: varchar('videoId').notNull(),
 
});