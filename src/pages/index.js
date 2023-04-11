import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import Layout from '@/components/_layout/Layout'
import UserContextProvider from '@/contexts/user.context'

export default function Home() {
  return (
    <>
      <Head>
        <title>Bike Commuting Uploader</title>
        <meta name="description" content="Strava bike commuting activity uploader" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <UserContextProvider>
          <Layout />
        </UserContextProvider>
      </main>
    </>
  )
}