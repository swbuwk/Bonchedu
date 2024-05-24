import { FC, useMemo } from 'react'
import { Friend, FriendStatus } from '../../../../api/types/entities/User'
import { UserAvatar, UserInfokName, UserItemLeft, UserItemRight, UserItemWrapper } from './styles'
import { useProfile } from '../../../../hooks/useProfile'
import Button from '../../../../components/Button'
import { useAddRoleMutation, useRemoveRoleMutation, useSendFriendRequestMutation } from '../../../../store/services/user'
import { useToasts } from '../../../../hooks/useToasts'
import { Role, RoleName } from '../../../../api/types/entities/Role'
import Dropdown from '../../../../components/Dropdown'
import { DropdownButtonTarget } from '../../../../components/Dropdown/DropdownButtonTarget'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { FRIENDS_TABS } from '../../FriendsPage'
import { getFriendButtonStatus } from '../../../../utils/getFriendButtonStatus'

interface FriendItemProps {
  friend: Friend
  refetch: () => void
}

export const FriendItem: FC<FriendItemProps> = ({friend, refetch}) => {
  let [searchTab] = useSearchParams();
  const profile = useProfile()
  const isAdmin = profile.hasRole(Role.admin)
  const toasts = useToasts()
  const navigate = useNavigate()
  const [sendFriendRequest] = useSendFriendRequestMutation()
  const [addRole] = useAddRoleMutation()
  const [removeRole] = useRemoveRoleMutation()

  const tab: FRIENDS_TABS = useMemo(() => (searchTab?.get("tab") as FRIENDS_TABS || FRIENDS_TABS.friends), [searchTab])

  const isUserTeacher = friend?.role === Role.teacher
  const isUserAdmin = friend?.role === Role.admin

  const buttonStatus = useMemo(() => {
    if (tab == FRIENDS_TABS.sent) return "Заявка отправлена"
    if (tab == FRIENDS_TABS.received) return "Принять заявку"
    if (tab == FRIENDS_TABS.friends) return "В друзьях"

    return getFriendButtonStatus(friend.friendStatus)
  }, [friend])

  const buttonDisabled = useMemo(() => {
    return tab == FRIENDS_TABS.friends || tab === FRIENDS_TABS.sent || 
    friend.friendStatus === FriendStatus.friends || friend.friendStatus === FriendStatus.sent
  }, [friend])

  const handleButtonClick = async () => {
    await sendFriendRequest(friend.id)
    await refetch()
    if (friend.friendStatus === FriendStatus.none) {
      toasts.success("Заявка отправлена")
    }
    if (friend.friendStatus === FriendStatus.received) {
      toasts.success("Заявка принята")
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
      <UserItemLeft onClick={() => navigate(`/user/${friend.id}`)}>
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
