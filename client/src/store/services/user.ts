import { createApi } from "@reduxjs/toolkit/query/react";
import { apiBaseQuery } from "../../api/baseQuery";
import { Friend, User } from "../../api/types/entities/User";
import { AddRoleRequest, RemoveRoleRequest } from "../../api/types/UserApiTypes";

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: apiBaseQuery(),
    endpoints: (builder) => ({
        searchUsers: builder.query<Friend[], string>({
            query: (search) => ({
                url: "/user",
                method: "GET",
                params: {
                    search
                }
            })
        }),
        getRating: builder.query<User[], undefined>({
            query: () => ({
                url: "/user/rating",
                method: "GET"
            })
        }),
        getFriends: builder.query<Friend[], undefined>({
            query: () => ({
                url: "/user/friend",
                method: "GET"
            })
        }),
        getFriendRequests: builder.query<Friend[], string>({
            query: (type) => ({
                url: "/user/friend/requests",
                method: "GET",
                params: {
                    type
                }
            })
        }),
        sendFriendRequest: builder.mutation<Friend[], string>({
            query: (userId) => ({
                url: `/user/friend/send-request/${userId}`,
                method: "POST"
            })
        }),
        approveFriendRequest: builder.mutation<Friend[], string>({
            query: (requestId) => ({
                url: `/user/friend/approve-request/${requestId}`,
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
    useApproveFriendRequestMutation,
    useAddRoleMutation,
    useRemoveRoleMutation,
    useLazySearchUsersQuery
} = userApi