import { useState, useEffect, useCallback } from 'react'
import Error from 'next/error'
import { generateDemoQuestion, getResult } from '../lib/questions'

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

  const [error, setError] = useState(false)
  const [question, setQuestion] = useState()
  const [result, setResult] = useState()
  const [submitEnabled, setSubmitEnabled] = useState(false)
  const [optionsEnabled, setOptionsEnabled] = useState(false)

  const handleAnswerClick = async event => {
    event.preventDefault()
    question.options.forEach(option => {
      option.selected = option.id.toString() === event.target.dataset.id
    });
    question.clickCount += 1
    const alteredQuestion = { pretext: question.pretext, text: question.text, options: question.options, solution: question.solution, clickCount: question.clickCount }
    setQuestion(alteredQuestion)
    setSubmitEnabled(true)
  }

  const handleNewQuestionClick = async event => {
    event.preventDefault()
    try {
      const question = generateDemoQuestion({ demoId })
      setQuestion(question)
      setSubmitEnabled(false)
      setOptionsEnabled(true)
      setResult()
    } catch (error) {
      console.error('Error while rendering new question:', error)
      setError(error.message)
    }
  }

  const handleConfirmButtonClick = async event => {
    event.preventDefault()
    const result = getResult(question);
    setResult(result)
    setSubmitEnabled(false)
    setOptionsEnabled(false)
  }

  if (error) {
    return <Error statusCode={error} />
  }

  return <div className={'styles-board'}>
    <small className={''}>{notes ? notes : 'Směle do toho.'}<br /></small>

    {/* <button>{'<'}</button>
    <button>{'>'}</button> */}

    <button onClick={handleNewQuestionClick} className={'btn btn-outline-warning btn-sm w-50'}>{question ? 'Nová otázka / příklad' : 'Začít'}</button>
    {
      question ? <>
        <div className={'h1'}>
          <small>{question.pretext}</small>
          <b>{question.text}</b>
        </div>
        <div className={'d-grid gap-2 d-block'}>
          {
            question.options.map(option => {
              const isAnswerCorrect = option.value === question.solution;
              const variant = optionsEnabled ? 'info' : isAnswerCorrect ? 'success' : 'danger';
              const classNameActive = option.selected ? 'active' : '';
              const classNameButton = option.selected ? `btn-${variant}` : `btn-outline-${variant}`;

              return <button key={option.id}
                className={`btn btn-lg w-100 ${classNameButton} ${classNameActive}`}
                data-value={option.value}
                disabled={!optionsEnabled}
                data-id={option.id}
                style={{ display: 'flex', justifyContent: 'space-between', marginRight: '20px' }}
                onClick={handleAnswerClick}>
                {option.value}
                {result && (
                  isAnswerCorrect ? <span className="badge bg-success mx-2 pull-right">správně</span> : <span className="badge bg-danger mx-2">špatně</span>
                )}
              </button>
            })
          }
          <button disabled={!submitEnabled} onClick={handleConfirmButtonClick} id={'styles-submit'} className='btn btn-primary btn-lg'>Potvrdit</button>
        </div>
        <div className={'styles-resultText'}>{result && result.text}</div>
        <div className={'styles-details'}>
          {result && <>
            <button class="btn btn-light" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
              Podrobnosti:
            </button>
            <div class="collapse" id="collapseExample">
              <div class="card card-body">
                TODO UNFAKE
                <ul>
                  <li>Okruh: {subject}</li>
                  <li>Štítky: sčítání, jednociferné, do 20, tři možnosti</li>
                  <li>Průběh řešení
                    <ul>
                      <li>Vybrána odpověď: 5x</li>
                      <li>Potvrzeno po: 4s</li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </>
          }
        </div>
      </> :
        <div>Tabule je prázdná. Klikněte na tlačítko Začít.</div>
    }
  </div>
}
