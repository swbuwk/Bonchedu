import { styled } from "styled-components";
import { Colors } from "../../../../constants/Colors";

export const ChapterPreviewWrapper = styled.div`
  cursor: pointer;
  display: flex;
  gap: 24px;
  padding: 16px;
  border-radius: 15px;
  background-color: #ffffff;
  transition: 0.2s;

  &:hover {
    background-color: #cfd3e0;
  }
`;

export const ChapterCube = styled.div`
  height: 120px;
  width: 120px;
  min-width: 120px;
  border-radius: 15px;
  background: #878fb1;
`;

export const AddChapterButton = styled.div`
  width: 100%;
  height: 100%;
  min-height: 152px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  background-color: #fff;
  border-radius: 15px;
  padding: 16px;
  box-sizing: border-box;
  border: 2px dashed ${Colors.blue};
`;

export const AddChapterTitle = styled.div`
  text-align: center;
  font-size: 20px;
  line-height: 22px;
  color: ${Colors.blue};
`;

export const ChapterInfo = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  flex-direction: column;
`;

export const ChapterText = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ChapterIndex = styled.div`
  color: ${Colors.blue};
  font-size: 40px;
  line-height: normal;
`;

export const ChapterTitle = styled.div`
  font-size: 20px;
  line-height: normal;
`;
