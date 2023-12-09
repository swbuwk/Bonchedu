import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export enum ToastType {
  neutral="neutral",
  success="success",
  error="error"
}

export interface Toast {
  id?: string
  type: ToastType
  text: string
}

const initialState: Toast[] = []

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    addToast(state, action: PayloadAction<Toast>) {
      const newToast = {...action.payload, id: crypto.randomUUID()}
      state.unshift(newToast)
    },
    removeToast(state, action: PayloadAction<string | undefined>) {
      if (!action.payload) return
      return state.filter(toast => toast.id !== action.payload)
    },
    removeLastToast(state) {
      state.pop()
    },
    clearToasts() {
      return []
    }
  }
})

export const {
  addToast,
  removeToast,
  removeLastToast,
  clearToasts
} = toastSlice.actions

export default toastSlice