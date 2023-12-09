import { FC, useState } from "react"
import { ModalName, SharedModalProps } from "../../../../store/slices/modalSlice"
import { ButtonsWrapper, ConfirmModalWrapper } from "./styles"
import Button from "../../../../components/Button"
import { useModal } from "../../../../hooks/useModal"

export interface ConfirmModalProps extends SharedModalProps {
  name: ModalName.confirm
  title: string
  onConfirm?: () => (Promise<void> | void)
}

export const ConfirmModal: FC<ConfirmModalProps> = ({ title, onConfirm }) => {
  const modal = useModal()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleConfirm = async () => {
    if (!onConfirm) {
      modal.close()
      return
    }
    setIsLoading(true)
    await onConfirm()
    setIsLoading(false)
    modal.close()
  }

  return (
    <ConfirmModalWrapper>
      {title}
      <ButtonsWrapper>
        <Button isLoading={isLoading} onClick={handleConfirm}>Подтвердить</Button>
        <Button whiteTheme onClick={() => modal.close()}>Отмена</Button>
      </ButtonsWrapper>
    </ConfirmModalWrapper>
  )
}
