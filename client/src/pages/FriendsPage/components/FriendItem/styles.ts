import { styled } from "styled-components"
import { Colors } from "../../../../constants/Colors"

export const UserItemWrapper = styled.div`
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

export const UserItemLeft = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
`

export const UserAvatar = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 15px;
  background-color: ${Colors.lightBlue};
`

export const UserInfokName = styled.div`
  font-size: 20px;
`