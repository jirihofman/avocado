export default function ButtonNewQuestion({ question, handleNewQuestionClick, settings }) {

    const newButtonClass = question?.state === 'completed' ? 'btn-warning' : 'btn-outline-warning';

    return (
        <button onClick={handleNewQuestionClick} className={`btn ${newButtonClass} btn-lg ${settings.confirmAnswer ? 'w-50' : 'w-100'}`}>{question ? '⏭' : '⏩'}</button>
    );
}
