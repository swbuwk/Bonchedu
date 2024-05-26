import { EntityType } from "../EntityType"
import { Role } from "./Role"

export interface User {
  id: string
  username: string
  experience?: number
  personalInfo: string
  role: Role
  avatarId: string
  entityType: EntityType.user
}

export enum FriendStatus {
  none="none",
  sent="sent",
  received="received",
  friends="friends"
}

export interface Friend extends User {
  friendStatus: FriendStatus
}

export interface FriendRequest {
  createdAt: string
  user: Friend
}