import Head from 'next/head';
import Header from './header';

export const siteTitle = 'Avokádo lekce lehce';

export default function Layout({ children, subtitle, title }) {
    return (
        <div className='container'>
            <Head>
                <link rel='icon' href='/favicon.ico' />
                <meta name='og:title' content={title} />
                <link href='https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css' rel='stylesheet' crossOrigin='anonymous' />
                <script src='https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js' crossOrigin='anonymous' />
            </Head>
            <Header>
                <h3>
                    {title}
                    <small className='text-muted'> {subtitle}</small>
                </h3>
            </Header>
            <main>{children}</main>
        </div>
    );
}
