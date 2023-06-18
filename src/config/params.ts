export type PomodoroConfigItem = {
  key: string
  label: string
  active: boolean
  time: number
  quantity: number
}

export type PomodoroConfig = {
  [key: string]: PomodoroConfigItem
}

export const COUNTER_TYPE = {
  POMODORO: 'POMODORO',
  SHORT_BREAK: 'SHORT_BREAK',
  LONG_BREAK: 'LONG_BREAK',
}

export const POMODORO_CONFIG: PomodoroConfig = {
  POMODORO: {
    key: COUNTER_TYPE.POMODORO,
    label: 'Pomodoro',
    active: true,
    time: 25 * 1000 * 60,
    quantity: 0,
  },
  SHORT_BREAK: {
    key: COUNTER_TYPE.SHORT_BREAK,
    label: 'Short Break',
    active: true,
    time: 5 * 1000 * 60,
    quantity: 0,
  },
  LONG_BREAK: {
    key: COUNTER_TYPE.LONG_BREAK,
    label: 'Long break',
    active: true,
    time: 15 * 1000 * 60,
    quantity: 0,
  },
}
