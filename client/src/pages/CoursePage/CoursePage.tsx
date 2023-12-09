import { useParams } from "react-router-dom";
import { Endpoints } from "../../api";
import ContentBlock from "../../components/ContentBlock";
import { useGetCourseByIdQuery } from "../../store/services/course";
import { CourseImagePreview, CourseListControls } from "../ExplorePage/styles";
import {
  ChapterList,
  CourseContentWrapper,
  CourseDescription,
  CoursePageWrapper,
  CourseText,
  CourseTitle,
} from "./styles";
import { useMemo, useState } from "react";
import { Colors } from "../../constants/Colors";
import { ArrowLeft } from "../../assets/icons/ArrowLeft";
import { ArrowRight } from "../../assets/icons/ArrowRight";
import Carousel from "../../components/Carousel";
import { Chapter } from "../../api/types/entities/Chapter";
import { EntityType } from "../../api/types/EntityType";
import { useProfile } from "../../hooks/useProfile";
import { RoleName } from "../../api/types/entities/Role";
import { useGetCourseChaptersQuery } from "../../store/services/chapter";

export const CoursePage = () => {
  const { id: courseId } = useParams<{ id: string }>();
  const profile = useProfile();
  const isAdmin = profile.hasRole(RoleName.ADMIN);
  const { data: course } = useGetCourseByIdQuery(courseId ?? "");
  const { data: chapters } = useGetCourseChaptersQuery(courseId ?? "");
  
  const [page, setPage] = useState(0);

  const maxPages = useMemo(() => {
    if (!chapters?.length) return 1;
    return Math.ceil((chapters.length + (isAdmin ? 1 : 0)) / 4);
  }, [chapters?.length, isAdmin]);

  return (
    <CoursePageWrapper>
      <ContentBlock w="100%" h="35.6%" padding="0">
        <CourseImagePreview>
          {course?.coverImage && (
            <img src={Endpoints.files + course.coverImage} />
          )}
        </CourseImagePreview>
      </ContentBlock>
      <ContentBlock w="100%" h="60%" padding="36px 0">
        <CourseContentWrapper>
          <CourseText>
            <CourseTitle>{course?.name}</CourseTitle>
            <CourseDescription>{course?.description}</CourseDescription>
          </CourseText>
          <ChapterList>
            <CourseListControls>
              <ArrowLeft
                fill={page > 0 ? Colors.blue : Colors.gray}
                pointer={page > 0}
                w="48px"
                h="48px"
                onClick={() => setPage((p) => (p !== 0 ? p - 1 : p))}
              />
              <ArrowRight
                fill={page < maxPages - 1 ? Colors.blue : Colors.gray}
                pointer={page < maxPages - 1}
                w="48px"
                h="48px"
                onClick={() => setPage((p) => (p !== maxPages - 1 ? p + 1 : p))}
              />
            </CourseListControls>
            {chapters && (
              <Carousel
                page={page}
                rows={2}
                columns={2}
                itemProps={{
                  type: EntityType.chapter,
                  items: [...chapters, ...(isAdmin ? [{} as Chapter] : [])],
                }}
              />
            )}
          </ChapterList>
        </CourseContentWrapper>
      </ContentBlock>
    </CoursePageWrapper>
  );
};
