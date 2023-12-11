import { useNavigate, useParams } from "react-router-dom"
import { BackButton, EditPageTitle, LessonEditPageWrapper, QuestionDivider } from "./styles"
import { useGetLessonByIdQuery } from "../../store/services/lessons"
import LessonEditable from "./components/LessonEditable"
import { useGetLessonTasksQuery } from "../../store/services/task"
import TaskBlock from "./components/TaskBlock"
import { useProfile } from "../../hooks/useProfile"
import { RoleName } from "../../api/types/entities/Role"
import { Task } from "../../api/types/entities/Task"
import { useEffect } from "react"

export const LessonEditPage = () => {
  const navigate = useNavigate()
  const profile = useProfile()
  const { id: lessonId } = useParams<{ id: string }>()
  const { data: lesson } = useGetLessonByIdQuery(lessonId ? lessonId : "")
  const { data: tasks } = useGetLessonTasksQuery(lessonId ? lessonId : "")
  const isOwner = profile.hasRole(RoleName.ADMIN) || (profile.hasRole(RoleName.TEACHER) && profile.user.id === lesson?.authorId);

  useEffect(() => {
    if (!lesson?.authorId) return
    if (!isOwner) navigate(`/chapters/${lesson.chapterId}`)
  }, [isOwner, lesson])

  return (
    <LessonEditPageWrapper>
      <BackButton onClick={() => navigate(-1)}>Назад</BackButton>
      <EditPageTitle>Редактирование занятия</EditPageTitle>
      {lesson && <LessonEditable lesson={lesson}/>}
      <QuestionDivider/>
      {tasks && [...tasks, ...(isOwner ? [{} as Task] : [])].map((task, idx) => (
        <TaskBlock isAddButton={isOwner && idx === tasks.length} task={task} />
      ))}
    </LessonEditPageWrapper>
  )
}
