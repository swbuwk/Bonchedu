import { FC } from "react";
import { Chapter } from "../../../../api/types/entities/Chapter";
import {
  AddChapterButton,
  AddChapterTitle,
  ChapterCube,
  ChapterIndex,
  ChapterInfo,
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

interface ChapterPreviewBlockProps {
  chapter: Chapter;
  isAddButton?: boolean;
}

export const ChapterPreviewBlock: FC<ChapterPreviewBlockProps> = ({
  chapter,
  isAddButton,
}) => {
  const modal = useModal();
  const navigate = useNavigate();

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
    <ChapterPreviewWrapper onClick={() => navigate(`/chapters/${chapter.id}`)}>
      <ChapterCube />
      <ChapterInfo>
        <ChapterText>
          <ChapterIndex>{beautifyPos(chapter.position)}</ChapterIndex>
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
