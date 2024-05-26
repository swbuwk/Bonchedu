import { styled } from "styled-components";
import { Colors } from "../../../../constants/Colors";
import { IconWrapper } from "../../../../assets/icons/IconProps";

export const MaterialsTextBlockWrapper = styled.div`
  position: relative;
  display: flex;
  width: 90%;
  min-height: 200px;
  resize: none;
  border-radius: 15px;
  background-color: #fff;
  padding: 16px;

  ${IconWrapper} {
    position: absolute;
    top: 16px;
    right: 16px;
    cursor: pointer;
  }
`

export const MaterialsTextBlock = styled.textarea`
  background: transparent;
  border: none;
  outline: none !important;
  font-size: 16px;
  width: 95%;
`

export const MaterialsImageWrapper = styled.div`
  position: relative;
  display: flex;
  width: 90%;
  border-radius: 15px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;

  }

  ${IconWrapper} {
    position: absolute;
    top: 16px;
    right: 16px;
    cursor: pointer;
  }
`

export const NoMaterialsWrapper = styled.div`
  font-size: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`

export const AddMaterialSection = styled.div`
  display: flex;
  width: 100%;
  height: 200px;
  gap: 24px;
`

export const AddSectionButton = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  background-color: transparent;
  border-radius: 15px;
  box-sizing: border-box;
  border: 2px dashed ${Colors.blue};

  font-size: 28px;
  color: ${Colors.blue};

  input {
    position: absolute;
    cursor: pointer;
    opacity: 0;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
`