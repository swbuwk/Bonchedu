import { styled } from "styled-components";
import { Colors } from "../../constants/Colors";

export const LessonEditPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 48px;
  height: 100%;
  width: 60vw;
`

export const BackButton = styled.div`
  cursor: pointer;
  color: ${Colors.blue};
  font-size: 28px;
  position: absolute;
  top: 0px;
  left: 20px;
`

export const EditPageTitle = styled.div`
  font-size: 32px;
`

export const QuestionDivider = styled.div`
  width: 100%;
  height: 3px;
  background-color: ${Colors.lightgray};
`

export const LessonEditTabSwitcher = styled.div`
  display: flex;
  gap: 24px;
`

export const LessonEditTab = styled.div<{
  active: boolean
}>`
  cursor: pointer;
  font-size: 22px;
  white-space: nowrap;
  width: 110%;
  text-align: center;
  transition: 0.2s;
  border-bottom: 2px solid ${p => p.active ? Colors.blue : Colors.gray};
`