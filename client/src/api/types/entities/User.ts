import { EntityType } from "../EntityType"
import { Role } from "./Role"

export interface User {
  id: string
  username: string
  login: string
  expirience?: number
  info: string
  roles: Role[]
  avatarImage: string
  entityType: EntityType.user
}