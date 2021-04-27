import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import Demo from '../components/demo'
import { getSortedPostsData } from '../lib/posts'
import Link from 'next/link'

export default function Home({}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <Demo />

      <section>
        <h3>Plná verze</h3>
        <p>V plné verzi si můžete vybrat ze všech dostupných cvičení ve všech předmětech. Můžete si sestavit vlastní test, ve kterém nastavíte předmět, počet otázek a případně i počet možných odpovědí.</p>
        <p>Plná verze zatím není k dispozici.</p>
        <ul id={'menuDemo'}>
          <li>
            <Link disabled href='/board-setup'><a role="button" title='Blog'>Výběr</a></Link>
          </li>
        </ul>
      </section>
      <section>
        <Link href='/posts'><a role="button" title='Blog'>🗒Blog</a></Link>
      </section>
    </Layout>
  )
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}
