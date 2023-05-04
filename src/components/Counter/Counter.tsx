import { FC, useEffect, useRef, useState } from "react"
import Countdown, { zeroPad, CountdownTimeDelta } from "react-countdown"
import { JetBrains_Mono } from 'next/font/google'
import { MINUTS } from "@/config/params"

const jetBrainsMono = JetBrains_Mono({ weight: "100", subsets: ["latin"] })

type CounterProps = {
}

const Counter: FC<CounterProps> = ({ }) => {
  const countdownRef = useRef() as React.MutableRefObject<Countdown>
  const audio = new Audio("/assets/grandfathers-clock.mp3")

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
    audio.volume = 0.65
    audio.play()
  }

  return (
    <>
      <Countdown
        ref={countdownRef}
        date={Date.now() + (MINUTS.STAGE * 1000 * 60)}
        autoStart={false}
        onTick={handleTick}
        onComplete={handleComplete}
        renderer={(props) => (
          <div
            className={jetBrainsMono.className}
            style={{ fontSize: "8rem" }}
          >
            {zeroPad(props.minutes)}:{zeroPad(props.seconds)}
          </div>
        )}
      />

      <div>
        <button onClick={handleStart}>Start</button>
        <button onClick={handleStop}>Stop</button>
      </div>

    </>
  )
}

export default Counter
