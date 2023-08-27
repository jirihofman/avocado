import { emojisplosion, defaultEmojis } from 'emojisplosion';
import _ from 'lodash';
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6 } from 'react-bootstrap-icons';
import ChessBoard from '../components/chessboard';

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
    TV_1: 'tv-1',
};

export function generateDemoQuestion({ demoId, subject }) {

    let options = [], pretext, solution, solutionDisplay, steps = [], tags = [], text, timeDisplayed, timeCompleted;

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

            case demoIds.TV_1: {
                const all = {
                    questions: [
                        {
                            question: 'What is the full name of the main characters, the Winchester brothers?',
                            correctAnswer: 'Samuel Winchester and Dean Winchester',
                            incorrectAnswers: [
                                'Michael Winchester and John Winchester',
                                'Jared Winchester and Jensen Winchester'
                            ]
                        },
                        {
                            question: "How did Sam and Dean Winchester's mother, Mary, die?",
                            correctAnswer: 'She died in a house fire caused by the demon Azazel',
                            incorrectAnswers: [
                                'She was killed by a vampire',
                                'She died in a car accident'
                            ]
                        },
                        {
                            question: 'What is the name of the angel who becomes a close ally to the Winchesters?',
                            correctAnswer: 'Castiel',
                            incorrectAnswers: [
                                'Raphael',
                                'Gabriel'
                            ]
                        },
                        {
                            question: 'What is the name of the demon who becomes a recurring antagonist throughout the series?',
                            correctAnswer: 'Crowley',
                            incorrectAnswers: [
                                'Azazel',
                                'Abaddon'
                            ]
                        },
                        {
                            question: 'Which song is frequently played by the Winchester brothers in their car, the Impala?',
                            correctAnswer: '"Carry On Wayward Son" by Kansas',
                            incorrectAnswers: [
                                '"Highway to Hell" by AC/DC',
                                '"Wanted Dead or Alive" by Bon Jovi'
                            ]
                        },
                        {
                            question: 'What is the name of the demon-killing knife that can permanently kill demons?',
                            correctAnswer: "Ruby's Knife",
                            incorrectAnswers: [
                                "Lucifer's Blade",
                                'Demon Slayer Dagger'
                            ]
                        },
                        {
                            question: "Which archangel is responsible for breaking Sam Winchester's wall in his mind?",
                            correctAnswer: 'Lucifer',
                            incorrectAnswers: [
                                'Michael',
                                'Gabriel'
                            ]
                        },
                        {
                            question: 'What is the name of the ancient organization that hunts supernatural creatures?',
                            correctAnswer: 'Men of Letters',
                            incorrectAnswers: [
                                'The Order of the Phoenix',
                                'The Night Stalkers'
                            ]
                        },
                        {
                            question: "What are the names of Sam and Dean Winchester's respective vehicles?",
                            correctAnswer: "Sam's vehicle is a black 1967 Chevy Impala, and Dean's vehicle is a 1967 Chevy Impala",
                            incorrectAnswers: [
                                "Sam's vehicle is a Dodge Charger, and Dean's vehicle is a Ford Mustang",
                                "Sam's vehicle is a motorcycle, and Dean's vehicle is a pickup truck"
                            ]
                        },
                        {
                            question: 'What is the name of the town where Sam and Dean were born and raised?',
                            correctAnswer: 'Lawrence, Kansas',
                            incorrectAnswers: [
                                'Mystic Falls',
                                'Sunnydale'
                            ]
                        },
                        {
                            question: 'Which season of Supernatural introduced the character of Crowley?',
                            correctAnswer: 'Season 5',
                            incorrectAnswers: [
                                'Season 2',
                                'Season 7'
                            ]
                        },
                        {
                            question: 'What is the name of the powerful family of witches who serve as recurring antagonists?',
                            correctAnswer: 'The Styne Family',
                            incorrectAnswers: [
                                'The Coven of Shadows',
                                'The Blackwood Witches'
                            ]
                        },
                        {
                            question: 'Which creature is responsible for the death of Sam Winchester in Season 2?',
                            correctAnswer: 'A Hellhound',
                            incorrectAnswers: [
                                'A Wendigo',
                                'A Shapeshifter'
                            ]
                        },
                        {
                            question: 'What is the name of the parallel universe introduced in Season 6?',
                            correctAnswer: 'The Apocalypse World',
                            incorrectAnswers: [
                                'The Dark Dimension',
                                'The Nether Realm'
                            ]
                        },
                        {
                            question: "Who is the King of Hell after Crowley's death?",
                            correctAnswer: 'Asmodeus',
                            incorrectAnswers: [
                                'Azazel',
                                'Belphegor'
                            ]
                        },
                        {
                            question: 'Which archangel is known as the Trickster and frequently takes on the form of pagan gods?',
                            correctAnswer: 'Gabriel',
                            incorrectAnswers: [
                                'Michael',
                                'Raphael'
                            ]
                        },
                        {
                            question: 'What is the name of the angel who becomes the vessel for the fallen archangel Lucifer?',
                            correctAnswer: 'Nick',
                            incorrectAnswers: [
                                'Adam',
                                'Kevin'
                            ]
                        },
                        {
                            question: 'Which biblical artifact is said to be capable of killing the Darkness?',
                            correctAnswer: 'The Staff of Moses',
                            incorrectAnswers: [
                                'The Holy Grail',
                                'The Spear of Destiny'
                            ]
                        },
                        {
                            question: 'What is the name of the vampire who becomes an ally to the Winchesters?',
                            correctAnswer: 'Benny Lafitte',
                            incorrectAnswers: [
                                'Lucas Barr',
                                'Victor Henriksen'
                            ]
                        },
                        {
                            question: 'What is the name of the angel who leads the Heavenly Host during the Apocalypse?',
                            correctAnswer: 'Michael',
                            incorrectAnswers: [
                                'Castiel',
                                'Uriel'
                            ]
                        }
                    ]
                };

                const i = _.random(all.questions.length - 1);
                const question = all.questions[i];
                solution = question.correctAnswer;
                options = question.incorrectAnswers.map((answer, i) => ({ id: i + 1, value: answer }));
                // Add correct answer to options
                options.push({ id: options.length + 1, value: solution });
                options = _.shuffle(options);

                text = question.question;

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
                text = ChessBoard({
                    pieces: [
                        { square: 'e4', piece: myPiece },
                        { square: solution, piece: solutionDisplay },
                        { square: option2Position, piece: option2Piece },
                        { square: option3Position, piece: option3Piece },
                    ]
                });

                // TODO: animate the move on chessboard when clicked the right answer.
            }
        }
    }

    return {
        clickCount: 0,
        /** Number of steps in multistep question. For single step questions it is 0. */
        currentStep: 0,
        text, pretext,
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
