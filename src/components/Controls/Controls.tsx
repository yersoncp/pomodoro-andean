import { FC } from "react"
import s from "./Controls.module.css"
import { PauseIcon, ResetIcon, StartIcon } from "../Icons"

type ControlsProps = {
  isStarted: boolean
  onStart: () => void
  onPause: () => void
  onReset: () => void
}

const Controls: FC<ControlsProps> = ({ isStarted, onStart, onPause, onReset }) => {
  return (
    <>
      {isStarted ? (
        <button className={s.ControlButton} onClick={onPause}>
          <PauseIcon />
        </button>
      ) : (
        <button className={s.ControlButton} onClick={onStart}>
          <StartIcon />
        </button>
      )}
      <button className={s.ControlDefault} onClick={onReset}>
        <ResetIcon />
      </button>
    </>
  )
}

export default Controls