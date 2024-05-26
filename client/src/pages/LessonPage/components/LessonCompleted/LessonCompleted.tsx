import { FC } from "react";
import {
  LessonCompletedTitle,
  LessonCompletedWrapper,
  Precision,
} from "./styles";
import Button from "../../../../components/Button";
import { useNavigate } from "react-router-dom";
import { LessonResultsResponse } from "../../../../api/types/LessonApiTypes";

interface LessonCompletedProps {
  chapterId: string;
  results?: LessonResultsResponse
}

export const LessonCompleted: FC<LessonCompletedProps> = ({
  results,
  chapterId,
}) => {
  const navigate = useNavigate();

  const handleGoToChapter = () => {
    navigate(`/chapters/${chapterId}`);
  };

  return (
    <LessonCompletedWrapper>
      <LessonCompletedTitle>Занятие пройдено!</LessonCompletedTitle>
      <Precision>Результат: {Math.round(results?.score || 0)}%</Precision>
      <Precision>Получено опыта: {results?.expDiff}</Precision>
      <Button onClick={handleGoToChapter}>Вернуться к занятиям</Button>
    </LessonCompletedWrapper>
  );
};
