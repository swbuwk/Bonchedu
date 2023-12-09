import { styled } from "styled-components";
import { Colors } from "../../../../constants/Colors";

export const AddTaskButton = styled.div`
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

export const AddTaskTitle = styled.div`
  font-size: 32px;
  color: ${Colors.blue};
`

export const TaskBlockWrapper = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 48px;
  align-items: center;
`

export const TaskBlockInner = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  gap: 18px;
  align-items: center;
`

export const TaskControls = styled.div`
  position: absolute;
  top: -20px;
  right: 16px;

  & svg {
    cursor: pointer;
  }
`