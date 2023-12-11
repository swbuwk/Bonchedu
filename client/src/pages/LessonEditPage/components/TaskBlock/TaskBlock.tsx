import { FC, useEffect, useState } from "react";
import { Answer, Task } from "../../../../api/types/entities/Task";
import {
  AddTaskButton,
  AddTaskTitle,
  TaskBlockInner,
  TaskBlockWrapper,
  TaskControls,
} from "./styles";
import { PlusIcon } from "../../../../assets/icons/PlusIcon";
import { Colors } from "../../../../constants/Colors";
import {
  useAddTaskMutation,
  useDeleteTaskMutation,
  useLazyGetLessonTasksQuery,
  useUpdateTaskMutation,
} from "../../../../store/services/task";
import { useParams } from "react-router-dom";
import { QuestionDivider } from "../../styles";
import { Input } from "../../../../components/Input/Input";
import { useProfile } from "../../../../hooks/useProfile";
import { RoleName } from "../../../../api/types/entities/Role";
import AnswerEditable from "../AnswerEditable";
import { CrossIcon } from "../../../../assets/icons/CrossIcon";
import { useDebouncedEffect } from "../../../../hooks/useDebouncedEffect";

interface TaskBlockProps {
  task: Task;
  isAddButton?: boolean;
}

export const TaskBlock: FC<TaskBlockProps> = ({ task, isAddButton }) => {
  const { id: lessonId } = useParams<{ id: string }>();
  const profile = useProfile();
  const isOwner = profile.hasRole(RoleName.ADMIN) || (profile.hasRole(RoleName.TEACHER) && profile.user.id === task?.authorId);
  const [addTask] = useAddTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const [updateTask] = useUpdateTaskMutation();
  const [getLessonTasks] = useLazyGetLessonTasksQuery();
  const [taskQuestion, setTaskQuestion] = useState<string>("");

  const handleAddTask = async () => {
    if (!lessonId) return;
    await addTask({
      lessonId,
      question: "",
    });
    getLessonTasks(lessonId);
  };

  const handleDeleteTask = async () => {
    if (!task.id || !lessonId) return;
    await deleteTask(task.id);
    getLessonTasks(lessonId);
  };

  useEffect(() => {
    setTaskQuestion(task.question);
  }, [task.question]);

  const handleUpdateTask = async () => {
    if (!task.id || !lessonId) return;
    if (taskQuestion === task.question) return;
    await updateTask({
      id: task.id,
      question: taskQuestion,
    });
    getLessonTasks(lessonId);
  };

  useDebouncedEffect(
    () => {
      handleUpdateTask();
    },
    [taskQuestion, task.id],
    700
  );

  if (isAddButton)
    return (
      <AddTaskButton onClick={handleAddTask}>
        <AddTaskTitle>Добавить вопрос</AddTaskTitle>
        <PlusIcon fill={Colors.blue} />
      </AddTaskButton>
    );

  return (
    <TaskBlockWrapper>
      <TaskControls>
        <CrossIcon onClick={handleDeleteTask} fill={Colors.red} />
      </TaskControls>
      <TaskBlockInner>
        <Input
          value={taskQuestion}
          onChange={(e) => setTaskQuestion(e.target.value)}
          placeholder="Введите текст вопроса"
          fs="22px"
          boxShadow
        />
        <QuestionDivider />
        {task.answers &&
          [...task.answers, ...(isOwner ? [{} as Answer] : [])].map(
            (answer, idx) => (
              <AnswerEditable
                key={answer.id}
                taskId={task.id}
                lessonId={task.lessonId}
                answer={answer}
                isRightAnswer={answer.id === task.rightAnswerId}
                isAddButton={isOwner && idx === task.answers.length}
              />
            )
          )}
      </TaskBlockInner>
      <QuestionDivider />
    </TaskBlockWrapper>
  );
};
