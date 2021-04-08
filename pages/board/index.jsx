import Head from 'next/head'
import Layout, { siteTitle } from '../../components/layout'
import Board from '../../components/board'

const title = 'Procvičování'

export default function Exercise({subject}) {
	return (
		<Layout title={title}>
			<Head>
				<title>{[title, siteTitle].join(' | ')}</title>
			</Head>
			<Board
				subject={subject}
				title='Procvičování - malé sčítání, náhodně generované'
			/>
		</Layout>
	)
}
