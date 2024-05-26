export interface AddLessonRequest {
  name: string;
  gainedExperience: number;
  difficulty: string;
  chapterId: string;
}

export interface UpdateLessonRequest extends AddLessonRequest {
  id: string
}

export interface LessonResultsResponse {
  score: number
  expDiff: number
}