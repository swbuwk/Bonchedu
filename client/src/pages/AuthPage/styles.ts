import { styled } from "styled-components";
import { Colors } from "../../constants/Colors";

export const AuthPageWrapper = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 36px;
`

export const AuthPageTitle = styled.div`
    font-size: 48px;
    line-height: 52px;
    font-weight: 400;
`

export const ContentWrapper = styled.form`
    display: flex;
    flex-direction: column;
    gap: 36px;
    width: 100%;
    padding: 0 24px;
`

export const InputList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
    width: 100%;
`

export const ErrorMessage = styled.div`
    min-height: 20px;
    text-align: center;
    font-size: 16px;
    line-height: 20px;
    color: red;
`

export const AuthRedirect = styled.div`
    cursor: pointer;
    text-decoration: underline;
    color: ${Colors.gray};
`