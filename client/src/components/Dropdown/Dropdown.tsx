import { FC, MouseEvent, ReactNode, useMemo, useRef, useState } from "react"
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
  const targetWrapperRef = useRef<HTMLDivElement | null>(null)

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

  const listOffsetTop = useMemo(() => {
    if (!targetWrapperRef.current) return 0
    return targetWrapperRef.current.clientHeight + 10
  }, [targetWrapperRef.current])

  return (
    <DropdownWrapper>
      <TargetWrapper ref={targetWrapperRef} onClick={toggleDropdownVisibility}>
        {target}
      </TargetWrapper>
      <DropdownList top={listOffsetTop} ref={listRef} isVisible={isVisible}>
        {options.map((opt, idx) => (
          <DropdownItem key={idx} onClick={e => handleOptionClick(e, opt.action)}>
            {opt.element}
          </DropdownItem>
        ))}
      </DropdownList>
    </DropdownWrapper>
  )
}
