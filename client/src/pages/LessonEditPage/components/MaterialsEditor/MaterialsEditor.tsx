import { ChangeEvent, FC, useState } from 'react'
import { AddMaterialSection, AddSectionButton, MaterialsImageWrapper, MaterialsTextBlock, MaterialsTextBlockWrapper } from './styles'
import { useUpdateMaterialsMutation, useUploadFileMutation } from '../../../../store/api'
import { PlusIcon } from '../../../../assets/icons/PlusIcon'
import { ImageIcon } from '../../../../assets/icons/ImageIcon'
import { Colors } from '../../../../constants/Colors'
import { useDebouncedEffect } from '../../../../hooks/useDebouncedEffect'
import { LessonMaterial } from '../../../../api/types/entities/LessonMaterial'
import { CrossIcon } from '../../../../assets/icons/CrossIcon'
import { Endpoints } from '../../../../api'

const divider = '<<SECTIONDIVIDER>>'
const imageFlag = '<<IMG>>'

export interface MaterialsSection {
  type: "text" | "image",
  value: string
}

export const parseSections = (textData: string): MaterialsSection[] => {
  if (textData === "") return []
  return textData.split(divider).map(text => {
    const isImage = text.startsWith(imageFlag)
    return {
      type: isImage ? "image" : "text",
      value: isImage ? text.replace(imageFlag, "") : text
    } as MaterialsSection
  })
} 

const generateTextData = (sections: MaterialsSection[]): string => {
  if (sections.length === 0) return ""
  if (sections.length === 1) {
    if (sections[0].type === "image" && !sections[0].value.startsWith(imageFlag)) return `${imageFlag}${sections[0].value}`
    return sections[0].value
  }

  return sections.map(section => {
    if (section.type === "image" && !section.value.startsWith(imageFlag)) return `${imageFlag}${section.value}`
    return section.value
  }).join(divider)
}


interface MaterialsEditorProps {
  lessonId: string
  materials: LessonMaterial
}

export const MaterialsEditor: FC<MaterialsEditorProps> = ({ lessonId, materials }) => {
  const [updateMaterials] = useUpdateMaterialsMutation()
  const [uploadFile] = useUploadFileMutation()
  const [sections, setSections] = useState<MaterialsSection[]>(parseSections(materials?.textData || ""))

  useDebouncedEffect(() => {
    if (!sections.length) return
    updateMaterials({
      lessonId,
      textData: generateTextData(sections)
    })
  }, [sections], 400)

  const handleUpdateSection = (idx: number, data: string) => {
    const newSections = [...sections]
    newSections[idx].value = data
    setSections(newSections)
  }

  const handleDeleteSection = (idx: number) => {
    const newSections = sections.filter((_, index) => idx !== index)
    setSections(newSections)
  }

  const handleAddTextSection = () => {
    setSections([...sections, {
      type: "text",
      value: ""
    }])
  }

  const handleAddImageSection = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    await uploadFile(file).then((fileId: any) => {
      setSections([...sections, {
        type: "image",
        value: fileId?.data
      }])
    })
  }

  return (
    <>
      {
        sections.map((section, idx) => {
          if (section.type === "text") return (
            <MaterialsTextBlockWrapper>
              <MaterialsTextBlock
                value={section.value}
                onChange={e => handleUpdateSection(idx, e.target.value)}
              />
              <CrossIcon onClick={() => handleDeleteSection(idx)} fill={Colors.red}/>
            </MaterialsTextBlockWrapper>
          )
          if (section.type === "image") return (
            <MaterialsImageWrapper>
              <img src={Endpoints.files + section.value}/>
              <CrossIcon onClick={() => handleDeleteSection(idx)} fill={Colors.red}/>
            </MaterialsImageWrapper>
          )
        })
      }
      <AddMaterialSection>
        <AddSectionButton onClick={handleAddTextSection}>
          <PlusIcon fill={Colors.blue}/> Добавить абзац
        </AddSectionButton>
        <AddSectionButton>
          <ImageIcon fill={Colors.blue}/> Добавить фото
          <input onChange={handleAddImageSection} type="file" />
        </AddSectionButton>
      </AddMaterialSection>
    </>
  )
}
