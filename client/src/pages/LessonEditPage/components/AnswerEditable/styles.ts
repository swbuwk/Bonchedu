import { styled } from "styled-components";
import { Colors } from "../../../../constants/Colors";

export const AddAnswerButton = styled.div`
  cursor: pointer;
  display: flex;
  width: 100%;
  height: 32px;
  align-items: center;
  justify-content: center;
  gap: 16px;
  border: 2px dashed ${Colors.blue};
  border-radius: 15px;
`

export const AddAnswerTitle = styled.div`
  font-size: 18px;
  color: ${Colors.blue};
`

export const AnswerEditableWrapper = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  width: 100%;
`

export const AnswerControls = styled.div`
  position: absolute;
  right: 10px;
  display: flex;
  gap: 12px;

  & svg {
    cursor: pointer;
  }
`