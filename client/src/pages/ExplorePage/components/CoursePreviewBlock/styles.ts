import { styled } from "styled-components";
import { Colors } from "../../../../constants/Colors";


export const CourseOptions = styled.div`
  position: absolute;
  top: 20px;
  right: 23px;
  width: 28px;
  height: 28px;
  opacity: 0;
  transition: opacity 0.2s;
`

export const CoursePreviewWrapper = styled.div<{
  z?: number
}>`
  position: relative;
  cursor: pointer;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  padding: 16px;
  border-radius: 15px;
  gap: 28px;
  transition: 0.2s;
  z-index: ${p => p.z};

  &:hover {
    background-color: #CFD3E0;
  }

  &:hover ${CourseOptions} {
    opacity: 1;
  }
`

export const CourseImage = styled.div`
  border-radius: 15px;
  border: 1px solid #ADADAD;
  height: 180px;
  background-color: ${Colors.white};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 15px;
    text-indent: -10000px;
  }
`

export const CourseTitle = styled.div`
  font-size: 15px;
  line-height: normal;
  min-height: 48px;
`

export const AddCourseButton = styled.div`
  width: 100%;
  height: 100%;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  background-color: #fff;
  border-radius: 15px;
  box-sizing: border-box;
  border: 2px dashed ${Colors.blue};
`

export const AddCourseTitle = styled.div`
  text-align: center;
  font-size: 20px;
  line-height: 22px;
  color: ${Colors.blue};
`

export const CourseDeleteButton = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: ${Colors.red};
`

export const CourseUpdateButton = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: 8px;
`