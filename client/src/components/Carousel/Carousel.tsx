import { FC, useMemo } from "react";
import {
  CAROUSEL_COLUMN_GAP,
  CarouselBatch,
  CarouselInner,
  CarouselItemWrapper,
  CarouselWrapper,
} from "./styles";
import CoursePreviewBlock from "../../pages/ExplorePage/components/CoursePreviewBlock";
import { EntityType } from "../../api/types/EntityType";
import { Chapter } from "../../api/types/entities/Chapter";
import { Course } from "../../api/types/entities/Course";
import { useWindowResize } from "../../hooks/useWindowResize";
import ChapterPreviewBlock from "../../pages/CoursePage/components/ChapterPreviewBlock";

interface CourseCarouselProps {
  type: EntityType.course;
  items: Course[];
  onItemHover?: (item: Course) => void;
}

interface ChapterCarouselProps {
  type: EntityType.chapter;
  items: Chapter[];
  onItemHover?: (item: Chapter) => void;
}

interface CarouselProps {
  itemProps: CourseCarouselProps | ChapterCarouselProps;
  page: number;
  columns?: number;
  rows?: number;
  allowedToAdd?: boolean
}

export const Carousel: FC<CarouselProps> = ({
  itemProps,
  page,
  columns = 1,
  rows = 1,
  allowedToAdd = false
}) => {
  const { type: itemType, items, onItemHover } = itemProps;
  const [width] = useWindowResize();

  const carouselW = useMemo(() => {
    return width * 0.925 - 370;
  }, [width]);

  const columnW = useMemo(() => {
    if (!carouselW) return 0;
    return (carouselW - (columns - 1) * CAROUSEL_COLUMN_GAP - 96) / columns;
  }, [carouselW, columns]);

  const carouselBathces: (typeof items)[] = useMemo(() => {
    const batches: (typeof items)[] = [];
    const batchSize = columns * rows;
    for (let i = 0; i < Math.ceil(items.length / batchSize); i++) {
      batches.push(items.slice(i * batchSize, (i + 1) * batchSize));
    }
    return batches;
  }, [items, columns, rows]);

  return (
    <CarouselWrapper>
      <CarouselInner page={page} scrollWidth={carouselW ?? 0}>
        {carouselBathces?.map((batch, idx) => (
          <CarouselBatch columns={columns} rows={rows}>
            {itemType === EntityType.course
              ? batch.map((course, idx2) => (
                  <CarouselItemWrapper w={columnW} key={course.id}>
                    <CoursePreviewBlock
                      z={items.length - (idx * columns * rows + idx2) + 1}
                      course={course as Course}
                      onHover={
                        onItemHover
                          ? () => onItemHover(course as Course)
                          : () => {}
                      }
                      isAddButton={
                        idx * columns * rows + idx2 === items.length - 1 && allowedToAdd
                      }
                    />
                  </CarouselItemWrapper>
                ))
              : batch.map((chapter, idx2) => (
                  <CarouselItemWrapper w={columnW} key={chapter.id}>
                    <ChapterPreviewBlock
                      chapter={chapter as Chapter}
                      isAddButton={
                        idx * columns * rows + idx2 === items.length - 1 && allowedToAdd
                      }
                    />
                  </CarouselItemWrapper>
                ))}
          </CarouselBatch>
        ))}
      </CarouselInner>
    </CarouselWrapper>
  );
};
