import { FC, PropsWithChildren, useEffect, useMemo } from "react";
import {
  MainContentWrapper,
  MainPageInner,
  MainPageWrapper,
  ModalProvider,
} from "./styles";
import { Outlet, useLocation, useMatch, useNavigate } from "react-router-dom";
import SideBar from "../../features/SideBar";
import { useProfile } from "../../hooks/useProfile";
import Modal from "../../features/Modal";
import { useModal } from "../../hooks/useModal";
import ToastProvider from "../../features/Toast";

const GUARDED_ROUTES = [
  "/courses",
  "/chapters",
  "/lessons",
  "/friends",
  "/rating",
];

export const MainPage: FC<PropsWithChildren> = () => {
  const profile = useProfile();
  const modal = useModal();
  const location = useLocation();
  const navigate = useNavigate();
  const isStartPage = !!useMatch("/");
  const isAuthPage = !!useMatch("/auth/:option");
  const isLessonPage = !!useMatch("/lessons/:id");
  const isLessonEdit = !!useMatch("/lessons/:id/edit");

  const hideSideBar = isStartPage || isAuthPage || isLessonEdit || isLessonPage;
  const disableStrcitHeight = isLessonEdit;

  const isGuardedRoute = useMemo(
    () => GUARDED_ROUTES.some((route) => location.pathname.startsWith(route)),
    [location.pathname]
  );

  useEffect(() => {
    profile.getProfileInfo();
  }, []);

  useEffect(() => {
    if (isGuardedRoute && !profile.loading && !profile.user.id) {
      profile.showGuardError();
      navigate("/auth/login");
    }
    if ((isAuthPage || isStartPage) && profile.user.id) {
      navigate("/courses");
    }
  }, [profile, isGuardedRoute, isAuthPage, isStartPage]);

  return (
    <>
      <ModalProvider visible={modal.opened}>
        <Modal />
      </ModalProvider>
      <ToastProvider>
        <MainPageWrapper noStrictHeight={disableStrcitHeight}>
          <MainPageInner>
            {!hideSideBar && <SideBar />}
            <MainContentWrapper hideSideBar={hideSideBar}>
              <Outlet />
            </MainContentWrapper>
          </MainPageInner>
        </MainPageWrapper>
      </ToastProvider>
    </>
  );
};
