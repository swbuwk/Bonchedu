export interface AddCourseRequest {
  cover: Blob | null
  name: string
  description: string
}

export interface UpdateCourseRequest extends AddCourseRequest {
  courseId: string
}