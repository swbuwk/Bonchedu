import { useParams } from "react-router-dom";
import { Endpoints } from "../../api";
import ContentBlock from "../../components/ContentBlock";
import { ArrowsWrapper, CourseImagePreview, CourseListControls } from "../ExplorePage/styles";
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
import { Role } from "../../api/types/entities/Role";
import Button from "../../components/Button";
import ProgressBar from "../../components/ProgressBar";
import { useToasts } from "../../hooks/useToasts";
import { useGetCourseByIdQuery, useGetCourseChaptersQuery, useStartCourseMutation } from "../../store/api";

export const CoursePage = () => {
  const { id: courseId } = useParams<{ id: string }>();
  const toasts = useToasts()
  const profile = useProfile();
  const { data: course } = useGetCourseByIdQuery(courseId ?? "");
  const { data: chapters } = useGetCourseChaptersQuery(courseId ?? "");
  const [startCourse] = useStartCourseMutation()
  const isOwner = profile.hasRole(Role.admin) || (profile.hasRole(Role.teacher) && profile.user.id === course?.authorId);

  const handleStartCourse = async () => {
    await startCourse(courseId || "")
    toasts.success(`Вы начали курс "${course?.name}"!`)
  }
  
  const [page, setPage] = useState(0);

  const maxPages = useMemo(() => {
    if (!chapters?.length) return 1;
    return Math.ceil((chapters.length + (isOwner ? 1 : 0)) / 4);
  }, [chapters?.length, isOwner]);

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
            <CourseListControls courseStarted={course?.started}>
              {course?.started ?
                <ProgressBar progress={course.progress || 0} full={course.chaptersCount}/> : 
                <Button width={250} onClick={handleStartCourse}>Начать курс</Button>
              }
              <ArrowsWrapper>
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
              </ArrowsWrapper>
            </CourseListControls>
            {chapters && (
              <Carousel
                page={page}
                rows={2}
                columns={2}
                allowedToAdd={isOwner}
                itemProps={{
                  type: EntityType.chapter,
                  items: [...chapters, ...(isOwner ? [{} as Chapter] : [])],
                }}
              />
            )}
          </ChapterList>
        </CourseContentWrapper>
      </ContentBlock>
    </CoursePageWrapper>
  );
};
