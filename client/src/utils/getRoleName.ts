import { Role } from "../api/types/entities/Role";

const roleNames: Record<Role, string> = {
  [Role.admin]: "Администратор",
  [Role.teacher]: "Преподаватель",
  [Role.student]: "Студент",
}

export const getRoleName = (role?: Role): string => {
  if (!role) return "Пользователь"
  return roleNames[role]
} 