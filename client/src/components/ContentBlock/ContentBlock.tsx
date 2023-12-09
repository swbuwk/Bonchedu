import { FC, PropsWithChildren } from "react";
import { css, styled } from "styled-components";

const ContentBlockWrapper = styled.div<ContentBlockProps>`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  border-radius: 15px;
  box-shadow: 3px 6px 15px 1px rgba(131, 134, 175, 0.5);
  padding: ${(p) => p.padding ?? "24px"};
  overflow: hidden;

  ${(p) =>
    p.w &&
    css`
      width: ${p.w};
      max-width: ${p.w};
    `};
  ${(p) =>
    p.h &&
    css`
      height: ${p.h};
      max-height: ${p.h};
    `};
`;

interface ContentBlockProps {
  padding?: string;
  w?: string;
  h?: string;
  gap?: string;
}

export const ContentBlock: FC<PropsWithChildren<ContentBlockProps>> = ({
  children,
  ...props
}) => {
  return <ContentBlockWrapper {...props}>{children}</ContentBlockWrapper>;
};
