export default function QuestionResult({ question, result, subject }) {

    return <div className='mt-3'>
        {/* TODO: remove false when ready */}
        {result && false && <>
            <button title='TODO' className='px-4 py-2 bg-gray-100 text-gray-800 rounded hover:bg-gray-200' type='button'>
                <span>Podrobnosti:</span>
            </button>
            <button disabled title='TODO2' className='px-4 py-2 bg-gray-100 text-gray-400 rounded cursor-not-allowed' type='button'>
				Celkové hodnocení:
            </button>

            <div id='aftermath'>
                <div className='hidden' id='collapseExample'>
                    <div className='border border-gray-200 rounded p-4 mt-2'>
                        <ul className='list-disc list-inside'>
                            <li>Předmět: {subject}</li>
                            <li>Štítky:
                                {question.tags && question.tags.map(labelString => {
                                    return <span className='bg-gray-500 text-white px-2 py-1 rounded text-sm ml-1' key={labelString}>{labelString}</span>;
                                }) || ' žádné'}
                            </li>
                            <li>Průběh řešení
                                <ul className='list-disc list-inside ml-4'>
                                    <li>Vybrána odpověď: {question.clickCount}x</li>
                                    <li>Potvrzeno po: {question.timeCompleted && question.timeDisplayed &&
										parseInt((question.timeCompleted - question.timeDisplayed) / 1000, 10)
                                    }</li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className='hidden' id='collapseSession'>
                    <div className='border border-gray-200 rounded p-4 mt-2'>
						TODO UNFAKE
                        <ul className='list-disc list-inside'>
                            <li>Otázek celkem: 666</li>
                            <li>Správně: 1</li>
                            <li>Špatně: 665</li>
                            <li>Průměrný čas odpovědi: 30s</li>
                            <li>Nejkratší čas odpovědi: 2s</li>
                            <li>Nejdelší čas odpovědi: 201s</li>
                        </ul>
                    </div>
                </div>
            </div>
        </>}
    </div>;
}
