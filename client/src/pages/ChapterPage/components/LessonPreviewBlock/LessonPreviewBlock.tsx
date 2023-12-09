import { FC, useState } from "react";
import { AddLessonButton, AddLessonTitle, AdditionalInfo, AdditionalText, LessonBlockOuter, LessonBlockWrapper, LessonLeftSide, LessonPosition, LessonRightSide } from "./styles";
import { Lesson, getDifficultyName } from "../../../../api/types/entities/Lesson";
import { PlusIcon } from "../../../../assets/icons/PlusIcon";
import { Colors } from "../../../../constants/Colors";
import { useModal } from "../../../../hooks/useModal";
import { ModalName } from "../../../../store/slices/modalSlice";
import { CreateLessonModalProps } from "../../../../features/Modal/modals/CreateLessonModal/CreateLessonModal";
import Button from "../../../../components/Button";
import { useStartLessonMutation } from "../../../../store/services/lessons";
import { useToasts } from "../../../../hooks/useToasts";
import { useProfile } from "../../../../hooks/useProfile";
import { RoleName } from "../../../../api/types/entities/Role";
import { EditIcon } from "../../../../assets/icons/EditIcon";
import { useNavigate } from "react-router-dom";

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
  const [expanded, setExpanded] = useState<boolean>(false)
  const isAdmin = profile.hasRole(RoleName.ADMIN)

  const handleLessonStart = async () => {
    let isError = false
    await startLesson(lesson.id).unwrap()
      .catch(err => {
        toasts.error(err?.data?.message)
        isError = true
      })

    if (isError) return

    navigate(`/lessons/${lesson.id}`)
  }

  if (isAddButton) return <AddLessonButton
    onClick={() =>
      modal.open<CreateLessonModalProps>({
        name: ModalName.createLesson,
      })
    }
  >
      <AddLessonTitle>Добавить задание</AddLessonTitle>
      <PlusIcon fill={Colors.blue} />
  </AddLessonButton>

  return <LessonBlockOuter expanded={expanded}>
    <LessonBlockWrapper disabled={disabled}>
      <LessonLeftSide>
        <LessonPosition>Занятие {lesson.position}:</LessonPosition>
        {lesson.name}
      </LessonLeftSide>
      <LessonRightSide>
        <Button disabled={disabled} onClick={() => setExpanded(p => !p)} whiteTheme>Информация</Button>
        <Button disabled={disabled} resizable onClick={handleLessonStart} >{lesson.completed ? "Перепройти" : "Начать"}</Button>
        {isAdmin && <Button whiteTheme onClick={() => navigate(`/lessons/${lesson.id}/edit`)}><EditIcon w="24px"/></Button>}
      </LessonRightSide>
    </LessonBlockWrapper>
    <AdditionalInfo>
      <AdditionalText>Сложность: {getDifficultyName(lesson.difficulty)}</AdditionalText>
      <AdditionalText>Опыт: {lesson.expirience}</AdditionalText>
      <AdditionalText>Статус: {lesson.completed ? "Пройдено" : "Не пройдено"}</AdditionalText>
    </AdditionalInfo>
  </LessonBlockOuter> 
};
