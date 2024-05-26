import { configureStore } from "@reduxjs/toolkit";
import profileSlice from "./slices/profileSlice";
import modalSlice from "./slices/modalSlice";
import toastSlice from "./slices/toastSlice";
import { boncheduApi } from "./api";

export const store = configureStore({
  reducer: {
    [boncheduApi.reducerPath]: boncheduApi.reducer,
    profile: profileSlice.reducer,
    modal: modalSlice.reducer,
    toast: toastSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      boncheduApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
