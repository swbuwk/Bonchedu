import { css, styled } from "styled-components"

interface IconWrapperProps {
  w?: string
  h?: string
  pointer?: boolean
}

export interface IconProps extends IconWrapperProps {
  fill?: string
  onClick?: () => void
}

export const IconWrapper = styled.div<IconWrapperProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${p => p.w ? p.w : "24px"};
  height: ${p => p.h ? p.h : "24px"};
  ${p => p.pointer && css`cursor: pointer;`};

  svg {
    width: ${p => p.w ? p.w : "24px"};
    height: ${p => p.h ? p.h : "24px"};
  }
`
