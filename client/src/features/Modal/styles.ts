import { styled } from "styled-components";
import { Colors } from "../../constants/Colors";

export const ModalOverlay = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-color: #00000033;
  z-index: 150;
`

export const ModalContent = styled.div`
  z-index: 200;
  width: 30%;
  background-color: ${Colors.white};
  border-radius: 15px;
`

export const ModalContentInner = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 24px;
`

export const ModalHeader = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`

export const ModalTitle = styled.div`
  font-size: 22px;
  line-height: 24px;
`

export const ModalClose = styled.div`
  cursor: pointer;
  position: absolute;
  right: 0;
  top: 0;
`