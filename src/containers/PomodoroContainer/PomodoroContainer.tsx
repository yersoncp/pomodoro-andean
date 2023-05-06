import { useEffect, useRef, useState } from 'react'
import Countdown, { zeroPad, CountdownTimeDelta } from 'react-countdown'
import { COUNTER_TYPE, POMODORO_CONFIG } from '@/config/params'
import s from '@/styles/Pomodoro.module.css'
import { Controls, Counter, CounterTypes } from '@/components'

const PomodoroContainer = ({ }) => {
  const countdownRef = useRef() as React.MutableRefObject<Countdown>
  const [audio, setAudio] = useState<HTMLAudioElement>()
  const [timeToCountdown, setTimeToCountdown] = useState<number>(Date.now())
  const [pomodoroQty, setPomodoroQty] = useState<number>(0)
  const [shortBreakQty, setShortBreakQty] = useState<number>(0)
  const [counterType, setCounterType] = useState<string>(COUNTER_TYPE.POMODORO)
  const [isStarted, setIsStarted] = useState<boolean>(false)

  const handeSetTime = (counterType: string) => {
    document.title = 'Ready!!!'
    const t = Date.now() + POMODORO_CONFIG[counterType].time

    countdownRef.current.stop()
    setTimeToCountdown(t)
    setCounterType(counterType)
    setIsStarted(false)
  }

  const handleStart = () => {
    countdownRef.current.start()
    setIsStarted(true)
  }

  const handlePause = () => {
    countdownRef.current.pause()
    setIsStarted(false)
  }

  const handleReset = () => {
    countdownRef.current.stop()
    setIsStarted(false)
  }

  const handleTick = (evt: CountdownTimeDelta) => {
    document.title = `${zeroPad(evt.minutes)}:${zeroPad(evt.seconds)}`
  }

  const handleComplete = () => {
    document.title = 'Hurry!!!'

    if (audio) {
      audio.volume = 0.75
      audio.play()
    }

    if (counterType === COUNTER_TYPE.POMODORO) {
      setPomodoroQty(pomodoroQty + 1)
      handeSetTime(COUNTER_TYPE.SHORT_BREAK)
      handleStart()
    }

    if (counterType === COUNTER_TYPE.SHORT_BREAK) {
      setShortBreakQty(shortBreakQty + 1)
      handeSetTime(COUNTER_TYPE.POMODORO)
    }
  }

  useEffect(() => {
    setAudio(new Audio('/assets/grandfathers-clock.mp3'))
    handeSetTime(COUNTER_TYPE.POMODORO)
  }, [])

  return (
    <div className={s.PomodoroWrapper}>
      {/* Header */}
      <div className={s.PomodoroHead}>
        <CounterTypes
          currentCounterType={counterType}
          onSelectCounterType={handeSetTime}
        />
      </div>

      <Countdown
        ref={countdownRef}
        date={timeToCountdown}
        autoStart={false}
        onTick={handleTick}
        onComplete={handleComplete}
        renderer={(props) => <Counter props={props} />}
      />

      {/* Footer */}
      <div className={s.PomodoroFooter}>
        <Controls
          isStarted={isStarted}
          onStart={handleStart}
          onPause={handlePause}
          onReset={handleReset}
        />
      </div>

    </div>
  )
}

export default PomodoroContainer
