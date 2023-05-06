import { FC } from 'react'
import { Button } from '..'
import { POMODORO_CONFIG } from '@/config/params'

type CounterTypesProps = {
  currentCounterType: string
  onSelectCounterType: (counterType: string) => void,
}

const CounterTypes: FC<CounterTypesProps> = ({ currentCounterType, onSelectCounterType }) => {
  return (
    <>
      {Object.keys(POMODORO_CONFIG)?.length && (
        <>
          {Object
            .keys(POMODORO_CONFIG)
            .map((key) => POMODORO_CONFIG[key])
            .filter((counter) => counter.active)
            .map((counter) => (
              <Button
                key={counter.key}
                text={`${0} ${counter.label}`}
                isActive={currentCounterType === counter.key}
                onClick={() => onSelectCounterType(counter.key)}
              />
            ))}
        </>
      )}
    </>
  )
}

export default CounterTypes
