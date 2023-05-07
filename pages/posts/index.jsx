import Head from 'next/head';
import Link from 'next/link';
import Date from '../../components/date';
import Layout, { siteTitle } from '../../components/layout';
import { getSortedPostsData } from '../../lib/posts';

const title = 'Blog';

export default function Home({ allPostsData }) {
    return (
        <Layout title={title}>
            <Head>
                <title>{[title, siteTitle].join(' | ')}</title>
                <link href='https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css' rel='stylesheet' crossOrigin='anonymous' />
                <script src='https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js' crossOrigin='anonymous' />
            </Head>
            <section className=''>
                <ul className=''>
                    {allPostsData.map(({ id, date, title }) => (
                        <li className='' key={id}>
                            <Link legacyBehavior href={`/posts/${id}`}>
                                <a>{title}</a>
                            </Link>
                            <br />
                            <small className=''>
                                <Date dateString={date} />
                            </small>
                        </li>
                    ))}
                </ul>
            </section>
        </Layout>
    );
}

export async function getStaticProps() {
    const allPostsData = getSortedPostsData();
    return {
        props: {
            allPostsData
        }
    };
}
