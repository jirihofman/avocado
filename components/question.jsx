import React from 'react';
import { useEffect, useState } from 'react';
import Error from 'next/error';
import QuestionResult from './question-result';
import { doEmojis, generateDemoQuestion, getResult, isIconDisplay, isSingleStep, demoIds, getNewTextComponent } from '../lib/questions';
import ButtonNewQuestion from './button-new-question';
import QuestionLoading from './question-loading';

const settings = {
    confirmAnswer: false,
};

export default function Question({ demoId, subject }) {

    const [submitEnabled, setSubmitEnabled] = useState(false);
    const [optionsEnabled, setOptionsEnabled] = useState(false);
    const [error, setError] = useState(false);
    const [question, setQuestion] = useState();
    const [result, setResult] = useState();
    const [disabledOptionsOK, setDisabledOptionsOK] = useState([]);
    const [disabledOptionsKO, setDisabledOptionsKO] = useState([]);

    useEffect(() => {
        // Show new question immediately. Good for quick practising, not for timed tests.
        handleNewQuestionClick();
    }, []);

    const handleNewQuestionClick = async() => {

        try {
            const question = generateDemoQuestion({ demoId, subject });
            setQuestion({ ...question, timeDisplayed: new Date });
            setSubmitEnabled(false);
            setOptionsEnabled(true);
            setResult();
            setDisabledOptionsOK([]);
            setDisabledOptionsKO([]);
        } catch (error) {
            console.error('Error while rendering new question:', error);
            setError(error.message);
        }
    };

    const handleRetryButtonClick = () => {
        // remove `selected` property from options
        question.options.forEach((option) => {
            delete option.selected;
        });

        const textComponent = getNewTextComponent(demoId, demoId === demoIds.PATTERNS_1 ? question : question.textComponentProps, { result: demoId === demoIds.PATTERNS_1 ? undefined : result });
        setQuestion({ ...question, state: 'new', currentStep: 0, textComponent });
        setSubmitEnabled(false);
        setOptionsEnabled(true);
        setResult();
        setDisabledOptionsOK([]);
        setDisabledOptionsKO([]);
    };

    const handleAnswerClick = async(evt, clickedOptionIndex) => {
        // TODO: increase count only if different answer is selected
        // console.log("previously selected", question.options.find(o => o.selected));
        question.options.forEach((option, index) => {
            option.selected = index === clickedOptionIndex;
        });
        question.clickCount += 1;

        setSubmitEnabled(true);

        if (!isSingleStep(demoId) && settings.confirmAnswer) {
            alert('Multistep question with confirm not implemented yet.');
        }

        if (!settings.confirmAnswer) {
            handleConfirmButtonClick(evt);
        } else {
            setQuestion({ ...question, state: 'answer-selected' });
        }
    };

    const handleConfirmButtonClick = (evt) => {
        const { id } = evt.target.dataset;
        // value from data-value attribute of target or closest button parent.
        const value = evt.target.dataset.value || evt.target.closest('button').dataset.value;
        if (!isSingleStep(demoId)) {
            const result = getResult(question, { index: parseInt(question.currentStep, 10), optionValue: value });
            if (question.steps?.[question.currentStep]?.solution === value) {
                // Step is correct
                if (question.currentStep < question.steps.length - 1) {
                    // There are more steps, do only small emoji explosion
                    setQuestion({ ...question, currentStep: question.currentStep + 1, timeCompleted: new Date });
                    doEmojis({ evt, result, demoId, emojiCount: () => Math.random() * 3 + 3, });
                } else {
                    // All steps are correct, do big emoji explosion
                    setResult(result);
                    setSubmitEnabled(false);
                    setOptionsEnabled(false);
                    setQuestion({ ...question, state: 'completed', timeCompleted: new Date });
                    // question.pretext is the emoji to display on success.
                    doEmojis({ evt, result, demoId, finalEmoji: question.pretext });
                }
                setDisabledOptionsOK([...disabledOptionsOK, parseInt(id, 10)]);
            } else {
                // Step is incorrect
                setResult(result);
                setSubmitEnabled(false);
                setOptionsEnabled(false);
                // Find correct option(s)
                const wrongOptions = question.options.filter((o) => question.steps[question.currentStep].solution !== o.value);
                // Disable all options except the correct one.
                setDisabledOptionsKO([...disabledOptionsKO, ...wrongOptions.map((o) => o.id)]);
                // Correct disabled options are the rest of the options.
                setDisabledOptionsOK([...disabledOptionsOK, ...question.options.filter((o) => !wrongOptions.includes(o)).map((o) => o.id)]);
            }
        } else {
            // Single step question
            setQuestion({ ...question, state: 'completed', timeCompleted: new Date });
            const result = getResult(question);
            setResult(result);
            setSubmitEnabled(false);
            setOptionsEnabled(false);

            // Some questions might start emojis later, eg. chess after move is completed.
            setTimeout(() => {
                doEmojis({ evt, result, demoId, finalEmoji: question.solutionDisplay || value });
            }, question.emojiDelay || 0);

            if (question.textComponent) {
                // TODO: refactor this hardcoded demoId functionality.
                if (demoId === demoIds.PATTERNS_1) {
                    const newTextComponent = getNewTextComponent(demoId, question, { result });
                    setQuestion({ ...question, textComponent: newTextComponent });
                } else {
                    // It is a react component. Pass it another props.
                    // Clone doesn't do re-render.
                    const newTextComponent = getNewTextComponent(demoId, question.textComponentProps, { result });
                    setQuestion({ ...question, textComponent: newTextComponent, text: undefined });
                }
            }
        }
    };

    if (error) {
        return <Error statusCode={error} />;
    }

    const submitButtonClass = question && question.state !== 'answer-selected' ? 'btn-outline-primary' : 'btn-primary';
    // Classes to display icon instead of text options
    const optionsGridClass = isIconDisplay(demoId) ? 'd-flex justify-content-center align-items-center mt-4' : 'd-grid d-block';
    const stylesBoardClass = result?.ok === true ? 'styles-board-ok' : result?.ok === false ? 'styles-board-fail' : null;

    if (!question) return <QuestionLoading />;

    if (!isSingleStep(demoId)) {
        // return 'TODO: implement multi-step questions';
    }

    function getTextForWordQuestion() {
        if (isSingleStep(demoId)) {
            return question.textComponent || question.text;
        }

        if (demoId === demoIds.WORDS_1) {
            const currentLetterIndex = question.currentStep;
            const letters = question.text.split('').map((letter, index) => {
                let className;
                const style = {
                    fontSize: '2.1rem',
                    minWidth: '50px',
                    // black color
                    color: '#000',
                    // capital letters
                    textTransform: 'uppercase',
                };

                // Completed letters are underlined and bold
                if (index < currentLetterIndex || question.state === 'completed') {
                    // style.textDecoration = 'underline';
                    style.fontWeight = 'bold';
                    className = 'completed';
                }

                if (index === currentLetterIndex && question.state !== 'completed') {
                    // bootstrap style warning color
                    style.border = '3px dashed #f0ad4e';
                    style.fontWeight = 'bold';
                    className = 'current';
                } else {
                    style.border = '3px solid transparent';
                    className = 'not-completed';
                }
                return <button key={question.text + index + letter} className={`btn btn-lg btn-outline-primary me-1 ${className}`} disabled={true} style={style}>{letter}</button>;
            });

            return <>
                {letters}
                <p role="img" className='mx-3'>{question.pretext}</p>
            </>;
        }
    }

    return <div className={stylesBoardClass}>
        <div className='h1 question-text'>
            <small>{isSingleStep(demoId) ? question.pretext: ''}</small>
            <b>{getTextForWordQuestion()}</b>
        </div>

        <div className={optionsGridClass + ' gap-2'}>
            {
                question.options.map((option, index) => {
                    // TODO: redo this to use steps too
                    let isAnswerCorrect = option.value === question.solution;
                    let variant = optionsEnabled ? 'secondary' : isAnswerCorrect ? 'success' : 'danger';
                    let classNameActive = option.selected ? 'active' : '';
                    let optionDisabled = !optionsEnabled;

                    if (!isSingleStep(demoId)) {
                        if ([...disabledOptionsOK, ...disabledOptionsKO].includes(option.id)) {
                            isAnswerCorrect = disabledOptionsOK.includes(option.id);
                            variant = isAnswerCorrect ? 'success' : 'danger';
                            classNameActive = 'active';
                            optionDisabled = true;
                        } else {
                            variant = 'secondary';
                            optionDisabled = false;
                            classNameActive = '';
                        }
                    }

                    const classNameButton = option.selected && isSingleStep(demoId) ? `btn-${variant}` : `btn-outline-${variant}`;

                    return (
                        <button
                            key={option.id}
                            className={`question-btn btn btn-lg w-100 ${isIconDisplay(demoId) ? 'justify-content-center' : ''} ${classNameButton} ${classNameActive}`}
                            data-value={option.value}
                            disabled={optionDisabled}
                            data-id={option.id}
                            data-index={index}
                            style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.5rem' }}
                            onClick={(evt) => handleAnswerClick(evt, index)}
                        >
                            {/* {isAnswerCorrect ? '✅' : '❌'} */}
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
        <div className='d-flex justify-content-between mt-5 pt-4 border-top'>
            {
                settings.confirmAnswer &&
				<button disabled={!submitEnabled} onClick={handleConfirmButtonClick} id='styles-submit' className={`btn ${submitButtonClass} btn-lg w-50`}>🆗</button>
            }
            <ButtonNewQuestion question={question} handleNewQuestionClick={handleNewQuestionClick} settings={settings} />
            <button onClick={handleRetryButtonClick} className={`btn ${submitButtonClass} btn-lg w-50`} title='Opakovat'>🔄</button>
        </div>
        <div className='styles-resultText'>{result?.text}</div>

        <QuestionResult result={result} question={question} subject={subject} />
    </div>;
}
