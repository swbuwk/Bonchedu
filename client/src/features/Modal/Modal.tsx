import ContentBlock from "../../components/ContentBlock";
import { useModal } from "../../hooks/useModal";
import { ModalName } from "../../store/slices/modalSlice";
import { CreateCourseModal } from "./modals/CreateCourseModal/CreateCourseModal";
import {
  ModalClose,
  ModalContent,
  ModalContentInner,
  ModalHeader,
  ModalOverlay,
  ModalTitle,
} from "./styles";
import { CrossIcon } from "../../assets/icons/CrossIcon";
import { ConfirmModal } from "./modals/ConfirmModal/ConfirmModal";
import { CreateChapterModal } from "./modals/CreateChapterModal/CreateChapterModal";
import { CreateLessonModal } from "./modals/CreateLessonModal/CreateLessonModal";
import { UpdateAvatarModal } from "./modals/UpdateAvatarModal.tsx/UpdateAvatarModal";

interface ModalConfig {
  title: string;
  node: any;
}

const MODALS: Record<ModalName, ModalConfig> = {
  [ModalName.none]: { title: "", node: <></> },
  [ModalName.createCourse]: { title: "Создать курс", node: CreateCourseModal },
  [ModalName.updateCourse]: { title: "Редактировать курс", node: CreateCourseModal },
  [ModalName.createChapter]: {
    title: "Создать главу",
    node: CreateChapterModal,
  },
  [ModalName.createLesson]: { title: "Создать занятие", node: CreateLessonModal },
  [ModalName.confirm]: { title: "Подтвердите действие", node: ConfirmModal },
  [ModalName.updateAvatar]: { title: "Обновить фото профиля", node: UpdateAvatarModal }
};

export const Modal = () => {
  const modal = useModal();

  if (!modal.opened) return <></>;

  const Element = MODALS[modal.name].node;

  return (
    <>
      <ModalOverlay onClick={modal.close} />
      <ModalContent>
        <ContentBlock>
          <ModalContentInner>
            <ModalHeader>
              <ModalTitle>{MODALS[modal.name].title}</ModalTitle>
              <ModalClose onClick={modal.close}>
                <CrossIcon />
              </ModalClose>
            </ModalHeader>
            <Element {...modal.info} />
          </ModalContentInner>
        </ContentBlock>
      </ModalContent>
    </>
  );
};
