import { useEffect, useMemo, useState } from "react";
import { ArrowLeft } from "../../assets/icons/ArrowLeft";
import { ArrowRight } from "../../assets/icons/ArrowRight";
import ContentBlock from "../../components/ContentBlock";
import {
  ArrowsWrapper,
  CourseImagePreview,
  CourseList,
  CourseListControls,
  CourseListTitle,
  CourseListWrapper,
  ExplorePageWrapper,
} from "./styles";
import { Endpoints } from "../../api";
import { Colors } from "../../constants/Colors";
import Carousel from "../../components/Carousel";
import { EntityType } from "../../api/types/EntityType";
import { Course } from "../../api/types/entities/Course";
import { useProfile } from "../../hooks/useProfile";
import { Role } from "../../api/types/entities/Role";
import { useGetCoursesQuery } from "../../store/api";

export const ExplorePage = () => {
  const { data: courses } = useGetCoursesQuery(undefined);
  const profile = useProfile();
  const isAdminOrTeacher = profile.hasRole(Role.admin) || profile.hasRole(Role.teacher);
  const [topImage, setTopImage] = useState<string>("");
  const [page, setPage] = useState(0);
  const [courseColumns] = useState<number>(4);
  const maxPages = useMemo(() => {
    if (!courses?.length) return 1;
    return Math.ceil((courses.length + (isAdminOrTeacher ? 1 : 0)) / courseColumns);
  }, [courses?.length, isAdminOrTeacher]);

  useEffect(() => {
    setPage(0);
  }, [courseColumns]);

  return (
    <ExplorePageWrapper>
      <ContentBlock w="100%" h="35.6%" padding="0">
        <CourseImagePreview>
          {topImage && <img src={Endpoints.files + topImage} />}
        </CourseImagePreview>
      </ContentBlock>
      <ContentBlock w="100%" h="60%" padding="36px 0">
        <CourseListWrapper>
          <CourseListTitle>Курсы</CourseListTitle>
          <CourseList>
            <CourseListControls>
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
            {courses && (
              <Carousel
                page={page}
                rows={1}
                columns={courseColumns}
                allowedToAdd={isAdminOrTeacher}
                itemProps={{
                  type: EntityType.course,
                  items: [...courses, ...(isAdminOrTeacher ? [{} as Course] : [])],
                  onItemHover(item) {
                    setTopImage(item.coverImage);
                  },
                }}
              />
            )}
          </CourseList>
        </CourseListWrapper>
      </ContentBlock>
    </ExplorePageWrapper>
  );
};
