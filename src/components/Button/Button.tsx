import { FC } from 'react'
import s from './Button.module.css'

type ButtonProps = {
  text: string
  isActive?: boolean
  onClick?: () => void
}

const Button: FC<ButtonProps> = ({ text, isActive, onClick }) => {
  return (
    <>
      <button
        className={[
          s.button,
          isActive ? s.isActive : '',
        ].join(' ')}
        onClick={onClick}
      >
        {text}
      </button>
    </>
  )
}

export default Button
