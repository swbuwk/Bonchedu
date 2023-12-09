import { SharedModalProps, closeModal, hideModal, openModal, showModal } from "../store/slices/modalSlice";
import { useAppDispatch, useAppSelector } from "./redux"

export const useModal = () => {
  const modal = useAppSelector(state => state.modal);
  const dispatch = useAppDispatch()

  const open = <T>(props: T & SharedModalProps) => {
    dispatch(openModal(props))
  }

  const close = () => {
    dispatch(closeModal())
  }

  const show = () => {
    dispatch(showModal())
  }

  const hide = () => {
    dispatch(hideModal())
  }

  return {
    name: modal.info.name,
    opened: modal.opened,
    info: modal.info,
    open, close, show, hide
  }
}