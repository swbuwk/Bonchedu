import { styled } from "styled-components";
import { Colors } from "../../constants/Colors";

export const FriendsPageWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
  max-height: 100%;
  overflow: hidden;
  gap: 24px;
`

export const FriendsTabSwitcher = styled.div`
  display: flex;
  margin-top: 32px;
  gap: 16px;
  justify-content: space-between;
  width: 100%;
`

export const FriendsTab = styled.div<{
  active: boolean
}>`
  cursor: pointer;
  font-size: 22px;
  width: 90%;
  text-align: center;
  transition: 0.2s;
  border-bottom: 2px solid ${p => p.active ? Colors.blue : Colors.gray};
`

export const UserList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  height: 100%;
  max-height: 100%;
  overflow-y: scroll;
`