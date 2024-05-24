import { styled } from "styled-components";
import { Colors } from "../../../../constants/Colors";

export const UserBlockWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  box-sizing: border-box;
  padding: 24px;
  padding-right: 48px;
  background-color: #fff;
  border-radius: 15px;
`

export const UserBlockLeft = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 16px;
`

export const UserAvatar = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 15px;
  background-color: ${Colors.lightBlue};
`

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`

export const UserBlockName = styled.div`
  font-size: 24px;
`

export const UserBlockExp = styled.div`
  font-size: 18px;
`

export const UserBlockPlace = styled.div`
  font-size: 48px;
  color: ${Colors.blue};
`