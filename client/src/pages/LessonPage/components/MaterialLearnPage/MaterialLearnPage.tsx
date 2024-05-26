import { FC } from 'react'
import { parseSections } from '../../../LessonEditPage/components/MaterialsEditor/MaterialsEditor'
import { LessonMaterial } from '../../../../api/types/entities/LessonMaterial'
import { MaterialImageSection, MaterialPageWrapper, MaterialSections, MaterialTextSection, SectionsTitle } from './styles'
import { Endpoints } from '../../../../api'
import Button from '../../../../components/Button'
import { useModal } from '../../../../hooks/useModal'
import { ModalName } from '../../../../store/slices/modalSlice'
import { BackButton } from '../../../LessonEditPage/styles'
import { useNavigate } from 'react-router-dom'

interface MaterialLearnPageProps {
  materials: LessonMaterial
  setIsLearning: (val: boolean) => void
}

export const MaterialLearnPage: FC<MaterialLearnPageProps> = ({ materials, setIsLearning }) => {
  const modal = useModal()
  const navigate = useNavigate()
  const sections = parseSections(materials.textData)

  const handleStartTest = () => {
    modal.open({
      name: ModalName.confirm,
      title: "Вы готовы начать тест?",
      onConfirm: () => setIsLearning(false)
    })
  }

  return (
    <MaterialPageWrapper>
      <BackButton onClick={() => navigate(-1)}>Выйти</BackButton>
      <MaterialSections>
        <SectionsTitle>Учебные материалы</SectionsTitle>
        {
          sections.map(section => {
            if (section.type === "text") return (
              <MaterialTextSection>
                {section.value}
              </MaterialTextSection>
            )
            if (section.type === "image") return (
              <MaterialImageSection>
                <img src={Endpoints.files + section.value}/>
              </MaterialImageSection>
            )
          })
        }
        <Button onClick={handleStartTest}>Начать тест</Button>
      </MaterialSections>
    </MaterialPageWrapper>
  )
}
