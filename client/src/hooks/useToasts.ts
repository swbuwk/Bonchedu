import { ToastType, addToast, clearToasts } from "../store/slices/toastSlice"
import { useAppDispatch } from "./redux"

export const useToasts = () => {
  const dispatch = useAppDispatch()

  const neutral = (text: string) => {
    dispatch(addToast({
      type: ToastType.neutral,
      text
    }))
  }

  const success = (text: string) => {
    dispatch(addToast({
      type: ToastType.success,
      text
    }))
  }

  const error = (text: string) => {
    dispatch(addToast({
      type: ToastType.error,
      text
    }))
  }

  const clear = () => {
    dispatch(clearToasts())
  }

  return {
    neutral,
    success,
    error,
    clear
  }
}