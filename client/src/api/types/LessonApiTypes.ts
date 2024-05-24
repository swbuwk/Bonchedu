export interface AddLessonRequest {
  name: string;
  expirienceGain: number;
  difficulty: string;
  chapterId: string;
}

export interface UpdateLessonRequest extends AddLessonRequest {
  id: string
}