import { FC, useMemo } from 'react'
import { Friend } from '../../../../api/types/entities/User'
import { UserAvatar, UserInfokName, UserItemLeft, UserItemRight, UserItemWrapper } from './styles'
import { useProfile } from '../../../../hooks/useProfile'
import Button from '../../../../components/Button'
import { useAddRoleMutation, useApproveFriendRequestMutation, useRemoveRoleMutation, useSendFriendRequestMutation } from '../../../../store/services/user'
import { useToasts } from '../../../../hooks/useToasts'
import { RoleName } from '../../../../api/types/entities/Role'
import Dropdown from '../../../../components/Dropdown'
import { DropdownButtonTarget } from '../../../../components/Dropdown/DropdownButtonTarget'

interface FriendItemProps {
  friend: Friend
  refetch: () => void
}

export const FriendItem: FC<FriendItemProps> = ({friend, refetch}) => {
  const profile = useProfile()
  const isAdmin = profile.hasRole(RoleName.ADMIN)
  const toasts = useToasts()
  const [sendFriendRequest] = useSendFriendRequestMutation()
  const [approveFriendRequest] = useApproveFriendRequestMutation()
  const [addRole] = useAddRoleMutation()
  const [removeRole] = useRemoveRoleMutation()

  const isUserTeacher = friend?.roles?.find?.((role) => role.name === RoleName.TEACHER)
  const isUserAdmin = friend?.roles?.find?.((role) => role.name === RoleName.ADMIN)

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

  
  const handleToggleTeacher = async () => {
    if (isUserTeacher) {
      await removeRole({
        userId: friend.id,
        roleName: RoleName.TEACHER
      })
      refetch()
      toasts.success("Преподаватель разжалован")
      return
    }
    await addRole({
      userId: friend.id,
      roleName: RoleName.TEACHER
    })
    refetch()
    toasts.success("Пользователь назначен преподавателем")
  }

  const dropdownOptions = [{
    element: <>{!isUserTeacher ? "Назначить преподавателем" : "Разжаловать преподавателя"}</>,
    action: handleToggleTeacher
  }]

  return (
    <UserItemWrapper>
      <UserItemLeft>
        <UserAvatar/> 
        <UserInfokName>{friend.username}</UserInfokName>
      </UserItemLeft>
      <UserItemRight>
        {(isAdmin && !isUserAdmin) ? 
          <Dropdown
            closeOnChoose
            target={<DropdownButtonTarget/>}
            options={dropdownOptions}
          /> : <></>}
        {(profile.user.id !== friend.id) ? 
          <Button 
            resizable 
            whiteTheme={buttonDisabled}
            disabled={buttonDisabled}
            onClick={handleButtonClick}
          >{buttonStatus}</Button> : <></>}
      </UserItemRight>
    </UserItemWrapper>
  )
}
