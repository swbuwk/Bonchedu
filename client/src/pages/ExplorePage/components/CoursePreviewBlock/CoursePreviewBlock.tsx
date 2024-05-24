import { FC } from "react";
import ProgressBar from "../../../../components/ProgressBar";
import {
  AddCourseButton,
  AddCourseTitle,
  CourseDeleteButton,
  CourseImage,
  CourseOptions,
  CoursePreviewWrapper,
  CourseTitle,
} from "./styles";
import { Course } from "../../../../api/types/entities/Course";
import { Endpoints } from "../../../../api";
import { PlusIcon } from "../../../../assets/icons/PlusIcon";
import { Colors } from "../../../../constants/Colors";
import { useModal } from "../../../../hooks/useModal";
import { ModalName } from "../../../../store/slices/modalSlice";
import { CreateCourseModalProps } from "../../../../features/Modal/modals/CreateCourseModal/CreateCourseModal";
import { useNavigate } from "react-router-dom";
import Dropdown from "../../../../components/Dropdown";
import { DropdownOption } from "../../../../components/Dropdown/Dropdown";
import { DropdownTarget } from "../../../../components/Dropdown/DropdownTarget";
import {
  useDeleteCourseMutation,
  useLazyGetCoursesQuery,
} from "../../../../store/services/course";
import { CrossIcon } from "../../../../assets/icons/CrossIcon";
import { ConfirmModalProps } from "../../../../features/Modal/modals/ConfirmModal/ConfirmModal";
import { useToasts } from "../../../../hooks/useToasts";
import { useProfile } from "../../../../hooks/useProfile";
import { Role } from "../../../../api/types/entities/Role";

export interface CoursePreviewBlockProps {
  course: Course;
  onHover: () => void;
  isAddButton?: boolean;
  z?: number;
}

export const CoursePreviewBlock: FC<CoursePreviewBlockProps> = ({
  course,
  onHover,
  isAddButton,
  z,
}) => {
  const modal = useModal();
  const toasts = useToasts();
  const profile = useProfile()
  const isOwner = profile.hasRole(Role.admin) || (profile.hasRole(Role.teacher) && profile.user.id === course?.authorId);
  const navigate = useNavigate();
  const [deleteCourse] = useDeleteCourseMutation();
  const [getCourses] = useLazyGetCoursesQuery();

  const handleCourseDelete = async () => {
    await deleteCourse(course.id)
      .then(() => {
        getCourses(undefined);
        toasts.success("Курс успешно удален");
      })
      .catch(() => {
        toasts.error("Ошибка при удалении курса");
      });
  };

  const openCourseDeleteModal = () => {
    modal.open<ConfirmModalProps>({
      name: ModalName.confirm,
      onConfirm: handleCourseDelete,
      title: "Вы действительно хотите удалить курс?",
    });
  };

  const dropdownOptions: DropdownOption[] = [
    ...(isOwner ? [{
      action: openCourseDeleteModal,
      element: (
        <CourseDeleteButton>
          <CrossIcon fill={Colors.red} h="14px" w="14px" /> Удалить
        </CourseDeleteButton>
      ),
    }] : []),
  ];

  if (isAddButton)
    return (
      <AddCourseButton
        onClick={() =>
          modal.open<CreateCourseModalProps>({
            name: ModalName.createCourse,
          })
        }
      >
        <PlusIcon fill={Colors.blue} />
        <AddCourseTitle>Новый курс</AddCourseTitle>
      </AddCourseButton>
    );
  return (
    <CoursePreviewWrapper
      onMouseLeave={() => document.documentElement.click()}
      z={z}
      onClick={() => navigate(`/courses/${course.id}`)}
      onMouseEnter={onHover}
    >
      {dropdownOptions.length ? <CourseOptions>
        <Dropdown options={dropdownOptions} target={<DropdownTarget />} />
      </CourseOptions> : <></>}
      <CourseImage>
        {course.coverImage && <img src={Endpoints.files + course.coverImage} />}
      </CourseImage>
      <CourseTitle>{course.name}</CourseTitle>
      <ProgressBar
        progress={Number(course.progress)}
        full={course.lessonsCount}
      />
    </CoursePreviewWrapper>
  );
};
