'use client';
import { useState } from 'react';
import Error from 'next/error';
import { generateDemoQuestion, getResult } from '../lib/questions';

/**
 * TODO proper description - not up to date
 * TODO solution and options format can change. Make it an object.
 * @param {object} props
 * @param {string} props.text Question text
 * @param {string} props.solution Correct answer to the question
 * @param {string[]} props.options Possible answers to the question
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

    const handleAnswerClick = async event => {
        event.preventDefault();

        // TODO: increase count only if different answer is selected
        // console.log("previously selected", question.options.find(o => o.selected));
        question.options.forEach(option => {
            option.selected = option.id.toString() === event.target.dataset.id;
        });
        question.clickCount += 1;
        setQuestion({ ...question, state: 'answer-selected' });
        setSubmitEnabled(true);
    };

    const handleConfirmButtonClick = async event => {
        setQuestion({ ...question, state: 'completed', timeCompleted: new Date });
        event.preventDefault();
        const result = getResult(question);
        setResult(result);
        setSubmitEnabled(false);
        setOptionsEnabled(false);
    };

    if (error) {
        return <Error statusCode={error} />;
    }

    const newButtonClass = question && question.state === 'completed' ? 'btn-warning' : 'btn-outline-warning';
    const submitButtonClass = question && question.state !== 'answer-selected' ? 'btn-outline-primary' : 'btn-primary';

    return (
        <div className='styles-board'>
            <small className=''>{notes || 'Směle do toho.'}<br /></small>

            <button onClick={handleNewQuestionClick} className={`btn ${newButtonClass} btn-sm w-50`}>{question ? 'Nová otázka / příklad' : 'Začít'}</button>
            {
                question ? <>
                    <div className='h1'>
                        <small>{question.pretext}</small>
                        <b>{question.text}</b>
                    </div>
                    <div className='d-grid gap-2 d-block'>
                        {
                            question.options.map(option => {
                                const isAnswerCorrect = option.value === question.solution;
                                const variant = optionsEnabled ? 'info' : isAnswerCorrect ? 'success' : 'danger';
                                const classNameActive = option.selected ? 'active' : '';
                                const classNameButton = option.selected ? `btn-${variant}` : `btn-outline-${variant}`;

                                return (
                                    <button
                                        key={option.id}
                                        className={`btn btn-lg w-100 ${classNameButton} ${classNameActive}`}
                                        data-value={option.value}
                                        disabled={!optionsEnabled}
                                        data-id={option.id}
                                        style={{ display: 'flex', justifyContent: 'space-between', marginRight: '20px' }}
                                        onClick={handleAnswerClick}
                                    >
                                        {option.value}
                                        {result && (
                                            isAnswerCorrect ? <span className='badge bg-success mx-2 pull-right'>správně</span> : <span className='badge bg-danger mx-2'>špatně</span>
                                        )}
                                    </button>
                                );
                            })
                        }
                        <button disabled={!submitEnabled} onClick={handleConfirmButtonClick} id='styles-submit' className={`btn ${submitButtonClass} btn-lg`}>Potvrdit</button>
                    </div>
                    <div className='styles-resultText'>{result && result.text}</div>

                    <div className='mt-3'>
                        {result && <>
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
                    : <div>Tabule je prázdná. Klikněte na tlačítko Začít.</div>
            }
        </div>
    );
}
