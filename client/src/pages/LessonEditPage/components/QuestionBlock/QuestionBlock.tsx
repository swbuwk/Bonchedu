import { FC, useEffect, useState } from "react";
import { Question } from "../../../../api/types/entities/Question";
import {
  AddQuestionButton,
  AddQuestionTitle,
  ImageToggler,
  QuestionBlockInner,
  QuestionBlockWrapper,
  QuestionControls,
  QuestionInputWrapper,
} from "./styles";
import { PlusIcon } from "../../../../assets/icons/PlusIcon";
import { Colors } from "../../../../constants/Colors";
import { useParams } from "react-router-dom";
import { QuestionDivider } from "../../styles";
import { Input } from "../../../../components/Input/Input";
import { useProfile } from "../../../../hooks/useProfile";
import { Role } from "../../../../api/types/entities/Role";
import { CrossIcon } from "../../../../assets/icons/CrossIcon";
import { useDebouncedEffect } from "../../../../hooks/useDebouncedEffect";
import ImageUploader from "../../../../components/ImageUploader";
import { ImageIcon } from "../../../../assets/icons/ImageIcon";
import { useAddQuestionMutation, useDeleteQuestionAttachmentMutation, useDeleteQuestionMutation, useGetLessonByIdQuery, useLazyGetLessonEditQuestionsQuery, useUpdateQuestionMutation } from "../../../../store/api";

interface QuestionBlockProps {
  question: Question;
  isAddButton?: boolean;
  disabled?: boolean
}

export const QuestionBlock: FC<QuestionBlockProps> = ({ question, isAddButton, disabled }) => {
  const { id: lessonId } = useParams<{ id: string }>();
  const profile = useProfile();
  const [addQuestion] = useAddQuestionMutation();
  const [deleteQuestion] = useDeleteQuestionMutation();
  const [deleteQuestionAttachment] = useDeleteQuestionAttachmentMutation()
  const [updateQuestion] = useUpdateQuestionMutation();
  const [getLessonQuestions] = useLazyGetLessonEditQuestionsQuery();
  const { data: lesson } = useGetLessonByIdQuery(lessonId || "")
  const isOwner = profile.hasRole(Role.admin) || (profile.hasRole(Role.teacher) && profile.user.id === lesson?.authorId);
  const [questionText, setQuestionText] = useState<string>("");
  const [correctAnswer, setCorrectAnswer] = useState<string>("")
  const [imageToggled, setImageToggled] = useState<boolean>(!!question.attachmentId)

  const handleAddQuestion = async () => {
    if (!lessonId) return;
    await addQuestion({
      lessonId,
      questionText: "Вопрос",
      correctAnswer: "Ответ"
    });
    getLessonQuestions(lessonId);
  };

  const handleDeleteQuestion = async () => {
    if (disabled) return
    if (!question.id || !lessonId) return;
    await deleteQuestion(question.id);
    getLessonQuestions(lessonId);
  };

  useEffect(() => {
    setQuestionText(question.questionText);
    setCorrectAnswer(question.correctAnswer)
  }, [question.questionText, question.correctAnswer]);

  const handleUpdateQuestion = async () => {
    if (disabled) return
    if (!question.id || !lessonId) return;
    if (questionText === question.questionText && correctAnswer === question.correctAnswer) return;
    await updateQuestion({
      id: question.id,
      questionText,
      correctAnswer
    });
    getLessonQuestions(lessonId);
  };

  const handleUploadAttachment = async (attachment: Blob) => {
    await updateQuestion({
      id: question.id,
      correctAnswer: question.correctAnswer,
      questionText: question.questionText,
      attachedFile: attachment
    });
  }

  const handleImageToggle = () => {
    if (disabled) return
    if (imageToggled) {
      deleteQuestionAttachment(question.id)
    }
    setImageToggled(!imageToggled)
  }

  useDebouncedEffect(
    () => {
      handleUpdateQuestion();
    },
    [questionText, correctAnswer, question.id],
    700
  );

  if (isAddButton)
    return (
      <AddQuestionButton onClick={handleAddQuestion}>
        <AddQuestionTitle>Добавить вопрос</AddQuestionTitle>
        <PlusIcon fill={Colors.blue} />
      </AddQuestionButton>
    );

  return (
    <QuestionBlockWrapper>
      <QuestionControls>
        <CrossIcon onClick={handleDeleteQuestion} fill={Colors.red} />
      </QuestionControls>
      <QuestionBlockInner>
        <QuestionInputWrapper>
          <Input
            disabled={disabled}
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            placeholder="Введите текст вопроса"
            fs="20px"
            label="Вопрос"
            boxShadow
          />
          <ImageToggler disabled={disabled} toggled={imageToggled} onClick={handleImageToggle}>
            <ImageIcon fill={imageToggled ? Colors.white : (disabled ? Colors.lightBlue : Colors.blue)}/>
          </ImageToggler>
        </QuestionInputWrapper>
        {imageToggled ? <ImageUploader defaultValue={question.attachmentId} resizableHeight onUpload={handleUploadAttachment}/> : <></>}
        <QuestionDivider />
        <Input
          disabled={disabled}
          value={correctAnswer}
          onChange={(e) => setCorrectAnswer(e.target.value)}
          placeholder="Введите текст правильного ответа"
          fs="20px"
          label="Ответ"
          boxShadow
        />
        {/* {question.answers &&
          [...question.answers, ...(isOwner ? [{} as Answer] : [])].map(
            (answer, idx) => (
              <AnswerEditable
                key={answer.id}
                questionId={question.id}
                lessonId={question.lessonId}
                answer={answer}
                isRightAnswer={answer.id === question.rightAnswerId}
                isAddButton={isOwner && idx === question.answers.length}
              />
            )
          )} */}
      </QuestionBlockInner>
      <QuestionDivider />
    </QuestionBlockWrapper>
  );
};
