import s from './Clock.module.css'

const SIZE = 200
const STROKE_WIDTH = 3
const RADIUS = (SIZE / 2) - STROKE_WIDTH

const Clock = () => {
  const progress = 25
  const arcLength = 2 * Math.PI * RADIUS
  const arcOffset = arcLength * ((100 - progress) / 100)

  return (
    <div className={s.container}>
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
          strokeDasharray={arcLength}
        />
        <circle
          className={s.progress}
          r={RADIUS}
          cx={SIZE / 2}
          cy={SIZE / 2}
          strokeWidth={STROKE_WIDTH}
          strokeDasharray={arcLength}
          strokeDashoffset={arcOffset}
        />
      </svg>
    </div>
  )
}

export default Clock
