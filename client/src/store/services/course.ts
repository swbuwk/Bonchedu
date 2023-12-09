import { createApi } from "@reduxjs/toolkit/query/react";
import { apiBaseQuery } from "../../api/baseQuery";
import { Course } from "../../api/types/entities/Course";
import { EntityType } from "../../api/types/EntityType";
import { AddCourseRequest } from "../../api/types/CourseApiType";
import { generateFormData } from "../../utils/generateFormData";

export const courseApi = createApi({
    reducerPath: "courseApi",
    baseQuery: apiBaseQuery(),
    endpoints: (builder) => ({
        getCourses: builder.query<Course[], undefined>({
            query: () => ({
                url: "/course",
                method: "GET"
            }),
            transformResponse: (response: Course[]) => response.map(course => ({ ...course, entityType: EntityType.course }))
        }),
        getCourseById: builder.query<Course, string>({
            query: (id: string) => ({
                url: `/course/${id}`,
                method: "GET"
            }),
        }),
        addCourse: builder.mutation<Course, AddCourseRequest>({
            query: (data) => {
                const formData = generateFormData(data)

                return {
                    url: "/course",
                    method: "POST",
                    data: formData,
                }
            },
        }),
        deleteCourse: builder.mutation<Course, string>({
            query: (id) => {

                return {
                    url: `/course/${id}`,
                    method: "DELETE",
                }
            },
        })
    })
})


export const {
    useGetCoursesQuery,
    useGetCourseByIdQuery,
    useLazyGetCoursesQuery,
    useDeleteCourseMutation,
    useAddCourseMutation
} = courseApi