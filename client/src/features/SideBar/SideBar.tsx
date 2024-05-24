import ContentBlock from "../../components/ContentBlock";
import ProgressBar from "../../components/ProgressBar";
import { useProfile } from "../../hooks/useProfile";
import { getLevel } from "../../utils/getLevel";
import {
  ProfileAvatar,
  ProfileInfo,
  ProfileInfoWrapper,
  ProfileLevel,
  ProfileName,
  SideBarWrapper,
  SidebarInner,
} from "./styles";
import Navigation from "./components/Navigation";
import { useNavigate } from "react-router-dom";

export const SideBar = () => {
  const { user } = useProfile();
  const navigate = useNavigate()
  const { level, expLeft, expToNextLevel } = getLevel(user.expirience);

  return (
    <SideBarWrapper>
      <ContentBlock h="100%" w="100%" padding="16px">
        <SidebarInner>
          <ProfileInfoWrapper onClick={() => navigate(`/user/${user.id}`)}>
            <ProfileAvatar>
              {user.avatarID !== "00000000-0000-0000-0000-000000000000" && <img src={user.avatarID} />}
            </ProfileAvatar>
            <ProfileInfo>
              <ProfileName>{user.username}</ProfileName>
              <ProfileLevel>Уровень {level}</ProfileLevel>
              <ProgressBar progress={expLeft} full={expToNextLevel} />
            </ProfileInfo>
          </ProfileInfoWrapper>
          <Navigation />
        </SidebarInner>
      </ContentBlock>
    </SideBarWrapper>
  );
};
