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
                url: "api/Courses",
                method: "GET"
            }),
            transformResponse: (response: Course[]) => response.map(course => ({ ...course, entityType: EntityType.course }))
        }),
        getCourseById: builder.query<Course, string>({
            query: (id: string) => ({
                url: `api/Courses/${id}`,
                method: "GET"
            }),
        }),
        addCourse: builder.mutation<Course, AddCourseRequest>({
            query: (data) => {
                const formData = generateFormData(data)
                console.log(formData)

                return {
                    url: "api/Courses",
                    method: "POST",
                    data: formData,
                }
            },
        }),
        deleteCourse: builder.mutation<Course, string>({
            query: (id) => {

                return {
                    url: `api/Courses/${id}`,
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