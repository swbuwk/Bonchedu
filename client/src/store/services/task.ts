import { createApi } from "@reduxjs/toolkit/query/react";
import { apiBaseQuery } from "../../api/baseQuery";
import { EntityType } from "../../api/types/EntityType";
import { Answer, Task } from "../../api/types/entities/Task";
import {
  AddAnswerRequest,
  AddTaskRequest,
  SetRightAnswerRequest,
  UpdateAnswerRequest,
  UpdateTaskRequest,
} from "../../api/types/TaskApiTypes";

export const taskApi = createApi({
  reducerPath: "taskApi",
  baseQuery: apiBaseQuery(),
  endpoints: (builder) => ({
    getLessonTasks: builder.query<Task[], string>({
      query: (lessonId) => ({
        url: `/task`,
        method: "GET",
        params: {
          lessonId,
        },
      }),
      transformResponse: (response: Task[]) =>
        response.map((course) => ({ ...course, entityType: EntityType.task })),
    }),
    getTaskById: builder.query<Task, string>({
      query: (id: string) => ({
        url: `/task/${id}`,
        method: "GET",
      }),
    }),
    addTask: builder.mutation<Task, AddTaskRequest>({
      query: (data) => {
        return {
          url: "/task",
          method: "POST",
          data,
        };
      },
    }),
    updateTask: builder.mutation<Task, UpdateTaskRequest>({
      query: (data) => {
        const { id, question } = data;

        return {
          url: `/task/${id}`,
          method: "PATCH",
          data: {
            question: question ?? "",
          },
        };
      },
    }),
    deleteTask: builder.mutation<Task, string>({
      query: (id) => {
        return {
          url: `/task/${id}`,
          method: "DELETE",
        };
      },
    }),
    addAnswer: builder.mutation<Answer, AddAnswerRequest>({
      query: (data) => {
        return {
          url: `/task/answer`,
          method: "POST",
          data: data,
        };
      },
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
    }),
    setRightAnswer: builder.mutation<Answer, SetRightAnswerRequest>({
      query: (data) => {
        const { taskId, answerId } = data;

        return {
          url: `/task/${taskId}/answer/${answerId}/set`,
          method: "POST",
        };
      },
    }),
    deleteAnswer: builder.mutation<Answer, string>({
      query: (id) => {
        return {
          url: `/task/answer/${id}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useGetLessonTasksQuery,
  useAddTaskMutation,
  useLazyGetLessonTasksQuery,
  useAddAnswerMutation,
  useDeleteAnswerMutation,
  useUpdateAnswerMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useSetRightAnswerMutation,
} = taskApi;
