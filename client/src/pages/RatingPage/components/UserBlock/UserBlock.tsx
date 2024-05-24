import { FC } from "react"
import { User } from "../../../../api/types/entities/User"
import { UserAvatar, UserBlockExp, UserBlockLeft, UserBlockName, UserBlockPlace, UserBlockWrapper, UserInfo } from "./styles"
import { useNavigate } from "react-router-dom"

interface UserBlockProps {
  user: User
  place: number
}

export const UserBlock: FC<UserBlockProps> = ({user, place}) => {
  const navigate = useNavigate()

  return (
    <UserBlockWrapper>
      <UserBlockLeft onClick={() => navigate(`/user/${user.id}`)}>
        <UserAvatar/>
        <UserInfo>
          <UserBlockName>{user.username}</UserBlockName>
          <UserBlockExp>Опыт: {user.expirience}</UserBlockExp>
        </UserInfo>
      </UserBlockLeft>
      <UserBlockPlace>{place}</UserBlockPlace>
    </UserBlockWrapper>
  )
}
