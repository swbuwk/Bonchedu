import { useCallback } from "react"
import { SignInRequest, SignUpRequest } from "../api/types/UserApiTypes"
import { getProfile, setGuardErrorVisibility, signIn, signOut, signUp } from "../store/slices/profileSlice"
import { useAppDispatch, useAppSelector } from "./redux"
import { Role } from "../api/types/entities/Role"
import { courseApi } from "../store/services/course"
import { lessonApi } from "../store/services/lessons"
import { userApi } from "../store/services/user"
import { chapterApi } from "../store/services/chapter"
import { taskApi } from "../store/services/task"

const apis = [
  courseApi,
  chapterApi,
  lessonApi,
  userApi,
  taskApi
]

export const useProfile = () => {
  const profile = useAppSelector(state => state.profile)
  const dispatch = useAppDispatch()

  const login = async (data: SignInRequest) => {
    return await dispatch(signIn(data))
  }

  const registration = async (data: SignUpRequest) => {
    return await dispatch(signUp(data))
  }

  const logout = () => {
    apis.forEach(api => {
      dispatch(api.util.resetApiState())
    })
    return dispatch(signOut())
  }

  const getProfileInfo = async () => {
    return await dispatch(getProfile(null))
  }

  const showGuardError = () => {
    return dispatch(setGuardErrorVisibility(true))
  }

  const hasRole = useCallback((role: Role) => {
    return profile.user.role === role
  }, [profile.user])

  return {
    ...profile,
    login,
    registration,
    logout,
    getProfileInfo,
    showGuardError,
    hasRole
  }
}