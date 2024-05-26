import { FC } from "react"
import { User } from "../../../../api/types/entities/User"
import { UserAvatar, UserBlockExp, UserBlockLeft, UserBlockName, UserBlockPlace, UserBlockWrapper, UserInfo } from "./styles"
import { useNavigate } from "react-router-dom"
import { Endpoints } from "../../../../api"

interface UserBlockProps {
  user: User
  place: number
}

export const UserBlock: FC<UserBlockProps> = ({user, place}) => {
  const navigate = useNavigate()

  return (
    <UserBlockWrapper>
      <UserBlockLeft onClick={() => navigate(`/user/${user.id}`)}>
        <UserAvatar>
          {user?.avatarId !== "00000000-0000-0000-0000-000000000000" && <img src={Endpoints.files + user?.avatarId} />}
        </UserAvatar>
        <UserInfo>
          <UserBlockName>{user.username}</UserBlockName>
          <UserBlockExp>Опыт: {user.experience}</UserBlockExp>
        </UserInfo>
      </UserBlockLeft>
      <UserBlockPlace>{place}</UserBlockPlace>
    </UserBlockWrapper>
  )
}
