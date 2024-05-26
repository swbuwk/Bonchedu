import { styled } from "styled-components";

export const MaterialPageWrapper = styled.div`
  position: relative;
  width: 100%;
  min-height: 100%;
  display: flex;
  justify-content: center;
`

export const MaterialSections = styled.div`
  display: flex;
  width: 100%;
  max-width: 60vw;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  margin: 60px 0;
`

export const SectionsTitle = styled.div`
  font-size: 48px;
  width: 100%;
`

export const MaterialTextSection = styled.div`
  width: 100%;
  word-wrap: break-word;
  word-break: break-all;
  font-size: 20px;
`

export const MaterialImageSection = styled.div`
  width: 95%;
  border-radius: 15px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
  }
`