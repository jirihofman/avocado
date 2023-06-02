import Question from './question';

/**
 * @returns Screen with lesson configuration, question and/or answers.
 */
export default function Board({ demoId, notes, subject }) {


    return (
        <div>
            {notes && <small>{notes}<hr /></small>}

            <Question demoId={demoId} subject={subject} />
        </div>
    );
}
