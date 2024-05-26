import { FC, useState } from 'react'
import { ModalName, SharedModalProps } from '../../../../store/slices/modalSlice'
import { ImageUploaderWrapper, UpdateAvatarHint, UpdateAvatarWrapper } from './styled'
import ImageUploader from '../../../../components/ImageUploader'
import Button from '../../../../components/Button'
import { useProfile } from '../../../../hooks/useProfile'
import { useToasts } from '../../../../hooks/useToasts'
import { useModal } from '../../../../hooks/useModal'
import { useUpdatePersonalInfoMutation } from '../../../../store/api'

interface UpdateAvatarModalProps extends SharedModalProps {
  name: ModalName.updateAvatar
}

export const UpdateAvatarModal: FC<UpdateAvatarModalProps> = () => {
  const profile = useProfile()
  const modal = useModal()
  const toasts = useToasts()
  const [file, setFile] = useState<Blob>()
  const [updatePersonalInfo] = useUpdatePersonalInfoMutation()

  const handleAvatarUpdate = async () => {
    await updatePersonalInfo({ picture: file })
    await profile.getProfileInfo()
    toasts.success("Фотография профиля обновлена")
    modal.close()
  }

  return (
    <UpdateAvatarWrapper>
      <UpdateAvatarHint>Загрузите изображение формата JPG, PNG или GIF</UpdateAvatarHint>
      <ImageUploaderWrapper>
        <ImageUploader onUpload={e => setFile(e)}/>
      </ImageUploaderWrapper>
      <Button disabled={!file} onClick={handleAvatarUpdate}>Сохранить</Button>
    </UpdateAvatarWrapper>
  )
}
