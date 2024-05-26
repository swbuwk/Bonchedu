import { FC, useEffect, useState } from "react";
import { Answer } from "../../../../api/types/entities/Question";
import {
  AddAnswerButton,
  AddAnswerTitle,
  AnswerControls,
  AnswerEditableWrapper,
} from "./styles";
import { PlusIcon } from "../../../../assets/icons/PlusIcon";
import { Colors } from "../../../../constants/Colors";
import { Input } from "../../../../components/Input/Input";
import { CrossIcon } from "../../../../assets/icons/CrossIcon";
import { useDebouncedEffect } from "../../../../hooks/useDebouncedEffect";
import { CheckIcon } from "../../../../assets/icons/CheckIcon";
import { useAddAnswerMutation, useDeleteAnswerMutation, useLazyGetLessonQuestionsQuery, useSetRightAnswerMutation, useUpdateAnswerMutation } from "../../../../store/api";

interface AnswerEditableProps {
  answer: Answer;
  isAddButton?: boolean;
  isRightAnswer?: boolean;
  taskId: string;
  lessonId: string;
}

export const AnswerEditable: FC<AnswerEditableProps> = ({
  answer,
  taskId,
  lessonId,
  isAddButton,
  isRightAnswer,
}) => {
  const [addAnswer] = useAddAnswerMutation();
  const [deleteAnswer] = useDeleteAnswerMutation();
  const [updateAnswer] = useUpdateAnswerMutation();
  const [setRightAnswer] = useSetRightAnswerMutation();
  const [getLessonQuestions] = useLazyGetLessonQuestionsQuery();
  const [answerText, setAnswerText] = useState<string>("");

  const handleAddAnswer = async () => {
    await addAnswer({
      taskId,
      text: "",
    });
    getLessonQuestions(lessonId);
  };

  const handleDeleteAnswer = async () => {
    await deleteAnswer(answer.id);
    getLessonQuestions(lessonId);
  };

  const handleAnswerUpdate = async () => {
    if (!answer.id || answerText === answer.text) return;
    await updateAnswer({
      id: answer.id,
      text: answerText,
    });
    getLessonQuestions(lessonId);
  };

  const handleSetRightAnswer = async () => {
    if (!answer.id || !taskId) return;
    await setRightAnswer({
      answerId: answer.id,
      taskId,
    });
    getLessonQuestions(lessonId);
  };

  useEffect(() => {
    setAnswerText(answer.text);
  }, [answer.text]);

  useDebouncedEffect(
    () => {
      handleAnswerUpdate();
    },
    [answerText, answer.id],
    700
  );

  if (isAddButton)
    return (
      <AddAnswerButton onClick={handleAddAnswer}>
        <AddAnswerTitle>Добавить вариант ответа</AddAnswerTitle>
        <PlusIcon w="16px" h="16px" fill={Colors.blue} />
      </AddAnswerButton>
    );

  return (
    <AnswerEditableWrapper>
      <AnswerControls>
        <CheckIcon
          onClick={handleSetRightAnswer}
          fill={isRightAnswer ? Colors.green : Colors.gray}
          w="16px"
          h="16px"
        />
        <CrossIcon
          onClick={handleDeleteAnswer}
          fill={Colors.red}
          w="16px"
          h="16px"
        />
      </AnswerControls>
      <Input
        value={answerText}
        onChange={(e) => setAnswerText(e.target.value)}
        placeholder="Введите вариант ответа"
      />
    </AnswerEditableWrapper>
  );
};
