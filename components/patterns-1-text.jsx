import React from 'react';

/**
 * 6 emojis. One of them is a `❓` that is replaced by the correct answer.
 */
export default function PatternsText({ question, result }) {

    const element = <div className='d-flex justify-content-center align-items-center'>
        {[...question.text].map((emoji, i) => {
            const solutionClass = emoji === '❓' ? 'question-mark text-decoration-underline' : '';
            const resultIndex = result ? 1 : 0;
            return <span key={i + resultIndex} className={`mx-1 ${solutionClass}`}>{emoji}</span>;
        })}
    </div>;
    if (result) {
        // Add css for the animation
        setTimeout(() => {
            addCssAnimation(question.solution);
        }, 0);
    }

    return element;
}

function addCssAnimation(solution) {

    const questionMark = document.querySelector('.question-mark');
    const correctAnswer = solution;
    questionMark.style.transition = 'opacity 1.5s';
    questionMark.style.opacity = 0;

    setTimeout(() => {
        questionMark.style.opacity = 1;
        questionMark.innerText = correctAnswer;
    }, 1500);
}
