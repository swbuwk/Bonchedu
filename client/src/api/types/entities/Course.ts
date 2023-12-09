import { EntityType } from "../EntityType";

export interface Course {
  id: string;
  name: string;
  description?: string;
  authorId: string;
  coverImage: string;
  entityType: EntityType.course;
  progress?: number;
  chapterProgress: number;
  lessonsCount: number;
  chaptersCount: number;
}
