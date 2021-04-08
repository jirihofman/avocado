import Head from 'next/head'
import Link from 'next/link'
import Date from '../../components/date'
import Layout, { siteTitle } from '../../components/layout'
import { getSortedPostsData } from '../../lib/posts'
import utilStyles from '../../styles/utils.module.css'

const title = 'Blog'

export default function Home({ allPostsData }) {
  return (
    <Layout title={title}>
      <Head>
        <title>{[title, siteTitle].join(' | ')}</title>
      </Head>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
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
