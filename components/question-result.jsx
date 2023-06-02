export default function QuestionResult({ question, result, subject }) {

    return <div className='mt-3'>
        {/* TODO: remove false when ready */}
        {result && false && <>
            <button title='TODO' className='btn btn-light' type='button' data-bs-toggle='collapse' data-bs-target='#collapseExample' aria-expanded='false' aria-controls='collapseExample'>
                <span>Podrobnosti:</span>
            </button>
            <button disabled title='TODO2' className='btn btn-light' type='button' data-bs-toggle='collapse' data-bs-target='#collapseSession' aria-expanded='false' aria-controls='collapseSession'>
				Celkové hodnocení:
            </button>

            <div id='aftermath'>
                <div className='collapse' id='collapseExample' data-bs-parent="#aftermath">
                    <div className='card card-body'>
                        <ul>
                            <li>Předmět: {subject}</li>
                            <li>Štítky:
                                {question.tags && question.tags.map(labelString => {
                                    return <span className='badge bg-secondary ms-1' key={labelString}>{labelString}</span>;
                                }) || ' žádné'}
                            </li>
                            <li>Průběh řešení
                                <ul>
                                    <li>Vybrána odpověď: {question.clickCount}x</li>
                                    <li>Potvrzeno po: {question.timeCompleted && question.timeDisplayed &&
										parseInt((question.timeCompleted - question.timeDisplayed) / 1000, 10)
                                    }</li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className='collapse' id='collapseSession' data-bs-parent="#aftermath">
                    <div className='card card-body'>
						TODO UNFAKE
                        <ul>
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
