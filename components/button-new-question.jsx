export default function ButtonNewQuestion({ question, handleNewQuestionClick, settings }) {

    const newButtonClass = question?.state === 'completed' ? 'bg-yellow-400 hover:bg-yellow-500 text-gray-900' : 'bg-white border-2 border-yellow-400 text-yellow-600 hover:bg-yellow-50';

    return (
        <button onClick={handleNewQuestionClick} className={`px-6 py-3 rounded-lg font-bold text-2xl ${newButtonClass} ${settings.confirmAnswer ? 'w-1/2' : 'w-full'}`}>{question ? '⏭' : '⏩'}</button>
    );
}
