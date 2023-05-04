import { FC, useEffect, useRef, useState } from "react"
import Countdown, { zeroPad, CountdownTimeDelta } from "react-countdown"
import { COUNTER_TYPE, MINUTS } from "@/config/params"
import Counter from "@/components/Counter/Counter"

const PomodoroContainer = ({ }) => {
  const countdownRef = useRef() as React.MutableRefObject<Countdown>
  const [audio, setAudio] = useState<HTMLAudioElement>()
  const [timeToCountdown, setTimeToCountdown] = useState<number>(Date.now())
  const [pomodoroQty, setPomodoroQty] = useState<number>(0)
  const [shortBreakQty, setShortBreakQty] = useState<number>(0)
  const [counterType, setCounterType] = useState<string>(COUNTER_TYPE.POMODORO)

  const handeSetTime = (counterType: string | typeof COUNTER_TYPE) => {
    countdownRef.current.stop()
    const t = Date.now() + (MINUTS[counterType as keyof typeof MINUTS] * 1000 * 60)
    setTimeToCountdown(t)
  }

  const handleStart = () => {
    countdownRef.current.start()
  }

  const handleStop = () => {
    countdownRef.current.stop()
  }

  const handleTick = (evt: CountdownTimeDelta) => {
    document.title = `${zeroPad(evt.minutes)}:${zeroPad(evt.seconds)}`
  }

  const handleComplete = () => {
    document.title = `Hurry!!!`
    if (audio) {
      audio.volume = 0.75
      audio.play()
    }

    if (counterType === COUNTER_TYPE.POMODORO) {
      setPomodoroQty(pomodoroQty + 1)
      setCounterType(COUNTER_TYPE.SHORT_BREAK)
      handeSetTime(COUNTER_TYPE.SHORT_BREAK)
      handleStart()
    }

    if (counterType === COUNTER_TYPE.SHORT_BREAK) {
      setShortBreakQty(shortBreakQty + 1)
      setCounterType(COUNTER_TYPE.POMODORO)
      setCounterType(COUNTER_TYPE.POMODORO)
    }
  }

  useEffect(() => {
    setAudio(new Audio("/assets/grandfathers-clock.mp3"))
    handeSetTime(COUNTER_TYPE.POMODORO)
  }, [])

  return (
    <>
      <div>Qty pomodoro: {pomodoroQty}</div>
      <div>Qty break: {shortBreakQty}</div>
      <div>Counter type: {counterType}</div>

      <Countdown
        ref={countdownRef}
        date={timeToCountdown}
        autoStart={false}
        onTick={handleTick}
        onComplete={handleComplete}
        renderer={(props) => <Counter props={props} />}
      />

      <div>
        <button onClick={() => handeSetTime(COUNTER_TYPE.POMODORO)}>Set pomodoro</button>
        {" "}
        <button onClick={() => handeSetTime(COUNTER_TYPE.SHORT_BREAK)}>Set short break</button>
        {" "}
        <button onClick={handleStart}>Start</button>
        {" "}
        <button onClick={handleStop}>Stop</button>
      </div>

    </>
  )
}

export default PomodoroContainer
