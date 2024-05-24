import { RoleName } from "./entities/Role"
import { User } from "./entities/User"

export interface SignInRequest {
  username: string
  password: string
}

export interface SignInResponse extends User {
  tokens: {
    accessToken: string
    refreshToken: string
  }
}

export interface SignUpRequest extends SignInRequest {}

export interface SignUpResponse extends SignInResponse {}

export interface AddRoleRequest {
  userId: string
  roleName: RoleName
}

export interface RemoveRoleRequest extends AddRoleRequest {}