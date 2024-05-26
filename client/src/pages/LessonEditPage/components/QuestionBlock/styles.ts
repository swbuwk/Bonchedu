import { styled } from "styled-components";
import { Colors } from "../../../../constants/Colors";

export const AddQuestionButton = styled.div`
  cursor: pointer;
  width: 100%;
  height: 200px;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 24px;
  border-radius: 15px;
  border: 2px dashed ${Colors.blue};
`

export const AddQuestionTitle = styled.div`
  font-size: 32px;
  color: ${Colors.blue};
`

export const QuestionBlockWrapper = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 48px;
  align-items: center;
`

export const QuestionBlockInner = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  gap: 18px;
  align-items: center;
`

export const QuestionControls = styled.div`
  position: absolute;
  top: -20px;
  right: 16px;

  & svg {
    cursor: pointer;
  }
`

export const QuestionInputWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  width: 100%;
  gap: 24px;
`

export const ImageToggler = styled.div<{
  toggled: boolean
  disabled?: boolean
}>`
  cursor: pointer;
  height: 37px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  border-radius: 10px;
  box-shadow: 0 0 10px #AAAAAA44;
  background-color: ${p => p.disabled ? (p.toggled ? Colors.lightBlue : Colors.white) : (p.toggled ? Colors.blue : "#fff")};
  
  transition: background-color 0.1s;
`