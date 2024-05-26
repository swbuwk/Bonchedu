import { EntityType } from "../EntityType"

export interface Question {
  id: string
  questionText: string
  type: string
  lessonId: string
  correctAnswer: string
  attachmentId: string
  entityType: EntityType.question
}

export interface Answer {
  id: string
  text: string
}