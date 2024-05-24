import { styled } from "styled-components";
import { Colors } from "../../constants/Colors";

export const UserPageWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  height: calc(100% - 24px);
  margin-top: 24px;
  gap: 24px;
`

export const UserHeader = styled.div`
  display: flex;
  width: 100%;
  gap: 24px;
`

export const UserAvatarBig = styled.div`
  width: 200px;
  height: 200px;
  min-width: 200px;
  border-radius: 15px;
  background-color: ${Colors.lightBlue};
`

export const Username = styled.div`
  font-size: 48px;
  line-height: 44px;
`

export const RoleName = styled.div`
  font-size: 18px;
  margin-bottom: 24px;

`

export const UserTextInfo = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 16px;
`

export const UserLevel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

export const LevelName = styled.div`
  font-size: 24px;
`

export const ProgressBarWrapper = styled.div`
  width: 300px;
`

export const UserPersonalInfoWrapper =  styled.div`
  position: relative;
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 16px;
`

export const UserPersonalInfoTitle =  styled.div`
  font-size: 32px;
`

export const UserPersonalInfo =  styled.div`
  font-size: 18px;
`

export const PersonalInfoOverlay = styled.div`
  position: absolute;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: 0.2s;

  &:hover {
    opacity: 1;
  }
`

export const PersonalInfoButtons = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  gap: 24px;
`