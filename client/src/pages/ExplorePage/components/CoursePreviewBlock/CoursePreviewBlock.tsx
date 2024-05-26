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
  CourseUpdateButton,
} from "./styles";
import { Course } from "../../../../api/types/entities/Course";
import { Endpoints } from "../../../../api";
import { PlusIcon } from "../../../../assets/icons/PlusIcon";
import { Colors } from "../../../../constants/Colors";
import { useModal } from "../../../../hooks/useModal";
import { ModalName } from "../../../../store/slices/modalSlice";
import { CreateCourseModalProps, UpdateCourseModalProps } from "../../../../features/Modal/modals/CreateCourseModal/CreateCourseModal";
import { useNavigate } from "react-router-dom";
import Dropdown from "../../../../components/Dropdown";
import { DropdownOption } from "../../../../components/Dropdown/Dropdown";
import { DropdownTarget } from "../../../../components/Dropdown/DropdownTarget";
import { CrossIcon } from "../../../../assets/icons/CrossIcon";
import { ConfirmModalProps } from "../../../../features/Modal/modals/ConfirmModal/ConfirmModal";
import { useToasts } from "../../../../hooks/useToasts";
import { useProfile } from "../../../../hooks/useProfile";
import { Role } from "../../../../api/types/entities/Role";
import { EditIcon } from "../../../../assets/icons/EditIcon";
import { useDeleteCourseMutation } from "../../../../store/api";

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

  const handleCourseDelete = async () => {
    await deleteCourse(course.id)
      .then(() => {
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
      title: "Вы действительно хотите удалить этот курс?",
    });
  };

  const openCourseUpdateModal = () => {
    modal.open<UpdateCourseModalProps>({
      name: ModalName.updateCourse,
      course
    })
  }

  const dropdownOptions: DropdownOption[] = [
    ...(isOwner ? [
      {
        action: openCourseDeleteModal,
        element: (
          <CourseDeleteButton>
            <CrossIcon fill={Colors.red} h="14px" w="14px" /> Удалить
          </CourseDeleteButton>
        ),
      },
      {
        action: openCourseUpdateModal,
        element: (
          <CourseUpdateButton>
            <EditIcon h="20px" w="20px" /> Изменить
          </CourseUpdateButton>
        ),
      },
    ] : []),
  ];

  if (isAddButton)
    return (
      <AddCourseButton
        onClick={() =>
          modal.open<CreateCourseModalProps>({
            name: ModalName.createCourse,
            course: undefined
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
        full={course.chaptersCount}
      />
    </CoursePreviewWrapper>
  );
};
