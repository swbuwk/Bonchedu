import { createApi } from "@reduxjs/toolkit/query/react";
import { apiBaseQuery } from "../api/baseQuery";
import { Answer, Question } from "../api/types/entities/Question";
import { EntityType } from "../api/types/EntityType";
import { AddAnswerRequest, AddQuestionRequest, SetRightAnswerRequest, SubmitAnswerRequest, UpdateAnswerRequest, UpdateQuestionRequest } from "../api/types/QuestionApiTypes";
import { generateFormData } from "../utils/generateFormData";
import { Lesson } from "../api/types/entities/Lesson";
import { AddLessonRequest, LessonResultsResponse, UpdateLessonRequest } from "../api/types/LessonApiTypes";
import { Chapter } from "../api/types/entities/Chapter";
import { AddChapterRequest } from "../api/types/ChapterApiTypes";
import { Course } from "../api/types/entities/Course";
import { AddCourseRequest, UpdateCourseRequest } from "../api/types/CourseApiType";
import { Friend, FriendRequest, User } from "../api/types/entities/User";
import { AddRoleRequest, RemoveRoleRequest, UpdateUserRequest } from "../api/types/UserApiTypes";
import { LessonMaterial } from "../api/types/entities/LessonMaterial";

export const boncheduApi = createApi({
  reducerPath: "boncheduApi",
  baseQuery: apiBaseQuery(),
  tagTypes: ["USER", "FRIEND", "COURSE", "CHAPTER", "LESSON", "QUESTION", "LESSON_MATERIAL"],
  endpoints: (builder) => ({
    // USERS

    searchUsers: builder.query<Friend[], string>({
      query: (search) => ({
        url: "api/Users/search",
        method: "GET",
        params: {
          pattern: search
        }
      }),
      providesTags: () => [{type: "FRIEND", id: "list"}, {type: "USER", id: "list"}]
    }),
    getUserById: builder.query<User, string>({
      query: (userId) => ({
        url: `api/Users/${userId}`,
        method: "GET",
      }),
      providesTags: () => [{type: "USER", id: "single"}]
    }),
    updatePersonalInfo: builder.mutation<null, UpdateUserRequest>({
      query: (updateData) => {
        const formData = generateFormData(updateData)
        return {
          url: `api/Users`,
          method: "PUT",
          data: formData
        }
      },
      invalidatesTags: () => [{type: "USER", id: "single"}]
    }),
    getRating: builder.query<User[], undefined>({
      query: () => ({
        url: "api/Users/leaderboard",
        method: "GET"
      })
    }),
    getFriends: builder.query<Friend[], undefined>({
      query: () => ({
        url: "api/Users/friends",
        method: "GET"
      }),
      providesTags: () => [{type: "FRIEND", id: "list"}]
    }),
    getFriendRequests: builder.query<FriendRequest[], boolean>({
      query: (incoming) => ({
        url: "api/Users/friends/requests",
        method: "GET",
        params: {
          incoming
        }
      }),
      providesTags: () => [{type: "FRIEND", id: "list"}]
    }),
    sendFriendRequest: builder.mutation<Friend[], string>({
      query: (userId) => ({
        url: `api/Users/friends/requests/send`,
        params: {
          userId,
        },
        method: "POST"
      }),
      invalidatesTags: () => [{type: "FRIEND", id: "list"}]
    }),
    addRole: builder.mutation<User, AddRoleRequest>({
      query: ({roleName, userId}) => ({
        url: `/user/${userId}/role`,
        method: "POST",
        data: {
          roleName
        }
      })
    }),
    removeRole: builder.mutation<User, RemoveRoleRequest>({
      query: ({roleName, userId}) => ({
        url: `/user/${userId}/role`,
        method: "DELETE",
        data: {
          roleName
        }
      })
    }),

    // COURSES

    getCourses: builder.query<Course[], undefined>({
      query: () => ({
        url: "api/Courses",
        method: "GET"
      }),
      providesTags: [{ type: "COURSE", id: "list" }],
      transformResponse: (response: Course[]) => response.map(course => ({ ...course, entityType: EntityType.course }))
    }),
    getCourseById: builder.query<Course, string>({
      query: (id: string) => ({
        url: `api/Courses/${id}`,
        method: "GET"
      }),
      providesTags: [{ type: "COURSE", id: "single" }],
    }),
    addCourse: builder.mutation<Course, AddCourseRequest>({
      query: (data) => {
        const formData = generateFormData(data)

        return {
          url: "api/Courses",
          method: "POST",
          data: formData,
        }
      },
      invalidatesTags: [{ type: "COURSE", id: "list" }],
    }),
    startCourse: builder.mutation<null, string>({
      query: (courseId) => ({
        url: `api/Courses/${courseId}/start`,
        method: "POST"
      }),
      invalidatesTags: ["COURSE"],
    }),
    updateCourse: builder.mutation<null, UpdateCourseRequest>({
      query: (data) => {
        const { courseId, ...courseData } = data
        const formData = generateFormData(courseData)

        return {
          url: `api/Courses/${courseId}`,
          method: "PUT",
          data: formData
        }
      },
      invalidatesTags: ["COURSE"],
    }),
    deleteCourse: builder.mutation<Course, string>({
      query: (id) => {
        return {
          url: `api/Courses/${id}`,
          method: "DELETE",
        }
      },
      invalidatesTags: [{ type: "COURSE", id: "list" }],
    }),

    // CHAPTERS

    getCourseChapters: builder.query<Chapter[], string>({
      query: (courseId: string) => ({
        url: `/api/Chapters/${courseId}/chapters`,
        method: "GET",
      }),
      providesTags: [{ type: "CHAPTER", id: "list" }],
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
      providesTags: [{ type: "CHAPTER", id: "single" }],
      transformResponse: (Chapter: Chapter) => ({
        ...Chapter,
        entityType: EntityType.chapter,
      }),
    }),
    startChapter: builder.mutation<null, string>({
      query: (chapterId) => ({
          url: `api/Chapters/${chapterId}/start`,
          method: "POST"
      }),
      invalidatesTags: ["CHAPTER"],
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
      invalidatesTags: [{ type: "CHAPTER", id: "list" }],
    }),
    deleteChapter: builder.mutation<Chapter, string>({
      query: (id) => {
        return {
          url: `api/Chapters/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [{ type: "CHAPTER", id: "list" }],
    }),

    // LESSONS

    getChapterLessons: builder.query<Lesson[], string>({
      query: (chapterId: string) => ({
        url: `api/Lessons/${chapterId}/lessons`,
        method: "GET",
      }),
      providesTags: [{ type: "LESSON", id: "list" }],
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
      providesTags: [{ type: "LESSON", id: "single" }],
      transformResponse: (lesson: Lesson) => ({
        ...lesson,
        entityType: EntityType.lesson,
      }),
    }),
    startLesson: builder.mutation<null, string>({
      query: (lessonId) => ({
          url: `api/Lessons/${lessonId}/start`,
          method: "POST"
      }),
      invalidatesTags: ["LESSON"],
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
      invalidatesTags: [{ type: "LESSON", id: "list"}, { type: "CHAPTER", id: "single" }],
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
      invalidatesTags: ["LESSON"],
    }),
    finalizeLesson: builder.mutation<Lesson, string>({
      query: (lessonId) => {
        return {
          url: `api/Lessons/${lessonId}/finalize`,
          method: "POST",
        };
      },
      invalidatesTags: ["LESSON"],
    }),
    deleteLesson: builder.mutation<Lesson, string>({
      query: (id) => {
        return {
          url: `api/Lessons/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [{ type: "LESSON", id: "list"}, { type: "CHAPTER", id: "single" }],
    }),
    completeLesson: builder.mutation<LessonResultsResponse, string>({
      query: (id) => {
        return {
          url: `api/Lessons/${id}/complete`,
          method: "POST"
        }
      },
      invalidatesTags: ["LESSON", "CHAPTER"]
    }),

    // QUESTIONS, ANSWERS AND MATERIALS

    getLessonQuestions: builder.query<Question[], string>({
      query: (lessonId) => ({
        url: `api/Questions/${lessonId}/questions`,
        method: "GET",
      }),
      providesTags: [{ type: "QUESTION", id: "list" }],
      transformResponse: (response: Question[]) =>
        response.map((question) => ({ ...question, entityType: EntityType.question })),
    }),
    getLessonEditQuestions: builder.query<Question[], string>({
      query: (lessonId) => ({
        url: `api/Questions/${lessonId}/private`,
        method: "GET",
      }),
      providesTags: [{ type: "QUESTION", id: "list" }],
      transformResponse: (response: Question[]) =>
        response.map((question) => ({ ...question, entityType: EntityType.question })),
    }),
    getQuestionById: builder.query<Question, string>({
      query: (id: string) => ({
        url: `/task/${id}`,
        method: "GET",
      }),
      providesTags: [{ type: "QUESTION", id: "single" }],
    }),
    addQuestion: builder.mutation<Question, AddQuestionRequest>({
      query: (data) => {
        const { lessonId, ...questionData } = data
        const formData = generateFormData(questionData)

        return {
          url: `/api/Questions/${lessonId}/questions`,
          method: "POST",
          data: formData,
        };
      },
      invalidatesTags: [{ type: "QUESTION", id: "list" }],
    }),
    updateQuestion: builder.mutation<Question, UpdateQuestionRequest>({
      query: (data) => {
        const { id, ...questionData } = data;
        const formData = generateFormData(questionData)

        return {
          url: `api/Questions/${id}`,
          method: "PUT",
          data: formData
        };
      },
    }),
    deleteQuestionAttachment: builder.mutation<Question, string>({
      query: (id) => {
        return {
          url: `api/Questions/${id}/attechment`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["QUESTION"],
    }),
    deleteQuestion: builder.mutation<Question, string>({
      query: (id) => {
        return {
          url: `api/Questions/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [{ type: "QUESTION", id: "list" }],
    }),
    addAnswer: builder.mutation<Answer, AddAnswerRequest>({
      query: (data) => {
        return {
          url: `/task/answer`,
          method: "POST",
          data: data,
        };
      },
      invalidatesTags: ["QUESTION"],
    }),
    updateAnswer: builder.mutation<Answer, UpdateAnswerRequest>({
      query: (data) => {
        const { id, text } = data;

        return {
          url: `/task/answer/${id}`,
          method: "PATCH",
          data: {
            text: text ?? "",
          },
        };
      },
      invalidatesTags: ["QUESTION"],
    }),
    submitAnswer: builder.mutation<null, SubmitAnswerRequest>({
      query: (data) => {
        const { questionId, answer } = data
        return {
          url: `api/Questions/${questionId}/submitanswer`,
          method: "POST",
          params: {
            answer
          }
        }
      },
    }),
    setRightAnswer: builder.mutation<Answer, SetRightAnswerRequest>({
      query: (data) => {
        const { taskId, answerId } = data;

        return {
          url: `/task/${taskId}/answer/${answerId}/set`,
          method: "POST",
        };
      },
      invalidatesTags: ["QUESTION"],
    }),
    deleteAnswer: builder.mutation<Answer, string>({
      query: (id) => {
        return {
          url: `/task/answer/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["QUESTION"],
    }),
    getMaterials: builder.query<LessonMaterial, string>({
      query: (lessonId) => ({
        url: `api/Lessons/${lessonId}/materials`,
        method: "GET"
      }),
      providesTags: ["LESSON_MATERIAL"]
    }),
    addMaterials: builder.mutation<null, LessonMaterial>({
      query: (data) => {
        const { lessonId, textData } = data
        return {
          url: `api/Lessons/${lessonId}/materials`,
          method: "POST",
          data: {
            textData
          }
        }
      },
      invalidatesTags: ["LESSON_MATERIAL"]
    }),
    updateMaterials: builder.mutation<null, LessonMaterial>({
      query: (data) => {
        const { lessonId, textData } = data
        return {
          url: `api/Lessons/${lessonId}/materials`,
          method: "PUT",
          data: {
            textData
          }
        }
      },
      invalidatesTags: ["LESSON_MATERIAL"]
    }),

    // FILES 
    uploadFile: builder.mutation<string, Blob>({
      query: (file) => {
        const data = generateFormData({file})
        return {
          url: "api/File",
          method: "POST",
          data
        }
      }
    })
  }),
});

export const {
  // USERS
  useGetRatingQuery,
  useLazyGetFriendsQuery,
  useLazyGetFriendRequestsQuery,
  useSendFriendRequestMutation,
  useAddRoleMutation,
  useRemoveRoleMutation,
  useLazySearchUsersQuery,
  useGetUserByIdQuery,
  useLazyGetUserByIdQuery,
  useUpdatePersonalInfoMutation,

  // COURSES
  useGetCoursesQuery,
  useGetCourseByIdQuery,
  useLazyGetCourseByIdQuery,
  useLazyGetCoursesQuery,
  useDeleteCourseMutation,
  useAddCourseMutation,
  useUpdateCourseMutation,
  useStartCourseMutation,

  // CHAPTERS
  useLazyGetChapterByIdQuery,
  useLazyGetCourseChaptersQuery,
  useGetCourseChaptersQuery,
  useStartChapterMutation,
  useGetChapterByIdQuery,
  useAddChapterMutation,
  useDeleteChapterMutation,

  // LESSONS
  useLazyGetChapterLessonsQuery,
  useGetChapterLessonsQuery,
  useGetLessonByIdQuery,
  useLazyGetLessonByIdQuery,
  useAddLessonMutation,
  useCompleteLessonMutation,
  useStartLessonMutation,
  useFinalizeLessonMutation,
  useUpdateLessonMutation,
  useDeleteLessonMutation,

  // QUESTIONS, ANSWERS AND MATERIALS
  useGetLessonQuestionsQuery,
  useLazyGetLessonQuestionsQuery,
  useGetLessonEditQuestionsQuery,
  useLazyGetLessonEditQuestionsQuery,
  useAddQuestionMutation,
  useAddAnswerMutation,
  useDeleteAnswerMutation,
  useUpdateAnswerMutation,
  useSubmitAnswerMutation,
  useUpdateQuestionMutation,
  useDeleteQuestionMutation,
  useDeleteQuestionAttachmentMutation,
  useSetRightAnswerMutation,
  useGetMaterialsQuery,
  useAddMaterialsMutation,
  useUpdateMaterialsMutation,

  //FILES
  useUploadFileMutation
} = boncheduApi;
