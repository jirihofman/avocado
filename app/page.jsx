import Demo from '../components/demo';

export default function Home() {

    return (
        <>
            <Demo />

            <section className='px-1'>
                <h3>Plná verze</h3>
                <p>V plné verzi si můžete vybrat ze všech dostupných cvičení ve všech předmětech. Můžete si sestavit vlastní test, ve kterém nastavíte předmět, počet otázek a případně i počet možných odpovědí.</p>
                <p>Plná verze zatím není k dispozici.</p>
                {/* <ul id='menuDemo'>
                    <li>
                        <Link legacyBehavior href='/board-setup'><a role='button' title='TODO' disabled>Výběr</a></Link>
                    </li>
                </ul> */}
            </section>
        </>
    );
}
