import { createApi } from "@reduxjs/toolkit/query/react";
import { apiBaseQuery } from "../../api/baseQuery";
import { EntityType } from "../../api/types/EntityType";
import { Lesson } from "../../api/types/entities/Lesson";
import { AddLessonRequest, UpdateLessonRequest } from "../../api/types/LessonApiTypes";

export const lessonApi = createApi({
  reducerPath: "lessonApi",
  baseQuery: apiBaseQuery(),
  endpoints: (builder) => ({
    getChapterLessons: builder.query<Lesson[], string>({
      query: (chapterId: string) => ({
        url: `api/Lessons/${chapterId}/lessons`,
        method: "GET",
      }),
      transformResponse: (response: Lesson[]) =>
        response.map((lesson) => ({
          ...lesson,
          entityType: EntityType.lesson,
        })),
    }),
    getLessonById: builder.query<Lesson, string>({
      query: (id: string) => ({
        url: `api/Lessons/${id}`,
        method: "GET",
      }),
      transformResponse: (lesson: Lesson) => ({
        ...lesson,
        entityType: EntityType.lesson,
      }),
    }),
    addLesson: builder.mutation<Lesson, AddLessonRequest>({
      query: (data) => {
        const { chapterId, ...formData } = data
        return {
          url: `api/Lessons/${chapterId}`,
          method: "POST",
          data: formData ,
        };
      },
    }),
    updateLesson: builder.mutation<Lesson, UpdateLessonRequest>({
      query: (dataWithId) => {
        const { id, ...data } = dataWithId
        return {
          url: `api/Lessons/${id}`,
          method: "PUT",
          data,
        };
      },
    }),
    deleteLesson: builder.mutation<Lesson, string>({
      query: (id) => {
        return {
          url: `/lesson/${id}`,
          method: "DELETE",
        };
      },
    }),
    startLesson: builder.mutation<Lesson, string>({
      query: (id) => {
        return {
          url: `/lesson/${id}/start`,
          method: "POST"
        }
      }
    }),
    completeLesson: builder.mutation<Lesson, string>({
      query: (id) => {
        return {
          url: `/lesson/${id}/complete`,
          method: "POST"
        }
      }
    })
  }),
});

export const {
  useLazyGetChapterLessonsQuery,
  useGetChapterLessonsQuery,
  useGetLessonByIdQuery,
  useLazyGetLessonByIdQuery,
  useAddLessonMutation,
  useCompleteLessonMutation,
  useStartLessonMutation,
  useUpdateLessonMutation
} = lessonApi;
