import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./services/user";
import profileSlice from "./slices/profileSlice";
import { courseApi } from "./services/course";
import modalSlice from "./slices/modalSlice";
import toastSlice from "./slices/toastSlice";
import { chapterApi } from "./services/chapter";
import { lessonApi } from "./services/lessons";
import { taskApi } from "./services/task";

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [courseApi.reducerPath]: courseApi.reducer,
    [chapterApi.reducerPath]: chapterApi.reducer,
    [lessonApi.reducerPath]: lessonApi.reducer,
    [taskApi.reducerPath]: taskApi.reducer,
    profile: profileSlice.reducer,
    modal: modalSlice.reducer,
    toast: toastSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      userApi.middleware,
      courseApi.middleware,
      chapterApi.middleware,
      lessonApi.middleware,
      taskApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
