import { styled } from "styled-components";
import { Colors } from "../../constants/Colors";

export const ExplorePageWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 4.4%;
  width: 100%;
  max-width: 100%;
  height: 100%;
`;

export const CourseImagePreview = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${Colors.lightgray};
  border-radius: 15px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    animation: slide 40s ease-in-out infinite;
    text-indent: -10000px;

    @keyframes slide {
      0% {
        object-position: 50% 20%;
      }
      50% {
        object-position: 50% 80%;
      }
      100% {
        object-position: 50% 20%;
      }
    }
  }
`;

export const CourseListWrapper = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  max-width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
`;

export const CourseListTitle = styled.div`
  padding-left: 48px;
  font-size: 40px;
  font-weight: 400;
  line-height: normal;
`;

export const CourseList = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 100%;
  gap: 12px;
  align-items: flex-end;
`;

export const CourseListControls = styled.div`
  display: flex;
  width: 100%;
  box-sizing: border-box;
  justify-content: space-between;
  padding: 0 48px;
`;

export const ArrowsWrapper = styled.div`
  display: flex;
`
