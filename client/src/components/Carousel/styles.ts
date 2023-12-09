import { styled } from "styled-components";

export const CAROUSEL_COLUMN_GAP = 24;
export const CAROUSEL_ROW_GAP = 12;

export const CarouselWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 24px;
  overflow: hidden;
`;

export const CarouselInner = styled.div<{
  page: number;
  scrollWidth: number;
}>`
  display: flex;
  width: fit-content;
  transform: translateX(${(p) => 48 - p.page * (p.scrollWidth - 72)}px);
  transition: 0.5s ease-in-out;
  gap: ${CAROUSEL_COLUMN_GAP}px;
`;

export const CarouselBatch = styled.div<{
  columns: number;
  rows: number;
}>`
  display: grid;
  width: 100%;

  grid-template-columns: repeat(${(p) => p.columns}, 1fr);
  grid-template-rows: repeat(${(p) => p.rows}, 1fr);
  column-gap: ${CAROUSEL_COLUMN_GAP}px;
  row-gap: ${CAROUSEL_ROW_GAP}px;
`;

export const CarouselItemWrapper = styled.div<{
  w: number;
}>`
  width: ${(p) => p.w}px;
`;
