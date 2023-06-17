import { FC } from 'react'
import { zeroPad, CountdownRenderProps } from 'react-countdown'
import { JetBrains_Mono } from 'next/font/google'
import s from './CounterDigits.module.css'

const jetBrainsMono = JetBrains_Mono({ weight: '100', subsets: ['latin'] })

type CounterDigitsProps = {
  props: CountdownRenderProps
}

const CounterDigits: FC<CounterDigitsProps> = ({ props }) => {
  return (
    <>
      <div className={
        `${s.Counter__number} ${jetBrainsMono.className}`
      }>
        {zeroPad(props?.minutes)}:{zeroPad(props?.seconds)}
      </div>
    </>
  )
}

export default CounterDigits
