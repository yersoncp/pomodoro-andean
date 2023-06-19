import { useEffect, useRef, useState } from 'react'
import Countdown, { zeroPad, CountdownTimeDelta } from 'react-countdown'
import { COUNTER_TYPE, LOCAL_STORAGE_KEY, POMODORO_CONFIG, PomodoroConfig } from '@/config/params'
import { Clock, Controls, CounterDigits, CounterTypes } from '@/components'
import s from '@/styles/Pomodoro.module.css'
import { useLocalStorage } from '@/hooks'

const PomodoroContainer = ({ }) => {
  const [] = useLocalStorage<PomodoroConfig>(LOCAL_STORAGE_KEY, POMODORO_CONFIG)

  const countdownRef = useRef() as React.MutableRefObject<Countdown>
  const [audio, setAudio] = useState<HTMLAudioElement>()
  const [timeToCountdown, setTimeToCountdown] = useState<number>(Date.now())
  const [counterType, setCounterType] = useState<string>(COUNTER_TYPE.POMODORO)
  const [isStarted, setIsStarted] = useState<boolean>(false)
  const [pomodoroConfig, setPomodoroConfig] = useState<PomodoroConfig>(POMODORO_CONFIG)
  const [currentTimeInSeconds, setCurrentTimeInSeconds] = useState<number>(0)

  const handeSetCountdown = (counterType: string) => {
    document.title = 'Ready!!!'
    const selectedPomodoro = POMODORO_CONFIG[counterType]
    const t = Date.now() + selectedPomodoro.time

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
    setCurrentTimeInSeconds(evt.minutes * 60 + evt.seconds)
    document.title = `${zeroPad(evt.minutes)}:${zeroPad(evt.seconds)}`
  }

  const handleComplete = () => {
    document.title = 'Hurry!!!'
    const quantityUpdated = pomodoroConfig[counterType].quantity + 1
    const configUpdated: PomodoroConfig = {
      ...pomodoroConfig,
      [counterType]: {
        ...pomodoroConfig[counterType],
        quantity: quantityUpdated,
      },
    }

    setPomodoroConfig(configUpdated)
    setCurrentTimeInSeconds(0)

    if (audio) {
      audio.volume = 0.65
      audio.play()
    }

    if (counterType === COUNTER_TYPE.POMODORO) {
      handeSetCountdown(quantityUpdated % 5 ? COUNTER_TYPE.SHORT_BREAK : COUNTER_TYPE.LONG_BREAK)
      handleStart()
    } else {
      handeSetCountdown(COUNTER_TYPE.POMODORO)
    }
  }

  useEffect(() => {
    setAudio(new Audio('/assets/grandfathers-clock.mp3'))
    handeSetCountdown(COUNTER_TYPE.POMODORO)
  }, [])

  return (
    <div className={s.PomodoroWrapper}>
      {/* Header */}
      <div className={s.PomodoroHead}>
        <CounterTypes
          pomodoroConfig={pomodoroConfig}
          currentCounterType={counterType}
          onSelectCounterType={handeSetCountdown}
        />
      </div>

      <Clock max={pomodoroConfig[counterType].time} value={currentTimeInSeconds}>
        <Countdown
          ref={countdownRef}
          date={timeToCountdown}
          autoStart={false}
          onTick={handleTick}
          onComplete={handleComplete}
          renderer={(props) => <CounterDigits props={props} />}
        />
      </Clock>


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
