import { FC, ReactNode } from 'react'
import s from './Button.module.css'

type ButtonProps = {
  children: ReactNode
  isActive?: boolean
  onClick?: () => void
}

const Button: FC<ButtonProps> = ({ children, isActive, onClick }) => {
  return (
    <>
      <button
        className={[
          s.button,
          isActive ? s.isActive : '',
        ].join(' ')}
        onClick={onClick}
      >
        {children}
      </button>
    </>
  )
}

export default Button
