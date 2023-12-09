import { ButtonHTMLAttributes, DetailedHTMLProps, FC, PropsWithChildren, useEffect, useRef, useState } from 'react'
import { css, styled } from 'styled-components'
import { Colors } from '../../constants/Colors'
import Spinner from '../Spinner'

interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    isLoading?: boolean;
    disabled?: boolean;
    whiteTheme?: boolean
    resizable?: boolean
    selected?: boolean
    onClick?: () => void
}

const ButtonWrapper = styled.button<{
  whiteTheme?: boolean
  width?: number
  selected?: boolean
}>`
    cursor: ${p => p.disabled ? "not-allowed" : "pointer"};
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    padding: 12px 16px 8px;
    min-height: 40px;

    font-size: 18px;
    line-height: 22px;
    color: ${p => p.whiteTheme ? Colors.black : Colors.white};

    background-color:  ${p => p.whiteTheme ? Colors.white : Colors.blue};
    box-shadow: 0 0 10px ${p => p.whiteTheme ? Colors.gray : Colors.blue}44;  
    border-radius: 10px;

    ${p => p.disabled && css`
        background-color: ${p.whiteTheme ? Colors.white : Colors.gray};
        color: ${p.whiteTheme ? Colors.gray : Colors.white};
        box-shadow: 0 0 10px ${Colors.gray};  
    `}

    width: auto;

    ${p => p.width && css`
      width: ${p.width}px;
    `}

    ${p => p.selected && css`
      background-color: ${Colors.lightBlue};
      color: ${Colors.white};
    `}
`

export const Button: FC<PropsWithChildren<ButtonProps>> = ({children, isLoading, disabled, selected, onClick, resizable, ...props}) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const [buttonWidth, setButtonWidth] = useState<number>(0)

  useEffect(() => {
    if (!buttonRef.current) return
    setButtonWidth(buttonRef.current.clientWidth)
  }, [buttonRef.current])

  return (
    <ButtonWrapper disabled={disabled} selected={selected} onClick={onClick} ref={buttonRef} width={resizable ? 0 : buttonWidth} {...props}>{isLoading ? <Spinner/> : children}</ButtonWrapper>
  )
}
