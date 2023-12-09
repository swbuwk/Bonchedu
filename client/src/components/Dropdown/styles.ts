import { styled } from "styled-components";
import { Colors } from "../../constants/Colors";

export const DropdownWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;
`

export const TargetWrapper = styled.div`
`

export const DropdownList = styled.div<{
  isVisible: boolean
}>`
  position: absolute;
  pointer-events: none;
  top: 38px;
  border-radius: 15px;
  border: 1px solid ${Colors.lightgray};
  background-color: ${Colors.white};
  display: ${p => p.isVisible ? "flex" : "none"};
  flex-direction: column;
  overflow: hidden;
  transition: 0.15s;
  opacity: 0;
`

export const DropdownItem = styled.div`
  user-select: none;
  pointer-events: all;
  display: flex;
  align-items: center;
  padding: 12px 24px;
  background-color: ${Colors.white};
  transition: 0.2s;

  &:hover {
    background-color: ${Colors.lightgray};
  }
`

export const DropdownTargetWrapper = styled.div`
  width: 31px;
  height: 34px;
  border-radius: 12px;
  background-color: ${Colors.white};
  box-shadow: 0 0 5px #00000022;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 3px;
`

export const DropdownDot = styled.div`
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: ${Colors.gray};
`