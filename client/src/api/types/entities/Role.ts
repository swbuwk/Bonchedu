import { EntityType } from "../EntityType"

export enum RoleName {
  ADMIN="ADMIN",
  USER="USER",
  TEACHER="TEACHER"
}

export interface Role {
  id: string
  name: RoleName
  description: string
  entityType: EntityType.role
}