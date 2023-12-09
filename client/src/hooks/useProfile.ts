import { useCallback } from "react"
import { SignInRequest, SignUpRequest } from "../api/types/UserApiTypes"
import { getProfile, setGuardErrorVisibility, signIn, signOut, signUp } from "../store/slices/profileSlice"
import { useAppDispatch, useAppSelector } from "./redux"
import { RoleName } from "../api/types/entities/Role"

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
    return dispatch(signOut())
  }

  const getProfileInfo = async () => {
    return await dispatch(getProfile(null))
  }

  const showGuardError = () => {
    return dispatch(setGuardErrorVisibility(true))
  }

  const hasRole = useCallback((roleName: RoleName) => {
    return profile.user.roles.some(role => role.name === roleName)
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