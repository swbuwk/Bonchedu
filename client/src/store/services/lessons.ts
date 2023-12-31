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
        url: "/lesson",
        method: "GET",
        params: {
          chapterId,
        },
      }),
      transformResponse: (response: Lesson[]) =>
        response.map((lesson) => ({
          ...lesson,
          entityType: EntityType.lesson,
        })),
    }),
    getLessonById: builder.query<Lesson, string>({
      query: (id: string) => ({
        url: `/lesson/${id}`,
        method: "GET",
      }),
      transformResponse: (lesson: Lesson) => ({
        ...lesson,
        entityType: EntityType.lesson,
      }),
    }),
    addLesson: builder.mutation<Lesson, AddLessonRequest>({
      query: (data) => {
        return {
          url: "/lesson",
          method: "POST",
          data,
        };
      },
    }),
    updateLesson: builder.mutation<Lesson, UpdateLessonRequest>({
      query: (dataWithId) => {
        const { id, ...data } = dataWithId
        return {
          url: `/lesson/${id}`,
          method: "PATCH",
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
