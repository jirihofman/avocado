import { useRouter } from 'next/router';
import Head from 'next/head';
import Layout, { siteTitle } from '../../../components/layout';
import Board from '../../../components/board';
import DefaultErrorPage from 'next/error';

export default function Exercise() {
    const router = useRouter();
    const { id: demoId } = router.query;

    let title = 'Demo', notes, subject, subtitle;

    switch (demoId) {
        case 'add-1':
            subtitle = 'Sčítání jednociferných čísel';
            notes = 'Vždy existiuje právě jedna správná odpověď.';
            subject = 'Matematika';
            break;
        case 'multiply-1':
            subtitle = 'Malá násobilka';
            notes = 'Vždy existiuje právě jedna správná odpověď.';
            subject = 'Matematika';
            break;
        case 'dice-add-1':
            subtitle = 'Kostky';
            subject = 'Hry';
            break;
        case 'capitals-1':
            subtitle = 'Hlavní města';
            subject = 'Zeměpis';
            break;
	
        default:
            console.error('Unknown demo:' + demoId);
            return <DefaultErrorPage statusCode={404} />;
    }

    title = 'Demo';

    return (
        <Layout title={title} subtitle={subtitle}>
            <Head>
                <title>{[title, subtitle, siteTitle].join(' | ')}</title>
            </Head>
            <Board
                subject={subject}
                demoId={demoId}
                notes={notes}
            />
        </Layout>
    );
}
