import { useRouter } from 'next/router'
import Head from 'next/head'
import Layout, { siteTitle } from '../../../components/layout'
import Board from '../../../components/board'

export default function Exercise({}) {
	const router = useRouter()
	const { id: demoId } = router.query

	let title = 'Demo', notes, subject;

	switch (demoId) {
		case 'add-1':
			title = 'Sčítání jednociferných čísel'
			notes = 'Vždy existiuje právě jedna správná odpověď.'
			subject = 'Matematika'
			break;
		case 'multiply-1':
			title = 'Malá násobilka'
			notes = 'Vždy existiuje právě jedna správná odpověď.'
			subject = 'Matematika'
			break;
		case 'capitals-1':
			title = 'Hlavní města'
			subject = 'Zeměpis'
			break;
	
		default:
			console.error("Unknown demo:" + demoId)
			break;
	}

	title = 'Demo - ' + title

	return (
		<Layout title={title}>
			<Head>
				<title>{[title, siteTitle].join(' | ')}</title>
			</Head>
			<Board
				subject={subject}
				demoId={demoId}
				notes={notes}
			/>
		</Layout>
	)
}
