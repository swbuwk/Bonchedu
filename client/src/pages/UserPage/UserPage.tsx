import { useParams } from "react-router-dom";
import Spinner from "../../components/Spinner";
import { LevelName, PersonalInfoButtons, PersonalInfoOverlay, ProgressBarWrapper, RoleName, UpdateImageOverlay, UserAvatarBig, UserHeader, UserLevel, UserPageWrapper, UserPersonalInfo, UserPersonalInfoTitle, UserPersonalInfoWrapper, UserTextInfo, Username } from "./styles";
import { getRoleName } from "../../utils/getRoleName";
import ProgressBar from "../../components/ProgressBar";
import { getLevel } from "../../utils/getLevel";
import ContentBlock from "../../components/ContentBlock";
import Button from "../../components/Button";
import { EditIcon } from "../../assets/icons/EditIcon";
import { Input } from "../../components/Input/Input";
import { useCallback, useState } from "react";
import { useToasts } from "../../hooks/useToasts";
import { Endpoints } from "../../api";
import { useProfile } from "../../hooks/useProfile";
import { useModal } from "../../hooks/useModal";
import { ModalName } from "../../store/slices/modalSlice";
import { useGetUserByIdQuery, useUpdatePersonalInfoMutation } from "../../store/api";

export const UserPage = () => {
  const toasts = useToasts()
  const modal = useModal()
  const profile = useProfile()
  const { id: userId } = useParams<{ id: string }>();
  const { data: user, isLoading: isUserLoading } = useGetUserByIdQuery(userId || "")
  const [updatePersonalInfo] = useUpdatePersonalInfoMutation()
  const { level, expLeft, expToNextLevel } = getLevel(user?.experience);

  const [editMode, setEditMode] = useState<boolean>(false)
  const [personalInfoValue, setPersonalInfoValue] = useState<string>("")

  const handleSave = useCallback(async () => {
    await updatePersonalInfo({ personalInfo: personalInfoValue })
    toasts.success("Информация обновлена")
    setEditMode(false)
  }, [personalInfoValue, userId])

  const handleUpdateAvatar = () => {
    modal.open({
      name: ModalName.updateAvatar,
    })
  }

  const handleBack = useCallback(() => {
    setPersonalInfoValue(user?.personalInfo || "")
    setEditMode(false)
  }, [user])

  if (isUserLoading) return <Spinner/>

  return (
    <UserPageWrapper>
      <UserHeader>
        <UserAvatarBig>
          {userId === profile.user.id ? <UpdateImageOverlay onClick={handleUpdateAvatar}><EditIcon w="64px" h="64px" fill="#fff"/></UpdateImageOverlay> : <></>}
          {user?.avatarId !== "00000000-0000-0000-0000-000000000000" && <img src={Endpoints.files + user?.avatarId} />}
        </UserAvatarBig>
        <UserTextInfo>
          <Username>{user?.username}</Username>
          <RoleName>{getRoleName(user?.role)}</RoleName>
          <UserLevel>
            <LevelName>Уровень {level}</LevelName>
            <ProgressBarWrapper>
              <ProgressBar progress={expLeft} full={expToNextLevel}/>
            </ProgressBarWrapper>
          </UserLevel>
        </UserTextInfo>
      </UserHeader>
      <ContentBlock>
        {!editMode ? 
          <UserPersonalInfoWrapper>
            <PersonalInfoOverlay>
              <Button whiteTheme onClick={() => setEditMode(true)}><EditIcon/></Button>
            </PersonalInfoOverlay>
            <UserPersonalInfoTitle>О пользователе</UserPersonalInfoTitle>
            <UserPersonalInfo>{user?.personalInfo || "Информация о пользователе отсутствует"}</UserPersonalInfo>
          </UserPersonalInfoWrapper> :
          <UserPersonalInfoWrapper>
            <UserPersonalInfoTitle>Напишите о себе</UserPersonalInfoTitle>
            <Input 
              height="300px" 
              value={personalInfoValue} 
              onChange={e => setPersonalInfoValue(e.target.value)} 
              type="textarea"
            />
            <PersonalInfoButtons>
              <Button disabled={personalInfoValue.length === 0} onClick={handleSave}>Сохранить</Button>
              <Button onClick={handleBack} whiteTheme>Назад</Button>
            </PersonalInfoButtons>
          </UserPersonalInfoWrapper>
        }
      </ContentBlock>
    </UserPageWrapper>
  )
}
