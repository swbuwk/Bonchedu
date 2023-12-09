import { styled } from "styled-components"
import { Colors } from "../../constants/Colors"

const SpinnerWrapper = styled.svg`
    animation: rotate 2s linear infinite;
    z-index: 2;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -12.5px 0 0 -12.5px;
    width: 25px;
    height: 25px;
  
    & circle {
        stroke: ${Colors.white};
        stroke-linecap: round;
        animation: dash 1.5s ease-in-out infinite;
    }
  
    @keyframes rotate {
        100% {
            transform: rotate(360deg);
        }
    }

    @keyframes dash {
        0% {
            stroke-dasharray: 1, 75;
            stroke-dashoffset: 0;
        }
        50% {
            stroke-dasharray: 45, 75;
            stroke-dashoffset: -17;
        }
        100% {
            stroke-dasharray: 45, 75;
            stroke-dashoffset: -62;
        }
    }
`

export const Spinner = () => {
  return (
    <SpinnerWrapper viewBox="0 0 25 25">
        <circle cx="12.5" cy="12.5" r="10" fill="none" strokeWidth="3"></circle>
    </SpinnerWrapper>
  )
}
