export interface AddQuestionRequest {
  questionText: string
  correctAnswer: string
  attachedFile?: Blob
  lessonId: string
}

export interface UpdateQuestionRequest {
  questionText: string
  correctAnswer: string
  attachedFile?: Blob
  id: string
}

export interface AddAnswerRequest {
  text: string
  taskId: string
}

export interface SetRightAnswerRequest {
  answerId: string
  taskId: string
}

export interface UpdateAnswerRequest {
  id: string
  text: string
}

export interface SubmitAnswerRequest {
  questionId: string
  answer: string
}