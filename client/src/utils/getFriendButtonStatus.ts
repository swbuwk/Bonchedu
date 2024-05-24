import { FriendStatus } from "../api/types/entities/User";

export const getFriendButtonStatus = (friendStatus: FriendStatus): string => {
  if (friendStatus === FriendStatus.none) return "Добавить в друзья"
  if (friendStatus === FriendStatus.sent) return "Заявка отправлена"
  if (friendStatus === FriendStatus.received) return "Принять заявку"
  return "В друзьях"
}