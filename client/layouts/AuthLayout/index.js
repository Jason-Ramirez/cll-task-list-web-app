import Head from 'next/head'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import styles from '../../styles/default.module.css'

export default ({ children }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Task List App</title>
        <meta name="description" content="Task List App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header auth={true} />

      <main className={styles.main}>
        <div>{children}</div>
      </main>

      <Footer />
    </div>
  )
}