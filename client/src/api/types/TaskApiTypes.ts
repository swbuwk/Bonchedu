export interface AddTaskRequest {
  question: string
  lessonId: string
}

export interface UpdateTaskRequest {
  question: string
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