import { createApi } from "@reduxjs/toolkit/query/react";
import { apiBaseQuery } from "../../api/baseQuery";
import { User } from "../../api/types/entities/User";

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: apiBaseQuery(),
    endpoints: (builder) => ({
        getUsers: builder.query<User[], undefined>({
            query: () => ({
                url: "/user",
                method: "GET"
            })
        }),
        getRating: builder.query<User[], undefined>({
            query: () => ({
                url: "/user/rating",
                method: "GET"
            })
        })
    })
})


export const {
    useGetRatingQuery
} = userApi