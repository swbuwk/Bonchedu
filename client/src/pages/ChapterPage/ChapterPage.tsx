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
import { RoleName } from "../../api/types/entities/Role";

export const ChapterPage = () => {
  const profile = useProfile();
  const isAdmin = profile.hasRole(RoleName.ADMIN);
  const { id: chapterId } = useParams<{ id: string }>();
  const { data: chapter } = useGetChapterByIdQuery(chapterId ? chapterId : "");
  const { data: lessons } = useGetChapterLessonsQuery(
    chapterId ? chapterId : ""
  );

  return (
    <ChapterPageWrapper>
      <ContentBlock>
        <ChaptreInfoWrapper>
          <ChapterTextWrapper>
            <ChapterNumberBig>
              {beautifyPos(chapter?.position)}
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
            [...lessons, ...(isAdmin ? [{} as Lesson] : [])]?.map(
              (lesson, idx) => (
                <LessonPreviewBlock
                  lesson={lesson}
                  disabled={idx > Number(chapter?.progress)}
                  isAddButton={idx === lessons.length && isAdmin}
                />
              )
            )}
        </LessonsList>
      </ContentBlock>
    </ChapterPageWrapper>
  );
};
