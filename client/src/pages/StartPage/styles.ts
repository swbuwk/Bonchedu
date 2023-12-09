import { styled } from "styled-components";
import { Colors } from "../../constants/Colors";

export const StartPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

export const MainTitle = styled.div`
  font-size: 96px;
  font-weight: 700;
  background: linear-gradient(135deg, ${Colors.blue}, #00c2ff);
  background-clip: text;
  -webkit-text-fill-color: transparent;
`;
