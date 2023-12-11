import { EntityType } from "../EntityType";
import { Course } from "./Course";

export interface Chapter {
  id: string;
  name: string;
  description?: string;
  authorId: string;
  course?: Course;
  courseId: string;
  entityType: EntityType.chapter;
  lessonsCount: number;
  progress?: number;
  position: number;
}
