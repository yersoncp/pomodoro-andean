import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import PomodoroContainer from '@/containers/PomodoroContainer/PomodoroContainer'

export default function Home() {
  return (
    <>
      <Head>
        <title>Pomodoro</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main}`}>

        <div>
          <PomodoroContainer />
        </div>

      </main>
    </>
  )
}
