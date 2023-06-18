import { FC } from 'react'
import { Button } from '..'
import { PomodoroConfig } from '@/config/params'

type CounterTypesProps = {
  pomodoroConfig: PomodoroConfig
  currentCounterType: string
  onSelectCounterType: (counterType: string) => void,
}

const CounterTypes: FC<CounterTypesProps> = ({ pomodoroConfig, currentCounterType, onSelectCounterType }) => {
  return (
    <>
      {Object.keys(pomodoroConfig)?.length && (
        <>
          {Object
            .keys(pomodoroConfig)
            .map((key) => pomodoroConfig[key])
            .filter((counter) => counter.active)
            .map((counter) => (
              <Button
                key={counter.key}
                isActive={currentCounterType === counter.key}
                onClick={() => onSelectCounterType(counter.key)}
              >
                {counter.quantity} {counter.label}
              </Button>
            ))}
        </>
      )}
    </>
  )
}

export default CounterTypes
