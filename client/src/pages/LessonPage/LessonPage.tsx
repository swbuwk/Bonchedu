import { useNavigate, useParams } from "react-router-dom";
import { useGetLessonTasksQuery } from "../../store/services/task";
import { LessonButtons, LessonPageWrapper } from "./styles";
import { useState } from "react";
import LessonTask from "./components/LessonTask";
import Button from "../../components/Button";
import {
  useCompleteLessonMutation,
  useGetLessonByIdQuery,
  useLazyGetChapterLessonsQuery,
} from "../../store/services/lessons";
import LessonCompleted from "./components/LessonCompleted";
import { useProfile } from "../../hooks/useProfile";
import { BackButton } from "../LessonEditPage/styles";
import { useLazyGetChapterByIdQuery } from "../../store/services/chapter";

export const LessonPage = () => {
  const { id: lessonId } = useParams<{ id: string }>();
  const profile = useProfile();
  const navigate = useNavigate();
  const { data: lesson } = useGetLessonByIdQuery(lessonId ? lessonId : "");
  const { data: tasks, isLoading } = useGetLessonTasksQuery(
    lessonId ? lessonId : ""
  );
  const [getChapterLessons, {isLoading: isGetLessonsLoading}] = useLazyGetChapterLessonsQuery();
  const [completeLesson, {isLoading: isCompleteLessonLoading}] = useCompleteLessonMutation();
  const [getChapterById, {isLoading: isGetChapterLoading}] = useLazyGetChapterByIdQuery();
  const [progress, setProgress] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [completedPage, setCompletedPage] = useState<boolean>(false);
  const [completed, setCompleted] = useState<boolean>(false);
  const [precision, setPrecision] = useState<number>(0);

  const handleGoBack = () => {
    if (progress === 0) return;
    setProgress((p) => p - 1);
  };

  const calculatePrecision = () => {
    if (!tasks) return;

    let rightAnswers = 0;
    tasks?.forEach((task) => {
      if (task.rightAnswerId === answers[task.id]) {
        rightAnswers++;
      }
    });
    setPrecision(rightAnswers / tasks?.length);
  };

  const handleGoForward = async () => {
    if (progress + 1 === tasks?.length) {
      if (!lessonId || !lesson?.chapterId) return;
      setCompleted(true)
      await completeLesson(lessonId);
      await getChapterLessons(lesson?.chapterId);
      await getChapterById(lesson?.chapterId);
      setCompletedPage(true);
      calculatePrecision();
      profile.getProfileInfo();
    }
    setProgress((p) => p + 1);
  };

  const handleSetAnswer = (taskId: string, answerId: string) => {
    setAnswers({
      ...answers,
      [taskId]: answerId,
    });
  };

  const isButtonLoading = isCompleteLessonLoading || isGetChapterLoading || isGetLessonsLoading

  if (!isLoading && !tasks?.length) return <></>;

  if (completedPage && lesson)
    return (
      <LessonCompleted precision={precision} chapterId={lesson.chapterId} />
    );

  return (
    <LessonPageWrapper>
      <BackButton onClick={() => navigate(-1)}>Выйти</BackButton>
      {tasks && tasks.length && (
        <LessonTask
          task={tasks[progress]}
          answerId={answers[tasks[progress]?.id]}
          onAnswer={handleSetAnswer}
          progress={(progress + +completed) / tasks.length}
        />
      )}
      <LessonButtons>
        {progress > 0 ? (
          <Button whiteTheme onClick={handleGoBack}>
            Назад
          </Button>
        ) : (
          <div />
        )}
        <Button
          isLoading={isButtonLoading}
          onClick={handleGoForward}
          disabled={!(tasks && !!answers[tasks[progress]?.id])}
        >
          {progress + 1 === tasks?.length ? "Завершить" : "Следующий вопрос"}
        </Button>
      </LessonButtons>
    </LessonPageWrapper>
  );
};
