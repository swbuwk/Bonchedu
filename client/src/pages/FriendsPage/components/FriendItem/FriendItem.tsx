import { FC, useMemo } from 'react'
import { Friend } from '../../../../api/types/entities/User'
import { UserAvatar, UserInfokName, UserItemLeft, UserItemWrapper } from './styles'
import { useProfile } from '../../../../hooks/useProfile'
import Button from '../../../../components/Button'
import { useApproveFriendRequestMutation, useSendFriendRequestMutation } from '../../../../store/services/user'
import { useToasts } from '../../../../hooks/useToasts'

interface FriendItemProps {
  friend: Friend
  refetch: () => void
}

export const FriendItem: FC<FriendItemProps> = ({friend, refetch}) => {
  const profile = useProfile()
  const toasts = useToasts()
  const [sendFriendRequest] = useSendFriendRequestMutation()
  const [approveFriendRequest] = useApproveFriendRequestMutation()

  const buttonStatus = useMemo(() => {
    if (friend.approved === null) return "Добавить в друзья"
    if (friend.approved === false) {
      if (friend.receiverId === friend.id) return "Заявка отправлена"
      return "Принять заявку"
    }
    return "В друзьях"
  }, [friend])

  const buttonDisabled = useMemo(() => {
    return friend.approved === true || (friend.approved === false && friend.creatorId === profile.user.id)
  }, [friend])

  const handleButtonClick = async () => {
    if (friend.approved === null) {
      await sendFriendRequest(friend.id)
      await refetch()
      toasts.success("Заявка отправлена")
      return
    }
    if (friend.approved === false && friend.receiverId === profile.user.id) {
      await approveFriendRequest(friend.requestId)
      await refetch()
      toasts.success("Заявка принята")
      return
    }
  }

  return (
    <UserItemWrapper>
      <UserItemLeft>
        <UserAvatar/> 
        <UserInfokName>{friend.username}</UserInfokName>
      </UserItemLeft>
      {(profile.user.id !== friend.id) ? 
        <Button 
          resizable 
          whiteTheme={buttonDisabled}
          disabled={buttonDisabled}
          onClick={handleButtonClick}
        >{buttonStatus}</Button> : <></>}
    </UserItemWrapper>
  )
}
