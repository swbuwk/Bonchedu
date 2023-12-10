import { FC, MouseEvent, ReactNode, useRef, useState } from "react"
import { DropdownItem, DropdownList, DropdownWrapper, TargetWrapper } from "./styles"

export interface DropdownOption {
  element: string | ReactNode
  action: () => void
}

interface DropdownProps {
  options: DropdownOption[]
  target: ReactNode
  closeOnChoose?: boolean
}

export const Dropdown: FC<DropdownProps> = ({ options, target, closeOnChoose = false }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [lock, setLock] = useState<boolean>(false)
  const listRef = useRef<HTMLDivElement | null>(null)

  const handleOptionClick = (e: MouseEvent, action: () => void) => {
    if (!closeOnChoose) {
      e.preventDefault()
      e.stopPropagation()
    }
    action()
  }

  const hideOptions = () => {
    listRef.current && (listRef.current.style.opacity = "0")
    setLock(true)
    setTimeout(() => {
      setLock(false)
      setIsVisible(false)
    }, 150)
  }

  const toggleDropdownVisibility = (e: MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (lock) return
    
    if (isVisible) {
      hideOptions()
      window.removeEventListener("click", hideOptions)
      return
    }
    setIsVisible(true)
    window.addEventListener("click", hideOptions)
    setTimeout(() => listRef.current && (listRef.current.style.opacity = "1"))
  }

  return (
    <DropdownWrapper>
      <TargetWrapper onClick={toggleDropdownVisibility}>
        {target}
      </TargetWrapper>
      <DropdownList ref={listRef} isVisible={isVisible}>
        {options.map((opt, idx) => (
          <DropdownItem key={idx} onClick={e => handleOptionClick(e, opt.action)}>
            {opt.element}
          </DropdownItem>
        ))}
      </DropdownList>
    </DropdownWrapper>
  )
}
