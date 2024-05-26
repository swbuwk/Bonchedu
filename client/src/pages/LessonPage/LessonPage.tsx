import { useNavigate, useParams } from "react-router-dom";
import { LessonButtons, LessonPageWrapper } from "./styles";
import { useState } from "react";
import Button from "../../components/Button";
import LessonCompleted from "./components/LessonCompleted";
import { useProfile } from "../../hooks/useProfile";
import { BackButton } from "../LessonEditPage/styles";
import LessonQuestion from "./components/LessonQuestion";
import { useGetLessonByIdQuery, useGetLessonQuestionsQuery, useCompleteLessonMutation, useSubmitAnswerMutation, useGetMaterialsQuery } from "../../store/api";
import { LessonResultsResponse } from "../../api/types/LessonApiTypes";
import { MaterialLearnPage } from "./components/MaterialLearnPage/MaterialLearnPage";

export const LessonPage = () => {
  const { id: lessonId } = useParams<{ id: string }>();
  const profile = useProfile();
  const navigate = useNavigate();
  const { data: lesson } = useGetLessonByIdQuery(lessonId ? lessonId : "");
  const { data: questions, isLoading } = useGetLessonQuestionsQuery(
    lessonId ? lessonId : ""
  );
  const { data: materials } = useGetMaterialsQuery(lessonId || "")
  const [completeLesson, { isLoading: isGetResultsLoading }] = useCompleteLessonMutation();
  const [submitAnswer, { isLoading: isSubmitAnswerLoading }] = useSubmitAnswerMutation()

  const [progress, setProgress] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [completedPage, setCompletedPage] = useState<boolean>(false);
  const [completed, setCompleted] = useState<boolean>(false);
  const [results, setResults] = useState<LessonResultsResponse | undefined>();
  const [isLearning, setIsLearning] = useState<boolean>(true)

  const handleGoBack = () => {
    if (progress === 0) return;
    setProgress((p) => p - 1);
  };

  const calculatePrecision = () => {
    if (!questions) return;

    let rightAnswers = 0;
    questions?.forEach((question) => {
      if (question.correctAnswer === answers[question.id]) {
        rightAnswers++;
      }
    });
  };

  const handleGoForward = async () => {
    const questionId = Object.keys(answers)[progress]
    await submitAnswer({ questionId, answer: answers[questionId] })

    if (progress + 1 === questions?.length) {
      if (!lessonId || !lesson?.chapterId) return;
      setCompleted(true)
      // @ts-ignore
      await completeLesson(lessonId).then(res => setResults(res.data));
      setCompletedPage(true);
      calculatePrecision();
      profile.getProfileInfo();
    }
    setProgress((p) => p + 1);
  };

  const handleSetAnswer = async (questionId: string, answer: string) => {
    setAnswers({
      ...answers,
      [questionId]: answer,
    });
  };

  const isButtonLoading = isGetResultsLoading || isSubmitAnswerLoading

  if (!isLoading && !questions?.length) return <></>;

  console.log(isLearning)

  if (isLearning && materials) return (
    <MaterialLearnPage materials={materials} setIsLearning={setIsLearning}/>
  )

  if (completedPage && lesson)
    return (
      <LessonCompleted results={results} chapterId={lesson.chapterId} />
    );

  return (
    <LessonPageWrapper>
      <BackButton onClick={() => navigate(-1)}>Выйти</BackButton>
      {questions && questions.length && (
        <LessonQuestion
          question={questions[progress]}
          answerText={answers[questions[progress]?.id]}
          onAnswer={handleSetAnswer}
          progress={(progress + +completed) / questions.length}
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
          disabled={!(questions && !!answers[questions[progress]?.id])}
        >
          {progress + 1 === questions?.length ? "Завершить" : "Следующий вопрос"}
        </Button>
      </LessonButtons>
    </LessonPageWrapper>
  );
};
