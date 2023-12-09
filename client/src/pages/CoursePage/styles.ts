import { styled } from "styled-components";

export const CoursePageWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 4.4%;
  width: 100%;
  max-width: 100%;
  height: 100%;
`;

export const CourseContentWrapper = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  max-width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
`;

export const ChapterList = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 100%;
  gap: 16px;
  align-items: flex-end;
`;

export const CourseTitle = styled.div`
  font-size: 40px;
  line-height: normal;
`;

export const CourseDescription = styled.div`
  color: #838383;
  font-size: 20px;
  line-height: normal;
`;

export const CourseText = styled.div`
  padding-left: 48px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
