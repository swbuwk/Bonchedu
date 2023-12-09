import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { User } from "../../api/types/entities/User"
import { SignInRequest, SignInResponse, SignUpRequest, SignUpResponse } from "../../api/types/UserApiTypes"
import { api } from "../../api"
import { ApiError, ApiErrorData } from "../../api/baseQuery"
import { EntityType } from "../../api/types/EntityType"

interface Profile {
  user: User,
  loading: boolean,
  error?: ApiErrorData | null
  guardErrorVisible: boolean
}

const initialState: Profile = {
  user: {
    id: "",
    info: "",
    login: "",
    roles: [],
    username: "",
    expirience: 0,
    avatarImage: "",
    entityType: EntityType.user
  },
  loading: true,
  error: null,
  guardErrorVisible: false
}

export const signUp = createAsyncThunk<
  SignUpResponse,
  SignUpRequest,
  {
    rejectValue: ApiError
  }
>(
  "profile/signup",
  async (signUpRequest: SignUpRequest, { rejectWithValue }) => {
    const res: SignUpResponse = await api({
      url: "/auth/signup",
      method: "POST",
      data: signUpRequest
    }).then(res => res.data)
    .catch((error: ApiError) => {
      return rejectWithValue(error)
    })

    return res
  }
)

export const signIn = createAsyncThunk<
  SignInResponse,
  SignInRequest,
  {
    rejectValue: ApiError
  }
>(
  "profile/signin",
  async (signInRequest: SignInRequest, { rejectWithValue }) => {
    const res: SignInResponse = await api({
      url: "/auth/signin",
      method: "POST",
      data: signInRequest
    }).then(res => res.data)
    .catch((error: ApiError) => {
      return rejectWithValue(error)
    })

    return res
  }
)

export const getProfile = createAsyncThunk<
  any, 
  any,
  {
    rejectValue: ApiError
  }
>(
  "profile/getInfo",
  async (_, { rejectWithValue }) => {
    const res: User = await api({
      url: "/user/account",
      method: "GET",
    }).then(res => res.data)
    .catch((error: ApiError) => {
      return rejectWithValue(error)
    })

    return res
  }
)

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    signOut: () => {
      localStorage.setItem("access_token", "")
      return {...initialState, loading: false}
    },
    setGuardErrorVisibility(state, action: PayloadAction<boolean>) {
      state.guardErrorVisible = action.payload
    }
  },
  extraReducers(builder) {
    builder.addCase(signUp.fulfilled, (state, action) => {
      const {access_token, ...user} = action.payload
      localStorage.setItem("access_token", access_token)
      state.user = user
      state.guardErrorVisible = false
      state.error = null
      state.loading = false
    })
    builder.addCase(signUp.pending, (state) => {
      state.loading = true
    })
    builder.addCase(signUp.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload.response?.data
      }
      state.loading = false
    })
    builder.addCase(signIn.fulfilled, (state, action) => {
      const {access_token, ...user} = action.payload
      localStorage.setItem("access_token", access_token)
      state.user = user
      state.guardErrorVisible = false
      state.error = null
      state.loading = false
    })
    builder.addCase(signIn.pending, (state) => {
      state.loading = true
    })
    builder.addCase(signIn.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload.response?.data
      }
      state.loading = false
    })
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.user = action.payload
      state.guardErrorVisible = false
      state.error = null
      state.loading = false
    })
    builder.addCase(getProfile.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getProfile.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload.response?.data
      }
      state.loading = false
    })
  },
})

export const {
  signOut, setGuardErrorVisibility
} = profileSlice.actions

export default profileSlice