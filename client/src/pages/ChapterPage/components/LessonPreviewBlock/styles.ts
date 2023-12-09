import { styled } from "styled-components";
import { Colors } from "../../../../constants/Colors";

export const LessonBlockOuter = styled.div<{
  expanded?: boolean
}>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  transition: 0.2s;
  min-height: ${p => p.expanded ? 310 : 80}px;
  height: ${p => p.expanded ? 310 : 80}px;
  overflow: hidden;
`

export const LessonBlockWrapper = styled.div<{
  disabled?: boolean
}>`
  height: 80px;
  width: 100%;
  padding: 0 24px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 15px;
  font-size: 22px;
  box-shadow: 0px 0px 10px ${Colors.gray}44;  
  background-color: ${p => p.disabled ? Colors.lightgray : Colors.white};
  z-index: 5;
`;

export const LessonLeftSide = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`

export const LessonCompleted = styled.div`
  font-size: 16px;
`

export const LessonRightSide = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  font-size: 16px;
  gap: 32px;
`

export const LessonPosition = styled.div`
  color: ${Colors.blue};
  font-size: 28px;
  font-weight: 400;
  line-height: normal;
`

export const AddLessonButton = styled.div`
  cursor: pointer;
  min-height: 80px;
  height: 80px;
  border-radius: 15px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  width: 100%;
  border: 2px dashed ${Colors.blue};
`

export const AddLessonTitle = styled.div`
  text-align: center;
  font-size: 20px;
  line-height: 22px;
  color: ${Colors.blue};
`

export const AdditionalInfo = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-color: ${Colors.lightgray}44;
  box-sizing: border-box;
  padding: 24px;
  padding-top: 104px;
  width: 95%;
  height: 300px;
  border-radius: 15px;
  font-size: 22px;
  box-shadow: 0 0 10px ${Colors.gray}44;  
`

export const AdditionalText = styled.div`
  font-size: 22px;
`