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
            </Head>
            <section className=''>
                <ul className=''>
                    {allPostsData.map(({ id, date, title }) => (
                        <li className='' key={id}>
                            <Link href={`/posts/${id}`}>
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
