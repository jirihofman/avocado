import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import { getSortedPostsData } from '../lib/posts'
import Link from 'next/link'

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section>
        <h3>Demo</h3>
        <p>Generované příklady - procvičování</p>
        <div className='flex-container'>
          <Link href='/board/demo/add-1'><a title='Sčítání' className='demo-category-link'>Sčítání</a></Link>
          <Link href='/board/demo/multiply-1'><a title='Malá násobilka' className='demo-category-link'>Malá násobilka</a></Link>
          <Link href='/board/demo/capitals-1'><a title='Hlavní města' className='demo-category-link'>Hlavní města</a></Link>
        </div>
      </section>
      <section>
        <h3>Plná verze</h3>
        <p>V plné verzi si můžete vybrat ze všech dostupných cvičení ve všech předmětech. Můžete si sestavit vlastní test, ve kterém nastavíte předmět, počet otázek a případně i počet možných odpovědí.</p>
        <p>Plná verze zatím není k dispozici.</p>
        <ul id={'menuDemo'}>
          <li>
            <Link disabled href='/board-setup'><a title='Blog'>Výběr</a></Link>
          </li>
        </ul>
      </section>
      <section>
        <Link href='/posts'><a title='Blog'>🗒Blog</a></Link>
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
