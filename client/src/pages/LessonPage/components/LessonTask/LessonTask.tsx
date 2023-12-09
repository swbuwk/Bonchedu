import { FC } from "react";
import { Task } from "../../../../api/types/entities/Task";
import {
  AnswersWrapper,
  LessonTaskWrapper,
  Question,
  TaskProgress,
} from "./styles";
import Button from "../../../../components/Button";

interface LessonTaskProps {
  task: Task;
  onAnswer: (taskId: string, answerId: string) => void;
  answerId: string;
  progress: number;
}

export const LessonTask: FC<LessonTaskProps> = ({
  task,
  onAnswer,
  answerId,
  progress,
}) => {
  return (
    <LessonTaskWrapper>
      <Question>{task.question ? task.question : "Вопрос"}</Question>
      <TaskProgress progress={progress}>
        <div />
      </TaskProgress>
      <AnswersWrapper>
        {task.answers.map((answer) => (
          <Button
            whiteTheme
            key={answer.id}
            onClick={() => onAnswer(task.id, answer.id)}
            selected={answerId === answer.id}
          >
            {answer.text ? answer.text : "Пустой ответ"}
          </Button>
        ))}
      </AnswersWrapper>
    </LessonTaskWrapper>
  );
};
