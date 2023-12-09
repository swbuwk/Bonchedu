import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export enum ModalName {
  none = "none",
  createCourse = "createCourse",
  createChapter = "createChapter",
  createLesson = "createLesson",
  confirm = "confirm",
}

export interface EmptyModalProps {
  name: ModalName.none;
  onClose: () => {};
}

export interface SharedModalProps {
  name: ModalName;
  onClose?: () => void;
}

export interface Modal<T> {
  opened: boolean;
  info: T & SharedModalProps;
}

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    opened: false,
    info: {
      name: ModalName.none,
      onClose: () => {},
    },
  },
  reducers: {
    openModal<T>(state: Modal<T>, action: PayloadAction<T & SharedModalProps>) {
      state.opened = true;
      state.info = action.payload;
    },
    closeModal(state) {
      state.opened = false;
      state.info = {
        name: ModalName.none,
        onClose: () => {},
      };
    },
    showModal(state) {
      state.opened = true;
    },
    hideModal(state) {
      state.opened = false;
    },
  },
});

export const { closeModal, openModal, hideModal, showModal } =
  modalSlice.actions;

export default modalSlice;
