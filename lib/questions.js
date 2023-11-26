import { emojisplosion, defaultEmojis } from 'emojisplosion';
import _ from 'lodash';
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6 } from 'react-bootstrap-icons';
import ChessBoard from '../components/chessboard';
import { setQuestionsTv } from './questions-tv';
import { setQuestionsPatterns } from './questions-patterns';

export const demoIds = {
    ADD_1: 'add-1',
    MULTIPLY_1: 'multiply-1',
    CAPITALS_1: 'capitals-1',
    DICE_ADD_1: 'dice-add-1',
    DICE_LARGER_1: 'dice-larger-1',
    /** Allowed moves for a single piece. */
    CHESS_1: 'chess-1',
    LARGER_1: 'larger-1',
    WORDS_1: 'words-1',
    PATTERNS_1: 'patterns-1',
    TV_1: 'tv-1',
};

export function getNewTextComponent(demoId, textComponentProps, newProps) {
    switch (demoId) {
        case demoIds.CHESS_1: {
            return <ChessBoard {...textComponentProps} {...newProps} />;
        }
        default:
            return;
    }
}

export function generateDemoQuestion({ demoId, subject }) {

    let emojiDelay = 0, options = [], pretext, solution, solutionDisplay, steps = [], tags = [], text, textComponent, textComponentProps, timeDisplayed, timeCompleted;

    // DEMO questions
    if (demoId) {
        switch (demoId) {
            case demoIds.ADD_1: {
                const min = 1, max = 9;
                const a = _.random(min, max);
                const b = _.random(min, max);

                const operand = '+';
                solution = a + b;

                options = [{ id: 1, value: solution }];

                options.push({ id: 2, value: genAnswerValue(solution - 3, solution + 3, options.map(option => option.value)) });
                options.push({ id: 3, value: genAnswerValue(solution - 3, solution + 3, options.map(option => option.value)) });

                options = options.sort((a, b) => a.value - b.value);

                text = `${a} ${operand} ${b} =`;

                tags = ['sčítání', 'jednociferné', 'do 20', 'tři možnosti'];

                break;
            }

            case demoIds.MULTIPLY_1: {
                const min = 1, max = 9;
                const a = _.random(min, max);
                const b = _.random(min, max);

                const operand = '*';
                solution = a * b;

                options = [{ id: 1, value: solution }];

                options.push({ id: 2, value: genAnswerValue(solution - 3, solution + 3, options.map(option => option.value)) });
                options.push({ id: 3, value: genAnswerValue(solution - 3, solution + 3, options.map(option => option.value)) });

                options = options.sort((a, b) => a.value - b.value);

                text = `${a} ${operand} ${b} =`;

                tags = ['násobení', 'jednociferné', 'do 100', 'tři možnosti'];

                break;
            }

            case demoIds.CAPITALS_1: {

                // TODO: Vyhodit do externího souboru? Fixtures
                const capitals = [
                    { country: 'Velká Británie', capital: 'Londýn' },
                    { country: 'Francie', capital: 'Paříž' },
                    { country: 'Německo', capital: 'Berlín' },
                    { country: 'Rakousko', capital: 'Vídeň' },
                    { country: 'Slovensko', capital: 'Bratislava' },
                    { country: 'Česká Republika', capital: 'Praha' },
                    { country: 'Polsko', capital: 'Varšava' },
                    { country: 'Itálie', capital: 'Řím' },
                    { country: 'Španělsko', capital: 'Madrid' },
                    { country: 'Švédsko', capital: 'Stockholm' },
                    { country: 'Rusko', capital: 'Moskva' },
                ];

                const capitalsAll = [
                    'Londýn', 'Paříž', 'Berlín', 'Vídeň', 'Bratislava', 'Praha', 'Varšava', 'Řím', 'Madrid', 'Stockholm', 'Moskva'
                ];

                const i = _.random(capitals.length - 1);

                pretext = 'Hlavní město: ';
                text = capitals[i].country;
                solution = capitals[i].capital;

                options = [{ id: 1, value: solution }];
                options.push({ id: 2, value: _.sample(_.without(capitalsAll, ...options.map((o) => o.value))) });
                options.push({ id: 3, value: _.sample(_.without(capitalsAll, ...options.map((o) => o.value))) });

                options = _.shuffle(options);

                tags = ['hlavní města', 'svět', 'tři možnosti'];

                break;
            }

            case demoIds.DICE_ADD_1: {
                const min = 1, max = 5;
                const a = _.random(min, max);
                const b = _.random(min, max - a + 1);

                const operand = '+';
                // Max allowed value for solution is 6 (one dice roll).
                solution = a + b;
                solutionDisplay = numberToDice(solution, 24);

                options = [{ id: 1, value: solution, displayValue: numberToDice(solution) }];

                // Incorrect answer between 1 and 6, excluding solution
                const option2 = genAnswerValue(1, 6, options.map(option => option.value));
                options.push({ id: 2, value: option2, displayValue: numberToDice(option2) });
                const option3 = genAnswerValue(1, 6, options.map(option => option.value));
                options.push({ id: 3, value: option3, displayValue: numberToDice(option3) });

                options = options.sort((a, b) => a.value - b.value);

                // text center alligned vertically
                text = <div className='d-flex justify-content-center align-items-center'>
                    <div>{numberToDice(a)}</div>
                    <div className='mb-6'>{operand}</div>
                    <div>{numberToDice(b)}</div>
                </div>;

                tags = ['sčítání', 'jednociferné', 'kostky', 'tři možnosti'];

                break;
            }

            case demoIds.DICE_LARGER_1: {
                // No dice icons in question.
                // Only two dice icons in options.
                // The larger number is the correct answer.
                const min = 1, max = 6;
                const a = _.random(min, max);
                // Number between 1 and 6, excluding a
                const b = genAnswerValue(1, 6, [a]);

                // Max allowed value for solution is 6 (one dice roll).
                solution = a > b ? a : b;
                solutionDisplay = numberToDice(solution, 24);

                options = [
                    { id: 1, value: a, displayValue: numberToDice(a) },
                    { id: 2, value: b, displayValue: numberToDice(b) },
                ];

                // text center alligned vertically
                text = <div className='d-flex justify-content-center align-items-center'>
                    Které číslo je větší?
                </div>;

                tags = ['jednociferné', 'kostky', 'dvě možnosti'];

                break;
            }

            case demoIds.LARGER_1: {
                // No number icons in question.
                // Only two numbers in options.
                // The larger number is the correct answer.
                const min = 1, max = 10;
                const a = _.random(min, max);
                // Number between 1 and 10, excluding a
                const b = genAnswerValue(min, max, [a]);

                // Max allowed value for solution is 6 (one dice roll).
                solution = a > b ? a : b;
                solutionDisplay = solution;

                options = [
                    { id: 1, value: a, displayValue: a },
                    { id: 2, value: b, displayValue: b },
                ];

                // text center alligned vertically
                text = <div className='d-flex justify-content-center align-items-center'>
                    Které číslo je větší?
                </div>;

                tags = ['do deseti', 'dvě možnosti'];

                break;
            }

            case demoIds.WORDS_1: {
                const words = [
                    { word: 'MAMA', emoji: '👱‍♀️' },
                    { word: 'TATA', emoji: '👨‍💻' },
                    { word: 'JIRKA', emoji: '👦' },
                    { word: 'HONZA', emoji: '👶' },
                    { word: 'AUTO', emoji: '🚗' },
                    { word: 'DORT', emoji: '🎂' },
                    { word: 'DRAK', emoji: '🐉' },
                    { word: 'HRAD', emoji: '🏰' },
                    { word: 'KOLO', emoji: '🚲' },
                    { word: 'KOST', emoji: '🦴' },
                    { word: 'KOZA', emoji: '🐐' },
                    { word: 'RUKA', emoji: '🤚' },
                    { word: 'RYBA', emoji: '🐟' },
                    { word: 'BOMBA', emoji: '💣' },
                ];

                const i = _.random(words.length - 1);
                const word = words[i].word;

                pretext = words[i].emoji;
                text = word;
                solution = null;

                // letters of the word
                options = word.split('').map((letter, i) => ({ id: i + 1, value: letter }));
                options = _.shuffle(options);
                // repeat if it results in the same word
                while (options.map(o => o.value).join('') === word) {
                    options = _.shuffle(options);
                }

                // steps array [{solution: 'a'}
                steps = word.split('').map((letter) => ({ solution: letter }));
                
                tags = ['slova', 'tři možnosti'];

                break;
            }

            case demoIds.PATTERNS_1: {

                ({ text, solution, options } = setQuestionsPatterns(text, solution, options));

                break;
            }

            case demoIds.TV_1: {
                ({ text, options, solution } = setQuestionsTv(text, options, solution));

                break;
            }

            case demoIds.CHESS_1: {
                const whitePieces = ['♙', '♘', '♗', '♖', '♕', '♔'];
                /** 3 white pieces without king */
                const piecesToTake = whitePieces.slice(0, whitePieces.length - 1).sort(() => Math.random() - 0.5).slice(0, 3);
                /** Random black piece to place on e4 */
                const myPiece = _.sample(['♟', '♞', '♝', '♜', '♛', '♚']);

                // Calculate all possible moves that capture a black piece for my piece based on its type.
                // If there is a piece on the target square, it is a possible move.
                const possibleTakeMoves = [];
                switch (myPiece) {
                    case '♟': {

                        // Pawn
                        // 1 square diagonally forward
                        possibleTakeMoves.push('d5', 'f5');
                        break;
                    }
                    case '♞': {
                        // Knight
                        // 2 squares horizontally or vertically and 1 square vertically or horizontally
                        possibleTakeMoves.push('d2', 'f2', 'c3', 'c5', 'g3', 'g5', 'd6', 'f6');
                        break;
                    }
                    case '♝': {
                        // Bishop
                        // Any number of squares diagonally from e4 on empty board.
                        possibleTakeMoves.push('a8','b7','c6','d5','f3','g2','h1','f5','g6','h7','d3','c2','b1');
                        break;
                    }
                    case '♜': {
                        // Rook
                        // Any number of squares horizontally or vertically from e4 on empty board.
                        possibleTakeMoves.push('e8','e7','e6','e5','e3','e2','e1','a4','b4','c4','d4','f4','g4','h4');
                        break;
                    }
                    case '♛': {
                        // Queen
                        // Any number of squares horizontally, vertically or diagonally from e4 on empty board.
                        possibleTakeMoves.push('a8', 'b7', 'c6', 'd5', 'f3', 'g2', 'h1');
                        possibleTakeMoves.push('f5','g6','h7','d3','c2','b1');
                        possibleTakeMoves.push('e8','e7','e6','e5','e3','e2','e1');
                        possibleTakeMoves.push('a4', 'b4', 'c4', 'd4', 'f4', 'g4', 'h4');
                        break;
                    }
                    case '♚': {
                        // King
                        // 1 square horizontally, vertically or diagonally from e4 on empty board.
                        possibleTakeMoves.push('d5','f5','d3','f3','e5','e3','d4','f4');
                        break;
                    }
                    default:
                        throw new Error('Unknown piece');
                }

                // 
                solution = _.sample(possibleTakeMoves);
                solutionDisplay = piecesToTake[0];
                // Place first white piece where it can be taken.
                options = [{ id: 1, value: solution, displayValue: solutionDisplay }];
                // Place other white pieces on random squares where it can't be taken.

                const allPositions = [
                    'a8','b8','c8','d8','e8','f8','g8','h8',
                    'a7','b7','c7','d7','e7','f7','g7','h7',
                    'a6','b6','c6','d6','e6','f6','g6','h6',
                    'a5','b5','c5','d5','e5','f5','g5','h5',
                    'a4','b4','c4','d4','e4','f4','g4','h4',
                    'a3','b3','c3','d3','e3','f3','g3','h3',
                    'a2','b2','c2','d2','e2','f2','g2','h2',
                    'a1','b1','c1','d1','e1','f1','g1','h1'
                ];
                /** Random position on chessboard where it cant be taken. */
                const option2Position = _.sample(_.without(allPositions, solution, ...possibleTakeMoves, 'e4'));
                const option2Piece = piecesToTake[1];
                options.push({ id: 2, value: option2Position, displayValue: option2Piece });

                const option3Position = _.sample(_.without(allPositions, solution, ...possibleTakeMoves, option2Position, 'e4'));
                const option3Piece = piecesToTake[2];
                options.push({ id: 3, value: option3Position, displayValue: option3Piece });

                // shuffle options
                options = _.shuffle(options);

                /** Chessboard with the 4 pieces */
                textComponentProps = {
                    pieces: [
                        { square: 'e4', piece: myPiece },
                        { square: solution, piece: solutionDisplay },
                        { square: option2Position, piece: option2Piece },
                        { square: option3Position, piece: option3Piece },
                    ]
                };
                textComponent = ChessBoard(textComponentProps);

                // Emoji explosion on correct answer when the move animation is finished.
                emojiDelay = 2000;
            }
        }
    }

    return {
        clickCount: 0,
        /** Number of steps in multistep question. For single step questions it is 0. */
        currentStep: 0,
        emojiDelay,
        text, pretext,
        /** React component instead of text */
        textComponent,
        /** Props for textComponent */
        textComponentProps,
        solution,
        /** Graphical representation of solution, eg. icon of a dice */
        solutionDisplay,
        state: 'new',
        steps,
        subject,
        tags,
        timeDisplayed, timeCompleted,
        options
    };
}

const genAnswerValue = (min, max, excludedValues = []) => {
    let rand = null;  //an integer
    let i = 0;
    while (rand === null || excludedValues.includes(rand) || rand < 1) {
        rand = _.random(min, max);
        i++;
        if (i > 1000) throw new Error('Cannot generate random answer');
    }

    return rand;
};

/**
 * Returns result of the question.
 * @param {object} question Question object
 * @param {number} [index] Index of the option selected by user. Avaliable only for single step questions.
 * @param {stringobject} [optionValue] Option value avaliable only for multistep questions.
 * @returns {object} { ok: boolean, text: string }
 */
export const getResult = (question, { index, optionValue } = {}) => {
    let ok = false;
    let text = 'Nehodnoceno';
    let correctAnswer = null;

    if (typeof index !== 'number') index = question.currentStep;

    if (optionValue) {
        correctAnswer = question.steps?.[index]?.solution;
        if (question.steps?.[index]?.solution === optionValue) {
            ok = true;
        }
    } else {
        correctAnswer = question.solutionDisplay || question.solution;
        if (question && question.options) {
            ok = question.options.some(option => option.selected && option.value === question.solution);
        }
    }

    if (ok) {
        text = <div>
            <b className='badge bg-success'>Výborně!</b>
            <span className='px-1'>Vaše odpověď je správně: <b>{correctAnswer}</b></span>
        </div>;
    } else {
        text = <div>
            <b className='badge bg-danger'>Chyba!</b>
            <span className='px-1'>Správná odpověď je: <b>{correctAnswer}</b></span>
        </div>;
    }

    return { ok, text };
};

const numberToDice = (number, iconSize) => {
    const size = iconSize || 64;
    switch (number) {
        case 1: return <Dice1 size={size} />;
        case 2: return <Dice2 size={size} />;
        case 3: return <Dice3 size={size} />;
        case 4: return <Dice4 size={size} />;
        case 5: return <Dice5 size={size} />;
        case 6: return <Dice6 size={size} />;
        default: return null;
    }
};

export const isIconDisplay = (demoId) => {
    const iconDisplays = [demoIds.DICE_ADD_1, demoIds.DICE_LARGER_1, demoIds.LARGER_1, demoIds.WORDS_1, demoIds.CHESS_1];
    return iconDisplays.includes(demoId);
};

/**
 * @param {string} demoId eg 'words-1'
 * @returns {boolean} `true` if demoId is single step (choosing single number or value), `false` if multi step (completing a word)
 */
export const isSingleStep = (demoId) => {
    const multiSteps = [demoIds.WORDS_1];
    return !multiSteps.includes(demoId);
};

export const doEmojis = ({ evt, result /*, demoId */, emojiCount, finalEmoji }) => {
    // TODO: alter emojis based on demoId
    // Add more emojis to the default set
    const emojis = defaultEmojis;
    emojis.push(
        ..._.sample([['🦖', '🦖', '🚀'], ['🦸‍♂️', '🧑‍🎤', '🚀'], ['💣', '🚀']])
    );

    if (result.ok) {
        // http://frontendfreecode.com/bootstrap-button-with-star-explosion-effect-on-click
        emojisplosion({
            emojis,
            emojiCount,
            position: () => ({
                // either cursor position or middle of the screen
                x: evt?.clientX || window.innerWidth / 2,
                // either cursor position or few pixels from the top
                y: evt?.clientY || 100,
            }),
        });
        if (finalEmoji) {
            // no emoji if it is a long text answer
            if (finalEmoji.length > 10) return;

            emojisplosion({
                emojis: [finalEmoji],
                // 1 large emoji
                emojiCount: 1,
                physics: {
                    fontSize: 256,
                },
                position: () => ({
                    // middle of the screen + 150px to the right
                    x: window.innerWidth / 2 + 150,
                    // either cursor position or few pixels from the top
                    y: evt?.clientY || 100,
                }),
            });
        }
    }
};
