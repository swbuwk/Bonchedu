import { useParams } from "react-router-dom";
import { useLazyGetUserByIdQuery, useUpdatePersonalInfoMutation } from "../../store/services/user";
import Spinner from "../../components/Spinner";
import { LevelName, PersonalInfoButtons, PersonalInfoOverlay, ProgressBarWrapper, RoleName, UserAvatarBig, UserHeader, UserLevel, UserPageWrapper, UserPersonalInfo, UserPersonalInfoTitle, UserPersonalInfoWrapper, UserTextInfo, Username } from "./styles";
import { getRoleName } from "../../utils/getRoleName";
import ProgressBar from "../../components/ProgressBar";
import { getLevel } from "../../utils/getLevel";
import ContentBlock from "../../components/ContentBlock";
import Button from "../../components/Button";
import { EditIcon } from "../../assets/icons/EditIcon";
import { Input } from "../../components/Input/Input";
import { useCallback, useEffect, useState } from "react";
import { useToasts } from "../../hooks/useToasts";

export const UserPage = () => {
  const toasts = useToasts()
  const { id: userId } = useParams<{ id: string }>();
  const [getUser, { data: user, isLoading: isUserLoading }] = useLazyGetUserByIdQuery()
  const [updatePersonalInfo] = useUpdatePersonalInfoMutation()
  const { level, expLeft, expToNextLevel } = getLevel(user?.expirience);

  const [editMode, setEditMode] = useState<boolean>(false)
  const [personalInfoValue, setPersonalInfoValue] = useState<string>("")

  useEffect(() => {
    getUser(userId || "").then(res => setPersonalInfoValue(res.data?.personalInfo || ""))
  }, [userId])

  const handleSave = useCallback(async () => {
    await updatePersonalInfo(personalInfoValue)
    await getUser(userId || "")
    toasts.success("Информация обновлена")
    setEditMode(false)
  }, [personalInfoValue, userId])

  const handleBack = useCallback(() => {
    setPersonalInfoValue(user?.personalInfo || "")
    setEditMode(false)
  }, [user])

  if (isUserLoading) return <Spinner/>

  return (
    <UserPageWrapper>
      <UserHeader>
        <UserAvatarBig/>
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
