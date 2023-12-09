export interface AddLessonRequest {
  name: string;
  expirience: number;
  difficulty: number;
  chapterId: string;
  courseId: string;
}

export interface UpdateLessonRequest extends AddLessonRequest {
  id: string
}