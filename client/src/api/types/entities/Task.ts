import { EntityType } from "../EntityType"
import { Lesson } from "./Lesson"

export interface Task {
  id: string
  question: string
  type: string
  authorId: string
  lesson?: Lesson
  lessonId: string
  rightAnswerId: string
  answers: Answer[]
  entityType: EntityType.task
}

export interface Answer {
  id: string
  text: string
}