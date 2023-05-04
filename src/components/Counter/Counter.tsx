import { FC, useEffect, useRef, useState } from "react"
import Countdown, { zeroPad } from "react-countdown"
import { JetBrains_Mono } from 'next/font/google'
const specialElite = JetBrains_Mono({ weight: "100", subsets: ["latin"] })

type CounterProps = {
}

const Counter: FC<CounterProps> = ({ }) => {
  const countdownRef = useRef() as React.MutableRefObject<Countdown>

  const handleStart = () => {
    countdownRef.current.start()
  }

  const handleStop = () => {
    countdownRef.current.stop()
  }

  return (
    <>
      <Countdown
        ref={countdownRef}
        autoStart={false}
        date={Date.now() + 20000}
        onComplete={(evt) => {
          console.log("onComplete", evt)
        }}
        renderer={(props) => (
          <div
            className={specialElite.className}
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
