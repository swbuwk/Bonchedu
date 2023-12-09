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

export const SideBar = () => {
  const { user } = useProfile();
  const { level, expLeft, expToNextLevel } = getLevel(user.expirience);

  return (
    <SideBarWrapper>
      <ContentBlock h="100%" w="100%" padding="16px">
        <SidebarInner>
          <ProfileInfoWrapper>
            <ProfileAvatar>
              {user.avatarImage && <img src={user.avatarImage} />}
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
