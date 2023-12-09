import { styled } from "styled-components"

export const NavigationWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 0 16px;
`

export const NavigationTop = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 28px;
`

export const NavigationBottom = styled.div`
    display: flex;
    width: 100%;
    margin-bottom: 24px;
`

export const NavItemWrapper = styled.div`
    cursor: pointer;
    display: flex;
    gap: 28px;
`

export const NavItemIcon = styled.div`
    width: 25px;
    height: 25px;
`

export const NavItemTitle = styled.div`
    font-size: 15px;
    line-height: 17px;
    transform: translateY(4px);
`