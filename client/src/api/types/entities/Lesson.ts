import { EntityType } from "../EntityType";
import { Chapter } from "./Chapter";

export interface Lesson {
  id: string;
  name: string;
  difficulty: Difficulties;
  expirience: number;
  authorId: string
  position: number;
  chapter?: Chapter;
  chapterId: string;
  courseId: string;
  completed?: boolean
  entityType: EntityType.lesson;
}

export enum Difficulties {
  easy = 1,
  medium = 2,
  hard = 3
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