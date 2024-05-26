import { styled } from "styled-components";
import { Colors } from "../../../../constants/Colors";

export const LessonQuestionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 40%;
`;

export const QuestionText = styled.div`
  font-size: 28px;
`;

export const AnswersWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 16px;
`;

export const QuestionProgress = styled.div<{
  progress: number;
}>`
  position: relative;
  width: 100%;
  height: 3px;
  background-color: ${Colors.lightgray};
  border-radius: 3px;

  & div {
    width: ${(p) => p.progress * 100}%;
    height: 100%;
    background-color: ${Colors.blue};
    position: absolute;
    transition: 0.2s;
    z-index: 2;
    top: 0;
    left: 0;
    border-radius: 3px;
  }
`;

export const QuestionImage = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 15px;
  overflow: hidden;
  
  img {
    display: block;
    width: 100%;
  }
`