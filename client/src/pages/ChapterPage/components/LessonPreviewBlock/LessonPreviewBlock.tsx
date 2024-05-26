import { FC, useState } from "react";
import { AddLessonButton, AddLessonTitle, AdditionalInfo, AdditionalText, DraftText, LessonBlockOuter, LessonBlockWrapper, LessonLeftSide, LessonPosition, LessonRightSide } from "./styles";
import { Lesson, getDifficultyName } from "../../../../api/types/entities/Lesson";
import { PlusIcon } from "../../../../assets/icons/PlusIcon";
import { Colors } from "../../../../constants/Colors";
import { useModal } from "../../../../hooks/useModal";
import { ModalName } from "../../../../store/slices/modalSlice";
import { CreateLessonModalProps } from "../../../../features/Modal/modals/CreateLessonModal/CreateLessonModal";
import Button from "../../../../components/Button";
import { useToasts } from "../../../../hooks/useToasts";
import { useProfile } from "../../../../hooks/useProfile";
import { Role } from "../../../../api/types/entities/Role";
import { EditIcon } from "../../../../assets/icons/EditIcon";
import { useNavigate } from "react-router-dom";
import { useDeleteLessonMutation, useStartLessonMutation } from "../../../../store/api";
import { CrossIcon } from "../../../../assets/icons/CrossIcon";

interface LessonPreviewBlockProps {
  lesson: Lesson;
  isAddButton?: boolean
  disabled?: boolean
}

export const LessonPreviewBlock: FC<LessonPreviewBlockProps> = ({ lesson, disabled, isAddButton }) => {
  const modal = useModal()
  const toasts = useToasts()
  const profile = useProfile()
  const navigate = useNavigate()
  const [startLesson] = useStartLessonMutation()
  const [deleteLesson] = useDeleteLessonMutation()
  const [expanded, setExpanded] = useState<boolean>(false)
  const isOwner = profile.hasRole(Role.admin) || (profile.hasRole(Role.teacher) && profile.user.id === lesson?.authorId);

  const handleLessonStart = async () => {
    let isError = false
    if (lesson.started) {
      navigate(`/lessons/${lesson.id}`)
      return
    }
    await startLesson(lesson.id).unwrap()
      .catch(err => {
        toasts.error(err?.data?.message)
        isError = true
      })

    if (isError) return

    navigate(`/lessons/${lesson.id}`)
  }

  const handleLessonDelete = () => {
    modal.open({
      name: ModalName.confirm,
      title: "Вы действительно хотите удалить это занятие?",
      onConfirm: async () => {
        await deleteLesson(lesson.id)
        toasts.success("Занятие удалено")
      }
    })
  }

  if (isAddButton) return <AddLessonButton
    onClick={() =>
      modal.open<CreateLessonModalProps>({
        name: ModalName.createLesson,
      })
    }
  >
      <AddLessonTitle>Добавить занятие</AddLessonTitle>
      <PlusIcon fill={Colors.blue} />
  </AddLessonButton>

  return <LessonBlockOuter expanded={expanded}>
    <LessonBlockWrapper disabled={disabled}>
      <LessonLeftSide>
        <LessonPosition>Занятие {lesson.number + 1}:</LessonPosition>
        {lesson.name}
        {isOwner && !lesson.finalized ? <DraftText>Черновик</DraftText> : <></>}
      </LessonLeftSide>
      <LessonRightSide>
        <Button onClick={() => setExpanded(p => !p)} whiteTheme>Информация</Button>
        <Button disabled={disabled} resizable onClick={handleLessonStart} >{lesson.started ? "Перейти" : "Начать"}</Button>
        {isOwner && <Button whiteTheme onClick={() => navigate(`/lessons/${lesson.id}/edit`)}><EditIcon w="24px"/></Button>}
        {isOwner && <Button whiteTheme onClick={handleLessonDelete}><CrossIcon fill={Colors.red} w="18px"/></Button>}
      </LessonRightSide>
    </LessonBlockWrapper>
    <AdditionalInfo>
      <AdditionalText>Сложность: {getDifficultyName(lesson.difficulty)}</AdditionalText>
      <AdditionalText>Опыта за ответ: {lesson.gainedExperience}</AdditionalText>
      <AdditionalText>Статус: {lesson.completed ? "Пройдено" : "Не пройдено"}</AdditionalText>
    </AdditionalInfo>
  </LessonBlockOuter> 
};
