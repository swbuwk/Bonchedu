import styled, { css } from "styled-components";
import { Colors } from "../../constants/Colors";

export const MainPageWrapper = styled.div<{
    noStrictHeight?: boolean
}>`
    position: relative;
    width: 100vw;
    max-width: 100vw;
    min-height: 100vh;
    height: ${p => p.noStrictHeight ? "" : "100vh"};
    background-color: ${Colors.white};
    display: flex;
    justify-content: center;
    box-sizing: border-box;
    padding: 2.5vw;

    ${p => p.noStrictHeight && css`
        overflow-x: hidden;
    `}
`

export const MainPageInner = styled.div`
    position: relative;
    width: 100%;
    max-width: 100%;
    height: 100%;
    display: flex;
    gap: 2.5vw;
`

export const MainContentWrapper = styled.div<{
    hideSideBar: boolean | null
}>`
    position: relative;
    width: ${p => p.hideSideBar ? "100%" : "calc(92.5vw - 370px)"};
    max-width: ${p => p.hideSideBar ? "100%" : "calc(92.5vw - 370px)"};
    display: flex;
    justify-content: center;
    align-items: center;
`

export const ModalProvider = styled.div<{
    visible?: boolean
}>`
    left: 0;
    top: 0;
    position: absolute;
    z-index: ${p => p.visible ? 100 : 0};
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`