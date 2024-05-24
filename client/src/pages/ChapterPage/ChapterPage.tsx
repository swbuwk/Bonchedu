import { useParams } from "react-router-dom";
import {
  ChapterNumberBig,
  ChapterPageWrapper,
  ChapterTextWrapper,
  ChapterTitle,
  ChaptreInfoWrapper,
  LessonsList,
} from "./styles";
import ContentBlock from "../../components/ContentBlock";
import ProgressBar from "../../components/ProgressBar";
import { useGetChapterByIdQuery } from "../../store/services/chapter";
import { beautifyPos } from "../../utils/beutifyPosition";
import { useGetChapterLessonsQuery } from "../../store/services/lessons";
import LessonPreviewBlock from "./components/LessonPreviewBlock";
import { Lesson } from "../../api/types/entities/Lesson";
import { useProfile } from "../../hooks/useProfile";
import { Role } from "../../api/types/entities/Role";

export const ChapterPage = () => {
  const profile = useProfile();
  const { id: chapterId } = useParams<{ id: string }>();
  const { data: chapter } = useGetChapterByIdQuery(chapterId ? chapterId : "");
  const isOwner = profile.hasRole(Role.admin) || (profile.hasRole(Role.teacher) && profile.user.id === chapter?.authorId);
  const { data: lessons } = useGetChapterLessonsQuery(
    chapterId ? chapterId : ""
  );

  return (
    <ChapterPageWrapper>
      <ContentBlock>
        <ChaptreInfoWrapper>
          <ChapterTextWrapper>
            <ChapterNumberBig>
              {beautifyPos(chapter?.number)}
            </ChapterNumberBig>
            <ChapterTitle>{chapter?.name}</ChapterTitle>
          </ChapterTextWrapper>
          <ProgressBar
            progress={Number(chapter?.progress)}
            full={Number(chapter?.lessonsCount)}
          />
        </ChaptreInfoWrapper>
      </ContentBlock>
      <ContentBlock h="100%">
        <LessonsList>
          {lessons &&
            [...lessons, ...(isOwner ? [{} as Lesson] : [])]?.map(
              (lesson, idx) => (
                <LessonPreviewBlock
                  lesson={lesson}
                  disabled={idx > Number(chapter?.progress)}
                  isAddButton={idx === lessons.length && isOwner}
                />
              )
            )}
        </LessonsList>
      </ContentBlock>
    </ChapterPageWrapper>
  );
};
