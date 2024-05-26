import { FC } from "react";
import { Question } from "../../../../api/types/entities/Question";
import {
  AnswersWrapper,
  LessonQuestionWrapper,
  QuestionText,
  QuestionProgress,
  QuestionImage,
} from "./styles";
import { Input } from "../../../../components/Input/Input";
import { Endpoints } from "../../../../api";

interface LessonQuestionProps {
  question: Question;
  onAnswer: (questionId: string, answerId: string) => void;
  answerText: string;
  progress: number;
}

export const LessonQuestion: FC<LessonQuestionProps> = ({
  question,
  progress,
  onAnswer,
  answerText
}) => {
  return (
    <LessonQuestionWrapper>
      <QuestionText>{question.questionText ? question.questionText : "Вопрос"}</QuestionText>
      {question.attachmentId ? <QuestionImage><img src={Endpoints.files + question.attachmentId}/></QuestionImage> : <></>}
      <QuestionProgress progress={progress}>
        <div />
      </QuestionProgress>
      <AnswersWrapper>
        <Input
          placeholder="Введите ответ"
          value={answerText || ""}
          onChange={e => onAnswer(question?.id, e.target.value)}
        />
        {/* {question.answers.map((answer) => (
          <Button
            whiteTheme
            key={answer.id}
            onClick={() => onAnswer(question.id, answer.id)}
            selected={answerId === answer.id}
          >
            {answer.text ? answer.text : "Пустой ответ"}
          </Button>
        ))} */}
      </AnswersWrapper>
    </LessonQuestionWrapper>
  );
};
