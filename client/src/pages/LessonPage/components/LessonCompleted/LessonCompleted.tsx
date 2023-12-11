import { FC } from "react";
import {
  LessonCompletedTitle,
  LessonCompletedWrapper,
  Precision,
} from "./styles";
import Button from "../../../../components/Button";
import { useNavigate } from "react-router-dom";

interface LessonCompletedProps {
  precision: number;
  chapterId: string;
}

export const LessonCompleted: FC<LessonCompletedProps> = ({
  precision,
  chapterId,
}) => {
  const navigate = useNavigate();

  const handleGoToChapter = () => {
    navigate(`/chapters/${chapterId}`);
  };

  return (
    <LessonCompletedWrapper>
      <LessonCompletedTitle>Занятие пройдено!</LessonCompletedTitle>
      <Precision>Результат: {Math.round(precision * 100)}%</Precision>
      <Button onClick={handleGoToChapter}>Вернуться к занятиям</Button>
    </LessonCompletedWrapper>
  );
};
