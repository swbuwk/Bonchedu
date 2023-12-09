import { styled } from "styled-components";
import { Colors } from "../../constants/Colors";

export const ImageUploaderWrapper = styled.div`
  position: relative;
  background-color: ${Colors.lightgray};
  border-radius: 15px;
  width: 100%;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 16px;

  img {
      position: absolute;
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 15px;
  }

  input {
      cursor: pointer;
      position: absolute;
      width: 100%;
      height: 100%;
      opacity: 0;
      z-index: 10;
  }
`

export const ImageUploaderTitle = styled.div`
  font-size: 18px;
  line-height: 22px;
`