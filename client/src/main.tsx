import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainPage from "./pages/MainPage";
import StartPage from "./pages/StartPage";
import AuthPage from "./pages/AuthPage";
import { Provider } from "react-redux";
import { store } from "./store";
import FriendsPage from "./pages/FriendsPage";
import RatingPage from "./pages/RatingPage";
import CoursePage from "./pages/CoursePage";
import ExplorePage from "./pages/ExplorePage";
import ChapterPage from "./pages/ChapterPage";
import LessonEditPage from "./pages/LessonEditPage";
import LessonPage from "./pages/LessonPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
    children: [
      {
        path: "/",
        element: <StartPage />,
      },
      {
        path: "/auth/:option",
        element: <AuthPage />,
      },
      {
        path: "/courses",
        element: <ExplorePage />,
      },
      {
        path: "/courses/:id",
        element: <CoursePage />,
      },
      {
        path: "/chapters/:id",
        element: <ChapterPage />,
      },
      {
        path: "/lessons/:id",
        element: <LessonPage />,
      },
      {
        path: "/lessons/:id/edit",
        element: <LessonEditPage />,
      },
      {
        path: "/friends",
        element: <FriendsPage />,
      },
      {
        path: "/rating",
        element: <RatingPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
