import Head from 'next/head'
import Header from './header'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'

export const siteTitle = 'Avokádo lekce lehce'

export default function Layout({ children, home, title }) {

  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="og:title" content={title || siteTitle} />
      </Head>
      <Header>
        <h1 className={utilStyles.headingLg}>{title || siteTitle}</h1>
      </Header>
      <main>{children}</main>
    </div>
  )
}
