import { FC } from "react";
import { Chapter } from "../../../../api/types/entities/Chapter";
import {
  AddChapterButton,
  AddChapterTitle,
  ChapterCube,
  ChapterIndex,
  ChapterInfo,
  ChapterOverlay,
  ChapterPreviewWrapper,
  ChapterText,
  ChapterTitle,
} from "./styles";
import { PlusIcon } from "../../../../assets/icons/PlusIcon";
import { Colors } from "../../../../constants/Colors";
import { useModal } from "../../../../hooks/useModal";
import { CreateChapterModalProps } from "../../../../features/Modal/modals/CreateChapterModal/CreateChapterModal";
import { ModalName } from "../../../../store/slices/modalSlice";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../../../../components/ProgressBar";
import { beautifyPos } from "../../../../utils/beutifyPosition";
import Dropdown from "../../../../components/Dropdown";
import { CourseDeleteButton } from "../../../ExplorePage/components/CoursePreviewBlock/styles";
import { CrossIcon } from "../../../../assets/icons/CrossIcon";
import { DropdownOption } from "../../../../components/Dropdown/Dropdown";
import { useProfile } from "../../../../hooks/useProfile";
import { Role } from "../../../../api/types/entities/Role";
import { DropdownTarget } from "../../../../components/Dropdown/DropdownTarget";
import { ConfirmModalProps } from "../../../../features/Modal/modals/ConfirmModal/ConfirmModal";
import { useToasts } from "../../../../hooks/useToasts";
import { useDeleteChapterMutation } from "../../../../store/api";

interface ChapterPreviewBlockProps {
  chapter: Chapter;
  isAddButton?: boolean;
  z?: number
}

export const ChapterPreviewBlock: FC<ChapterPreviewBlockProps> = ({
  chapter,
  isAddButton,
  z
}) => {
  const modal = useModal();
  const toasts = useToasts();
  const navigate = useNavigate();
  const profile = useProfile()
  const isOwner = profile.hasRole(Role.admin) || (profile.hasRole(Role.teacher) && profile.user.id === chapter?.authorId);
  const [deleteChapter] = useDeleteChapterMutation()

  const handleChapterDelete = async () => {
    await deleteChapter(chapter.id)
      .then(() => {
        toasts.success("Глава успешно удалена");
      })
      .catch(() => {
        toasts.error("Ошибка при удалении главы");
      });
  }

  const openChapterDeleteModal = () => {
    modal.open<ConfirmModalProps>({
      name: ModalName.confirm,
      onConfirm: handleChapterDelete,
      title: "Вы действительно хотите удалить эту главу?",
    });
  }

  const dropdownOptions: DropdownOption[] = [
    ...(isOwner ? [
      {
        action: openChapterDeleteModal,
        element: (
          <CourseDeleteButton>
            <CrossIcon fill={Colors.red} h="14px" w="14px" /> Удалить
          </CourseDeleteButton>
        ),
      },
    ] : []),
  ];

  if (isAddButton)
    return (
      <AddChapterButton
        onClick={() =>
          modal.open<CreateChapterModalProps>({
            name: ModalName.createChapter,
          })
        }
      >
        <PlusIcon fill={Colors.blue} />
        <AddChapterTitle>Добавить главу</AddChapterTitle>
      </AddChapterButton>
    );

  return (
    <ChapterPreviewWrapper 
      onMouseLeave={() => document.documentElement.click()}
      z={z} 
      onClick={() => navigate(`/chapters/${chapter.id}`)}
    >
      <ChapterOverlay>
        <Dropdown options={dropdownOptions} target={<DropdownTarget />}/>
      </ChapterOverlay>
      <ChapterCube />
      <ChapterInfo>
        <ChapterText>
          <ChapterIndex>{beautifyPos(chapter.number)}</ChapterIndex>
          <ChapterTitle>{chapter.name}</ChapterTitle>
        </ChapterText>
        <ProgressBar
          progress={Number(chapter.progress)}
          full={chapter.lessonsCount}
        />
      </ChapterInfo>
    </ChapterPreviewWrapper>
  );
};
