import { User } from "./entities/User"

export interface SignInRequest {
  login: string
  password: string
}

export interface SignInResponse extends User {
  access_token: string
}

export interface SignUpRequest extends SignInRequest {
  username: string
  passwordRepeat: string
}

export interface SignUpResponse extends SignInResponse {}