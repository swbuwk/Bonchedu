import { styled } from "styled-components";

export const TextboxWrapper = styled.div<{
    fullWidth?: boolean;
}>`
    width: ${p => p.fullWidth ? "100%" : "auto"};
    display: flex;
    flex-direction: column;
    align-items: left;

    textarea {
        resize: none;
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
        min-height: 100px;
    }
`

export const TextboxTopText = styled.div`
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

