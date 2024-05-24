import { createApi } from "@reduxjs/toolkit/query/react";
import { apiBaseQuery } from "../../api/baseQuery";
import { Friend, FriendRequest, User } from "../../api/types/entities/User";
import { AddRoleRequest, RemoveRoleRequest } from "../../api/types/UserApiTypes";

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: apiBaseQuery(),
    endpoints: (builder) => ({
        searchUsers: builder.query<Friend[], string>({
            query: (search) => ({
                url: "api/Users/search",
                method: "GET",
                params: {
                    pattern: search
                }
            })
        }),
        getUserById: builder.query<User, string>({
            query: (userId) => ({
                url: `api/Users/${userId}`,
                method: "GET",
            })
        }),
        updatePersonalInfo: builder.mutation<null, string>({
            query: (personalInfo) => ({
                url: `api/Users`,
                method: "PUT",
                data: {
                    personalInfo
                }
            })
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
            })
        }),
        getFriendRequests: builder.query<FriendRequest[], boolean>({
            query: (incoming) => ({
                url: "api/Users/friends/requests",
                method: "GET",
                params: {
                    incoming
                }
            })
        }),
        sendFriendRequest: builder.mutation<Friend[], string>({
            query: (userId) => ({
                url: `api/Users/friends/requests/send`,
                params: {
                    userId,
                },
                method: "POST"
            })
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
        })
    })
})

export const {
    useGetRatingQuery,
    useLazyGetFriendsQuery,
    useLazyGetFriendRequestsQuery,
    useSendFriendRequestMutation,
    useAddRoleMutation,
    useRemoveRoleMutation,
    useLazySearchUsersQuery,
    useGetUserByIdQuery,
    useLazyGetUserByIdQuery,
    useUpdatePersonalInfoMutation
} = userApi