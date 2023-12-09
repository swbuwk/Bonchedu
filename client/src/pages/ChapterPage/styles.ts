import { styled } from "styled-components";
import { Colors } from "../../constants/Colors";

export const ChapterPageWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 4.4%;
  width: 100%;
  max-width: 100%;
  height: 100%;
`;

export const ChaptreInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const ChapterTextWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const ChapterNumberBig = styled.div`
  color: ${Colors.blue};
  font-size: 60px;
  font-weight: 400;
  line-height: normal;
`;

export const ChapterTitle = styled.div`
  font-size: 20px;
  font-weight: 400;
  line-height: normal;
  max-width: 200px;
`;

export const LessonsList = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  box-sizing: border-box;
  gap: 16px;
  overflow-y: scroll;
  overflow-x: hidden;
  padding-right: 10px;
`;
