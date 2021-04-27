import Head from 'next/head'
import Header from './header'

export const siteTitle = 'Avokádo lekce lehce'

export default function Layout({ children, home, subtitle, title }) {

  return (
    <div className={'container'}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="og:title" content={title} />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6" crossOrigin="anonymous"></link>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.bundle.min.js" integrity="sha384-JEW9xMcG8R+pH31jmWH6WWP0WintQrMb4s7ZOdauHnUtxwoG2vI5DkLtS3qm9Ekf" crossOrigin="anonymous"></script>
      </Head>
      <Header>
        <h3>
          {title}
          <small className="text-muted"> {subtitle}</small>
        </h3>
      </Header>
      <main>{children}</main>
    </div>
  )
}
