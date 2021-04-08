import { useState, useEffect, useCallback } from 'react'
import Error from 'next/error'
import styles from './board.module.css'
import utilStyles from '../styles/utils.module.css'
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

  return <div className={styles.board}>
    <div className={utilStyles.small}>{notes ? notes : 'Směle do toho.'}</div>

    {/* <button>{'<'}</button>
    <button>{'>'}</button> */}

    <button onClick={handleNewQuestionClick} className={styles.buttonNew}>{question ? 'Nová otázka / nový příklad' : 'Začít'}</button>
    {
      question ? <>
        <div className={styles.questionText}>
          {question.pretext}
          <b>{question.text}</b>
        </div>
        <div className={styles.options}>
          {
            question.options.map(option => {
              const className = option.selected ? styles.selected : '';
              console.log("rendering option:", option);
              return <div className={styles.option} key={option.id}>
                <button
                  className={className}
                  data-value={option.value}
                  disabled={!optionsEnabled}
                  data-id={option.id}
                  onClick={handleAnswerClick}>{option.value}</button>
                {
                  result && (<>
                    <div className={styles.optionResult}>{option.value === question.solution ? "✅" : "❌"}</div>
                  </>
                  )}
              </div>
            })
          }
        </div>
        <button disabled={!submitEnabled} onClick={handleConfirmButtonClick} id={styles.submit}>Potvrdit</button>
        {
          result && (<div className={styles.result}>{result.ok ? "✅" : "❌"}</div>)
        }
        <div className={styles.resultText}>{result && result.text}</div>
        <div className={styles.details}>
          {result && <>
            TODO: Podrobnosti úkolu:
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
          </>
          }
        </div>
      </> :
        <div>Tabule je prázdná. Klikněte na tlačítko Začít.</div>
    }
  </div>
}
