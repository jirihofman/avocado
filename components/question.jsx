import React from 'react';
import { useEffect, useState } from 'react';
import Error from 'next/error';
import QuestionResult from './question-result';
import { doEmojis, generateDemoQuestion, getResult, isIconDisplay, isSingleStep, demoIds, getNewTextComponent, preloadVoiceAlphabetAudio } from '../lib/questions';
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
        // Preload audio files if this is a voice alphabet demo
        if (demoId === demoIds.VOICE_ALPHABET_CZ_1) {
            preloadVoiceAlphabetAudio();
        }
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

        if (demoId === demoIds.VOICE_ALPHABET_CZ_1) {
            // if there is an <audio> element, play it again
            document.querySelector('audio')?.play();
        }
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
                    let textComponentProps = question.textComponentProps;
                    if (demoId === demoIds.VOICE_ALPHABET_CZ_1) {
                        // Prevent playing audio again.
                        textComponentProps = null;
                    }
                    const newTextComponent = getNewTextComponent(demoId, textComponentProps, { result });
                    setQuestion({ ...question, textComponent: newTextComponent, text: undefined });
                }
            }
        }
    };

    if (error) {
        return <Error statusCode={error} />;
    }

    const submitButtonClass = question && question.state !== 'answer-selected' 
        ? 'bg-white border-2 border-blue-500 text-blue-600 hover:bg-blue-50' 
        : 'bg-blue-500 hover:bg-blue-600 text-white';
    // Classes to display icon instead of text options
    const optionsGridClass = isIconDisplay(demoId) ? 'flex justify-center items-center mt-4' : 'grid block';
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
                    // warning color with dashed border
                    style.border = '3px dashed #f0ad4e';
                    style.fontWeight = 'bold';
                    className = 'current';
                } else {
                    style.border = '3px solid transparent';
                    className = 'not-completed';
                }
                return <button key={question.text + index + letter} className={`px-3 py-2 text-2xl border-2 border-blue-500 bg-white text-blue-600 rounded mr-1 ${className}`} disabled={true} style={style}>{letter}</button>;
            });

            return <>
                {letters}
                <p role="img" className='mx-3'>{question.pretext}</p>
            </>;
        }
    }

    return <div className={stylesBoardClass}>
        <div className='text-4xl font-bold question-text'>
            <small>{isSingleStep(demoId) ? question.pretext: ''}</small>
            <b>{getTextForWordQuestion()}</b>
        </div>

        <div className={optionsGridClass + ' gap-2'}>
            {
                question.options.map((option, index) => {
                    // TODO: redo this to use steps too
                    let isAnswerCorrect = option.value === question.solution;
                    let variant = optionsEnabled ? 'gray' : isAnswerCorrect ? 'green' : 'red';
                    let classNameActive = option.selected ? 'active' : '';
                    let optionDisabled = !optionsEnabled;

                    if (!isSingleStep(demoId)) {
                        if ([...disabledOptionsOK, ...disabledOptionsKO].includes(option.id)) {
                            isAnswerCorrect = disabledOptionsOK.includes(option.id);
                            variant = isAnswerCorrect ? 'green' : 'red';
                            classNameActive = 'active';
                            optionDisabled = true;
                        } else {
                            variant = 'gray';
                            optionDisabled = false;
                            classNameActive = '';
                        }
                    }

                    // Button color classes based on variant
                    let colorClasses = '';
                    if (option.selected && isSingleStep(demoId)) {
                        // Filled button
                        if (variant === 'gray') colorClasses = 'bg-gray-500 text-white border-gray-500';
                        else if (variant === 'green') colorClasses = 'bg-green-500 text-white border-green-500';
                        else if (variant === 'red') colorClasses = 'bg-red-500 text-white border-red-500';
                    } else {
                        // Outlined button
                        if (variant === 'gray') colorClasses = 'bg-white text-gray-700 border-gray-500 hover:bg-gray-50';
                        else if (variant === 'green') colorClasses = 'bg-white text-green-700 border-green-500 hover:bg-green-50';
                        else if (variant === 'red') colorClasses = 'bg-white text-red-700 border-red-500 hover:bg-red-50';
                    }

                    return (
                        <button
                            key={option.id}
                            className={`question-btn px-6 py-3 rounded-lg border-2 w-full ${isIconDisplay(demoId) ? 'justify-center' : ''} ${colorClasses} ${classNameActive}`}
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
                                    <span className='bg-green-500 text-white px-3 py-1 rounded mx-2'>správně</span> :
                                    <span className='bg-red-500 text-white px-3 py-1 rounded mx-2'>špatně</span>
                            )}
                        </button>
                    );
                })
            }
        </div>
        {/* Buttons next to each other */}
        <div className='flex justify-between mt-5 pt-4 border-t border-gray-300'>
            {
                settings.confirmAnswer &&
				<button disabled={!submitEnabled} onClick={handleConfirmButtonClick} id='styles-submit' className={`px-6 py-3 rounded-lg font-bold text-2xl ${submitButtonClass} w-1/2`}>🆗</button>
            }
            <ButtonNewQuestion question={question} handleNewQuestionClick={handleNewQuestionClick} settings={settings} />
            <button onClick={handleRetryButtonClick} className={`px-6 py-3 rounded-lg font-bold text-2xl ${submitButtonClass} w-1/2`} title='Opakovat'>🔄</button>
        </div>
        <div className='styles-resultText'>{result?.text}</div>

        <QuestionResult result={result} question={question} subject={subject} />
    </div>;
}
