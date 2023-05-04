import { FC } from "react"
import s from "./ButtonTab.module.css"

type ButtonTabProps = {
  text: string
  isActive?: boolean
  onClick?: () => void
}

const ButtonTab: FC<ButtonTabProps> = ({ text, isActive, onClick }) => {
  return (
    <>
      <button
        className={`${isActive ? s.ButtonActiveTab : s.ButtonTab}`}
        onClick={onClick}
      >
        {text}
      </button>
    </>
  )
}

export default ButtonTab
