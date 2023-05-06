import { FC } from 'react'
import { Button } from '..'
import { PomodoConfigType } from '@/config/params'

type CounterTypesProps = {
  pomodoroConfig: PomodoConfigType
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
                text={`${counter.quantity} ${counter.label}`}
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
