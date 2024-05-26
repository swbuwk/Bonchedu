import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import { BackButton, EditPageTitle, LessonEditPageWrapper, LessonEditTab, LessonEditTabSwitcher, QuestionDivider } from "./styles"
import LessonEditable from "./components/LessonEditable"
import QuestionBlock from "./components/QuestionBlock"
import { useProfile } from "../../hooks/useProfile"
import { Role } from "../../api/types/entities/Role"
import { Question } from "../../api/types/entities/Question"
import { useEffect } from "react"
import Button from "../../components/Button"
import { useModal } from "../../hooks/useModal"
import { ModalName } from "../../store/slices/modalSlice"
import { useAddMaterialsMutation, useFinalizeLessonMutation, useGetLessonByIdQuery, useGetLessonEditQuestionsQuery, useGetMaterialsQuery } from "../../store/api"
import { MaterialsEditor } from "./components/MaterialsEditor/MaterialsEditor"
import { useToasts } from "../../hooks/useToasts"
import { NoMaterialsWrapper } from "./components/MaterialsEditor/styles"

export enum LessonEditTabs {
  materials="materials",
  test="test"
}

export const LessonEditPage = () => {
  const navigate = useNavigate()
  const modal = useModal()
  const toasts = useToasts()
  const profile = useProfile()
  const [searchTab, setTab] = useSearchParams();
  const { id: lessonId } = useParams<{ id: string }>()
  const { data: lesson } = useGetLessonByIdQuery(lessonId ? lessonId : "")
  const { data: questions } = useGetLessonEditQuestionsQuery(lessonId ? lessonId : "")
  const {data: materials} = useGetMaterialsQuery(lessonId || "")
  const [finalizeLesson, { isLoading: isFinalizeLoading}] = useFinalizeLessonMutation()
  const [addMaterails, { isLoading: isAddMaterialsLoading }] = useAddMaterialsMutation()
  const isOwner = profile.hasRole(Role.admin) || (profile.hasRole(Role.teacher) && profile.user.id === lesson?.authorId);

  const handleLessonPublish = async () => {
    modal.open({
      name: ModalName.confirm,
      title: "После публикации занятия вы не сможете редактировать вопросы и количество получаемого опыта. Вы действительно хотите опубликовать занятие?",
      onConfirm: async () => {
        await finalizeLesson(lessonId || "")
      }
    })
  }

  const handleMaterialsAdd = async () => {
    await addMaterails({ lessonId: lessonId || "", textData: "" })
    toasts.success("Учебные материалы добавлены")
  }

  const changeTab = (tab: LessonEditTabs) => {
    setTab({
      tab
    }, {
      replace: true
    })
  }

  useEffect(() => {
    if (!searchTab.get("tab")) {
      setTab({
        tab: LessonEditTabs.test
      }, {
        replace: true
      })
    }
  }, [])

  useEffect(() => {
    if (!lesson?.authorId) return
    if (!isOwner) navigate(`/chapters/${lesson.chapterId}`)
  }, [isOwner, lesson])

  if (!lesson) return

  return (
    <LessonEditPageWrapper>
      <BackButton onClick={() => navigate(-1)}>Назад</BackButton>
      <EditPageTitle>Редактирование занятия</EditPageTitle>
      {lesson && <LessonEditable lesson={lesson}/>}
      <QuestionDivider/>
      <LessonEditTabSwitcher>
        <LessonEditTab active={searchTab.get("tab") === LessonEditTabs.materials} onClick={() => changeTab(LessonEditTabs.materials)}>Учебные материалы</LessonEditTab>
        <LessonEditTab active={searchTab.get("tab") === LessonEditTabs.test} onClick={() => changeTab(LessonEditTabs.test)}>Тестовое задание</LessonEditTab>
      </LessonEditTabSwitcher>
      {
        searchTab.get("tab") === LessonEditTabs.materials ?
          !materials ?
          <NoMaterialsWrapper>
            Учебных материалов не найдено. 
            <Button isLoading={isAddMaterialsLoading} onClick={handleMaterialsAdd}>Создать</Button>
          </NoMaterialsWrapper> :
          <MaterialsEditor materials={materials} lessonId={lessonId || ""}/> :
        <>
          {questions && [...questions, ...((isOwner && !lesson?.finalized) ? [{} as Question] : [])].map((question, idx) => (
            <QuestionBlock disabled={lesson?.finalized} isAddButton={isOwner && idx === questions.length} question={question} />
          ))}
          <Button isLoading={isFinalizeLoading} disabled={lesson?.finalized} onClick={handleLessonPublish}>{lesson?.finalized ? "Занятие опубликовано" : "Опубликовать занятие"}</Button>
        </>
      }
    </LessonEditPageWrapper>
  )
}
