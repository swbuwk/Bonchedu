import { css, styled } from "styled-components";
import { Colors } from "../../constants/Colors";

export const InputWrapper = styled.div<{
    fullWidth?: boolean;
    boxShadow?: boolean;
    height?: string | number;
    fs?: string
}>`
    width: ${p => p.fullWidth ? "100%" : "auto"};
    display: flex;
    flex-direction: column;
    align-items: left;

    input {
        width: ${p => p.fullWidth ? "100%" : "auto"};
        font-size: 18px;
        line-height: 24px;
        box-sizing: border-box;
        outline: none;
        border: none;
        padding: 8px;
        padding-bottom: 5px;
        border-radius: 10px;
        transition: 0.2s;

        ${p => p.boxShadow && css`
            box-shadow: 0 0 10px ${Colors.gray}44;
        `}

        ${p => p.fs && css`
            font-size: ${p.fs};
        `}
    }
`

export const InputTopText = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: flex-end;
`

export const Label = styled.div`
    font-size: 18px;
    line-height: 24px;
    margin-bottom: 6px;

    span {
        color: red;
    }
`

export const Error = styled.div`
    height: fit-content;
    font-size: 12px;
    line-height: 24px;
    margin-bottom: 6px;
    color: red;
`

