import { EntityType } from "../EntityType";
import { Chapter } from "./Chapter";

export interface Lesson {
  id: string;
  name: string;
  difficulty: Difficulties;
  gainedExperience: number;
  authorId: string
  number: number;
  chapter?: Chapter;
  chapterId: string;
  courseId: string;
  started?: boolean
  finalized: boolean
  completed: boolean
  entityType: EntityType.lesson;
}

export enum Difficulties {
  easy = "easy",
  medium = "medium",
  hard = "hard"
}

export const getDifficultyName = (diff: Difficulties) => {
  switch (diff) {
    case Difficulties.easy: {
      return "Лёгкая"
    }
    case Difficulties.medium: {
      return "Средняя"
    }
    case Difficulties.hard: {
      return "Сложная"
    }
    default: {
      return "Не определено"
    }
  }
}