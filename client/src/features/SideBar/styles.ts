import { styled } from "styled-components";

export const SideBarWrapper = styled.div`
    min-width: 370px;
    height: 100%;
    display: flex;
    align-items: center;
`

export const SidebarInner = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 48px;
`

export const ProfileInfoWrapper = styled.div`
    display: flex;
    gap: 16px;
`

export const ProfileAvatar = styled.div`
    width: 90px;
    min-width: 90px;
    height: 90px;

    border-radius: 15px;
    background: #6B7FCB;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 15px;
    }
`

export const ProfileInfo = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

export const ProfileName = styled.div`
    font-size: 20px;
    line-height: normal;
`

export const ProfileLevel = styled.div`
    font-size: 18px;
    line-height: normal;
`