import { FC } from "react"
import { RadioButtonItem, RadioButtonWrapper } from "./styles"

export interface IRadioButtonItem {
  name: string
  id: number
}

interface RadioButtonProps {
  items: IRadioButtonItem[]
  activeId: number
  onSelect: (item: IRadioButtonItem) => void
}

export const RadioButton: FC<RadioButtonProps> = ({items, activeId, onSelect}) => {
  return (
    <RadioButtonWrapper>
      {items.map((item, idx) => (
        <RadioButtonItem
          onClick={() => onSelect(item)}
          isActive={item.id === activeId}
          key={item.id}
          first={idx === 0}
          last={idx === items.length - 1}
        >
          {item.name}
        </RadioButtonItem>
      ))}
    </RadioButtonWrapper>
  )
}
