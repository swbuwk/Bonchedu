import { styled } from "styled-components";
import { Colors } from "../../constants/Colors";

export const ProgressTooltip = styled.div`
  cursor: default;
  position: absolute;
  display: flex;
  justify-self: center;
  align-self: center;
  margin: auto;
  top: -40px;
  padding: 4px 12px;
  border-radius: 5px;
  color: ${Colors.white};
  background-color: #222222dd;
  transition: 0.2s;
  opacity: 0;
  pointer-events: none;
`;

export const ProgressBarWrapper = styled.div`
  position: relative;
  width: 100%;
  border-radius: 15px;
  background: ${Colors.lightgray};
  height: 17px;
  display: flex;
  justify-content: center;

  &:hover ${ProgressTooltip} {
    opacity: 1;
  }
`;

export const ProgressedZone = styled.div<{
  width?: number;
}>`
  position: absolute;
  left: 0;
  transition: 0.2s;
  width: ${(p) => (p.width ? p.width * 100 : 0)}%;
  border-radius: 15px;
  background: ${Colors.blue};
  height: 100%;
`;
