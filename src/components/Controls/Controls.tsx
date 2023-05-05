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
  const handleToggle = () => {
    if (isStarted) {
      onPause()
    } else {
      onStart()
    }
  }

  return (
    <>
      <button
        onClick={handleToggle}
        className={[
          s.buttonCircle,
          s.isActive,
        ].join(" ")}
      >
        {isStarted ? <PauseIcon /> : <StartIcon />}
      </button>

      <button
        onClick={onReset}
        className={s.buttonCircle}
      >
        <ResetIcon />
      </button>
    </>
  )
}

export default Controls