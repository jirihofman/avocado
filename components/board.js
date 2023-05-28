import { useState } from 'react';
import { emojisplosion, defaultEmojis } from 'emojisplosion';
import Error from 'next/error';
import { sample } from 'lodash';
import { generateDemoQuestion, getResult, isIconDisplay } from '../lib/questions';

const settings = {
    confirmAnswer: false,
};

/**
 * @returns Screen with lesson configuration, question and/or answers.
 */
export default function Board({ demoId, notes, subject }) {
    const [error, setError] = useState(false);
    const [question, setQuestion] = useState();
    const [result, setResult] = useState();
    const [submitEnabled, setSubmitEnabled] = useState(false);
    const [optionsEnabled, setOptionsEnabled] = useState(false);

    const handleNewQuestionClick = async event => {
        event.preventDefault();

        try {
            const question = generateDemoQuestion({ demoId, subject });
            setQuestion({ ...question, timeDisplayed: new Date });
            setSubmitEnabled(false);
            setOptionsEnabled(true);
            setResult();
        } catch (error) {
            console.error('Error while rendering new question:', error);
            setError(error.message);
        }
    };

    const handleAnswerClick = async(evt, optionId) => {
        // TODO: increase count only if different answer is selected
        // console.log("previously selected", question.options.find(o => o.selected));
        question.options.forEach(option => {
            option.selected = option.id === optionId;
        });
        question.clickCount += 1;
        setSubmitEnabled(true);
        if (!settings.confirmAnswer) {
            handleConfirmButtonClick(evt);
        } else {
            setQuestion({ ...question, state: 'answer-selected' });
        }
    };

    const handleConfirmButtonClick = (evt) => {
        setQuestion({ ...question, state: 'completed', timeCompleted: new Date });
        // event.preventDefault();
        const result = getResult(question);
        setResult(result);
        setSubmitEnabled(false);
        setOptionsEnabled(false);

        // Add more emojis to the default set
        const emojis = defaultEmojis;
        emojis.push(
            ...sample([['🦖', '🦖', '🚀'], ['🦸‍♂️', '🧑‍🎤', '🚀'], ['💣', '🚀']])
        );

        if (result.ok) {
            // http://frontendfreecode.com/bootstrap-button-with-star-explosion-effect-on-click
            emojisplosion({
                emojis,
                position: () => ({
                    x: evt.clientX,
                    y: evt.clientY,
                }),
            });
        }
    };

    if (error) {
        return <Error statusCode={error} />;
    }

    const newButtonClass = question && question.state === 'completed' ? 'btn-warning' : 'btn-outline-warning';
    const submitButtonClass = question && question.state !== 'answer-selected' ? 'btn-outline-primary' : 'btn-primary';

    // Classes to display icon instead of text options
    const optionsGridClass = isIconDisplay(demoId) ? 'd-flex justify-content-center align-items-center mt-4' : 'd-grid d-block';

    const stylesBoardClass = result?.ok === true ? 'styles-board-ok' : result?.ok === false ? 'styles-board-fail' : null;

    return (
        <div className={stylesBoardClass}>
            {notes && <small>{notes}<hr /></small>}

            {
                question ? <>
                    <div className='h1'>
                        <small>{question.pretext}</small>
                        <b>{question.text}</b>
                    </div>
                    <div className={optionsGridClass + ' gap-2'}>
                        {
                            question.options.map(option => {
                                const isAnswerCorrect = option.value === question.solution;
                                const variant = optionsEnabled ? 'secondary' : isAnswerCorrect ? 'success' : 'danger';
                                const classNameActive = option.selected ? 'active' : '';
                                const classNameButton = option.selected ? `btn-${variant}` : `btn-outline-${variant}`;

                                return (
                                    <button
                                        key={option.id}
                                        className={`btn btn-lg w-100 ${isIconDisplay(demoId) ? 'justify-content-center' : ''} ${classNameButton} ${classNameActive}`}
                                        data-value={option.value}
                                        disabled={!optionsEnabled}
                                        data-id={option.id}
                                        style={{ display: 'flex', justifyContent: 'space-between' }}
                                        onClick={(evt) => handleAnswerClick(evt, option.id)}
                                    >
                                        {option.displayValue || option.value}
                                        {!isIconDisplay(demoId) && result && (
                                            isAnswerCorrect ? 
                                                <span className='badge bg-success mx-2 pull-right'>správně</span> : 
                                                <span className='badge bg-danger mx-2'>špatně</span>
                                        )}
                                    </button>
                                );
                            })
                        }
                    </div>
                    {/* Buttons next to each other */}
                    <div className='d-flex justify-content-between mt-4'>
                        {
                            settings.confirmAnswer &&
                            <button disabled={!submitEnabled} onClick={handleConfirmButtonClick} id='styles-submit' className={`btn ${submitButtonClass} btn-lg w-50`}>🆗</button>
                        }
                        <button onClick={handleNewQuestionClick} className={`btn ${newButtonClass} btn-lg ${settings.confirmAnswer ? 'w-50' : 'w-100'}`}>{question ? '⏭' : '⏩'}</button>
                    </div>
                    <div className='styles-resultText'>{result?.text}</div>

                    <div className='mt-3'>
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
                    </div>
                </>
                    : <div><button onClick={handleNewQuestionClick} className={`btn ${newButtonClass} btn-lg w-100`}>▶️</button></div>
            }
        </div>
    );
}
