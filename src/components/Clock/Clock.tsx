import { ReactNode, useEffect, useState } from 'react'
import s from './Clock.module.css'

const SIZE = 240
const STROKE_WIDTH = 3
const RADIUS = (SIZE / 2) - STROKE_WIDTH
const ARC_LENGTH = 2 * Math.PI * RADIUS

type ClockProps = {
  max: number;
  value: number;
  children?: ReactNode
}

const Clock = ({ max, value, children }: ClockProps) => {
  const [progress, setProgress] = useState<number>(0)
  const [arcOffset, setArcOffset] = useState<number>(0)

  useEffect(() => {
    if (value) {
      setProgress(100 - (value / (max / 1000)) * 100)
    } else {
      setProgress(0)
    }
  }, [max, value])

  useEffect(() => {
    setArcOffset(ARC_LENGTH * ((100 - progress) / 100))
  }, [progress])

  return (
    <div className={s.container}>
      <div className={s.children}>{children}</div>
      <svg
        width={SIZE}
        height={SIZE}
      >
        <circle
          className={s.track}
          r={RADIUS}
          cx={SIZE / 2}
          cy={SIZE / 2}
          strokeWidth={STROKE_WIDTH}
          strokeDasharray={ARC_LENGTH}
        />
        <circle
          className={s.progress}
          r={RADIUS}
          cx={SIZE / 2}
          cy={SIZE / 2}
          strokeWidth={STROKE_WIDTH}
          strokeDasharray={ARC_LENGTH}
          strokeDashoffset={arcOffset}
        />
      </svg>
    </div>
  )
}

export default Clock
