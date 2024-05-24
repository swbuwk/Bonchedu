import { createApi } from "@reduxjs/toolkit/query/react";
import { apiBaseQuery } from "../../api/baseQuery";
import { Chapter } from "../../api/types/entities/Chapter";
import { EntityType } from "../../api/types/EntityType";
import { AddChapterRequest } from "../../api/types/ChapterApiTypes";

export const chapterApi = createApi({
  reducerPath: "chapterApi",
  baseQuery: apiBaseQuery(),
  endpoints: (builder) => ({
    getCourseChapters: builder.query<Chapter[], string>({
      query: (courseId: string) => ({
        url: `/api/Chapters/${courseId}/chapters`,
        method: "GET",
      }),
      transformResponse: (response: Chapter[]) =>
        response.map((Chapter) => ({
          ...Chapter,
          entityType: EntityType.chapter,
        })),
    }),
    getChapterById: builder.query<Chapter, string>({
      query: (id: string) => ({
        url: `api/Chapters/${id}`,
        method: "GET",
      }),
      transformResponse: (Chapter: Chapter) => ({
        ...Chapter,
        entityType: EntityType.chapter,
      }),
    }),
    addChapter: builder.mutation<Chapter, AddChapterRequest>({
      query: (data) => {
        const { courseId, ...formData } = data

        return {
          url: "api/Chapters",
          method: "POST",
          params: {
            courseId
          },
          data: formData,
        };
      },
    }),
    deleteChapter: builder.mutation<Chapter, string>({
      query: (id) => {
        return {
          url: `api/Chapters/${id}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useLazyGetChapterByIdQuery,
  useLazyGetCourseChaptersQuery,
  useGetCourseChaptersQuery,
  useGetChapterByIdQuery,
  useAddChapterMutation,
} = chapterApi;
