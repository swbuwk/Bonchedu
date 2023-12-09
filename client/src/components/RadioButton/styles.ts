import { styled } from "styled-components";
import { Colors } from "../../constants/Colors";

export const RadioButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  border-radius: 15px;
  box-shadow: 0 0 10px ${Colors.gray}44;  
`

export const RadioButtonItem = styled.div<{
  isActive?: boolean
  first?: boolean
  last?: boolean
}>`
  cursor: pointer;
  display: flex;
  width: 100%;
  padding: 8px 20px;
  font-size: 16px;
  align-items: center;
  justify-content: center;
  border: 1px solid ${Colors.gray};
  border-radius: ${p => p.first ? "15px 0 0 15px" : p.last ? "0 15px 15px 0" : ""};

  border-color: ${p => p.isActive ? Colors.blue : Colors.gray};

  color: ${p => p.isActive ? Colors.blue : Colors.black};
`