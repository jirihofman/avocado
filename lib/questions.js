import { emojisplosion } from 'emojisplosion';
import _ from 'lodash';
import ChessBoard from '../components/chessboard';
import PatternText from '../components/patterns-1-text';
import ExplosionGrid from '../components/explosion-grid';
import { setQuestionsTv } from './questions-tv';
import { setQuestionsPatterns } from './questions-patterns';
import { karakQuestions } from './questions-karak';
import { audioCache } from './audio-cache';

export const demoIds = {
    ADD_1: 'add-1',
    ADD_2: 'add-2',
    SUBTRACT_1: 'subtract-1',
    SUBTRACT_2: 'subtract-2',
    MULTIPLY_1: 'multiply-1',
    CAPITALS_1: 'capitals-1',
    DICE_ADD_1: 'dice-add-1',
    DICE_LARGER_1: 'dice-larger-1',
    DICE_KARAK_1: 'dice-karak-1',
    /** Allowed moves for a single piece. */
    CHESS_1: 'chess-1',
    VOICE_ALPHABET_CZ_1: 'voice-alphabet-cz-1',
    LARGER_1: 'larger-1',
    LARGER_2: 'larger-2',
    LARGER_3: 'larger-3',
    NEXT_NUMBER_1: 'next-number-1',
    WORDS_1: 'words-1',
    PATTERNS_1: 'patterns-1',
    TV_1: 'tv-1',
    VYBUCHY_1: 'vybuchy-1',
};

// Audio URLs for Czech alphabet - centralized for caching
export const AUDIO_URLS = {
    A: 'https://utfs.io/f/BydazjEOdFUin9um3aoay5bQFmYj4CcJri9P8vUL13SdHgxo',
    B: 'https://utfs.io/f/BydazjEOdFUiIKxohVkXwIrlumOVnxPSf28e1Wdzh4C0D7Yi',
    C: 'https://utfs.io/f/BydazjEOdFUiw1dO5GyjmWYRp6FDeykLP4ufnjrdUacExJ3A',
    D: 'https://utfs.io/f/BydazjEOdFUiTn1zr7IC7dVXnK1lxLBqQREuYrHD504J2U8y',
    E: 'https://utfs.io/f/BydazjEOdFUiZnH5LPWkomFgfEBQWh2lj5csPA0bUa7IxV1M',
    F: 'https://utfs.io/f/BydazjEOdFUiUEkoCNhMJtuX9pWcownVBGCe065Zyi2Fm7Aa',
    G: 'https://utfs.io/f/BydazjEOdFUiqgq5xAyzSCoViD09LZPlXy1g75pmQGHEUr4N',
    H: 'https://utfs.io/f/BydazjEOdFUiTO84vKIC7dVXnK1lxLBqQREuYrHD504J2U8y',
    I: 'https://utfs.io/f/BydazjEOdFUikoIYa55u8iL9e0EZh4vz3BjSNYQ1qdU7GAmD',
    J: 'https://utfs.io/f/BydazjEOdFUiJJMEgFGYXvFn82fRlCDPx41hBHwbGO9QWgU',
    K: 'https://utfs.io/f/BydazjEOdFUiDr0GWge80AsrXvaUp1wlObQfcMCFnduZz62o',
    L: 'https://utfs.io/f/BydazjEOdFUiCKuJc2MQ2fx5h7ITtAM8qSN0Lri6RV9uczPw',
    M: 'https://utfs.io/f/BydazjEOdFUiKZu4FyLSbmHzXeIo9ta8qGKAuUL0iTlYdQ1V',
    N: 'https://utfs.io/f/BydazjEOdFUi4BtbKTsPya8Vo0DO9Q5rswJGvtIk3BbT6lH7',
    O: 'https://utfs.io/f/BydazjEOdFUi4wni2wBsPya8Vo0DO9Q5rswJGvtIk3BbT6lH',
    P: 'https://utfs.io/f/BydazjEOdFUi4wuKtpzsPya8Vo0DO9Q5rswJGvtIk3BbT6lH',
    Q: 'https://utfs.io/f/BydazjEOdFUidkQcRz4WmKVeWlQM3ifb5yOPTvUC7A8aXqI1',
    R: 'https://utfs.io/f/BydazjEOdFUiKW3hteLSbmHzXeIo9ta8qGKAuUL0iTlYdQ1V',
    S: 'https://utfs.io/f/BydazjEOdFUi8Uw1gYNOg4WnZypHlLOdvEkiF6M23mAaJq7t',
    T: 'https://utfs.io/f/BydazjEOdFUiXw9cqzgUhPVuOBcldympkStwfzMaEQKiq8Ng',
    U: 'https://utfs.io/f/BydazjEOdFUiznuf41FIqCoglDJF6krcPxN27GpAUW3OhMfb',
    V: 'https://utfs.io/f/BydazjEOdFUiJTeK4EXGYXvFn82fRlCDPx41hBHwbGO9QWgU',
    W: 'https://utfs.io/f/BydazjEOdFUiZ7jKWWkomFgfEBQWh2lj5csPA0bUa7IxV1Me',
    X: 'https://utfs.io/f/BydazjEOdFUiOLs0ojam1w53ESg7U4tYjyRrZQkNp0MXJWTs',
    Y: 'https://utfs.io/f/BydazjEOdFUi0ZrJBAFdjvNbdaLyz8SMeuistE2G7nBk65oX',
    Z: 'https://utfs.io/f/BydazjEOdFUixtxJtaDndU8kTq67QJglCSVhRDXozHO21Z4e',
};

/**
 * Preloads all Czech alphabet audio files for caching
 * Call this when the voice alphabet demo is about to be used
 */
export async function preloadVoiceAlphabetAudio() {
    try {
        const urls = Object.values(AUDIO_URLS);
        await audioCache.preloadMultiple(urls);
    } catch (error) {
        // Audio preloading failed, but the application should continue to work
        // The audio will fall back to regular loading
    }
}

export function getNewTextComponent(demoId, textComponentProps, newProps) {
    switch (demoId) {
        case demoIds.CHESS_1: {
            return <ChessBoard {...textComponentProps} {...newProps} />;
        }
        case demoIds.PATTERNS_1: {
            return <PatternText question={textComponentProps} {...newProps} />;
        }
        case demoIds.VYBUCHY_1: {
            return <ExplosionGrid {...textComponentProps} {...newProps} />;
        }
        case demoIds.VOICE_ALPHABET_CZ_1: {
            // textComponentProps is null when the question is completed to prevent from playing the audio again.
            if (!textComponentProps?.audioUrl) {
                return null;
            }
            
            // Get cached audio URL for better performance and Safari compatibility
            const cachedAudioUrl = audioCache.getCachedAudioUrl(textComponentProps.audioUrl);
            if (cachedAudioUrl) {
                return <audio controls autoPlay src={cachedAudioUrl} />;
            }
            
            // Fallback to regular audio element if not cached
            return <audio controls autoPlay src={textComponentProps.audioUrl} />;
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

            case demoIds.ADD_2: {
                const min = 1, max = 20;
                const a = _.random(min, max - 1);
                const b = _.random(min, max - a);

                const operand = '+';
                solution = a + b;

                options = [{ id: 1, value: solution }];

                options.push({ id: 2, value: genAnswerValue(solution - 3, solution + 3, options.map(option => option.value)) });
                options.push({ id: 3, value: genAnswerValue(solution - 3, solution + 3, options.map(option => option.value)) });

                options = options.sort((a, b) => a.value - b.value);

                text = `${a} ${operand} ${b} =`;

                tags = ['sčítání', 'do 20', 'tři možnosti'];

                break;
            }

            case demoIds.SUBTRACT_1: {
                const min = 1, max = 10;
                // Generate a such that it's at least 2 to allow for subtraction with result > 0
                const a = _.random(2, max);
                // Generate b such that result is > 0 (b must be less than a)
                const b = _.random(min, a - 1);

                const operand = '-';
                solution = a - b;

                options = [{ id: 1, value: solution }];

                options.push({ id: 2, value: genAnswerValue(1, max, options.map(option => option.value)) });
                options.push({ id: 3, value: genAnswerValue(1, max, options.map(option => option.value)) });

                options = options.sort((a, b) => a.value - b.value);

                text = `${a} ${operand} ${b} =`;

                tags = ['odčítání', 'do 10', 'tři možnosti'];

                break;
            }

            case demoIds.SUBTRACT_2: {
                const min = 1, max = 20;
                // Generate a such that it's at least 10 and at most 20
                const a = _.random(10, max);
                // Generate b such that result is > 0 (b must be less than a)
                const b = _.random(min, a - 1);

                const operand = '-';
                solution = a - b;

                options = [{ id: 1, value: solution }];

                options.push({ id: 2, value: genAnswerValue(1, max, options.map(option => option.value)) });
                options.push({ id: 3, value: genAnswerValue(1, max, options.map(option => option.value)) });

                options = options.sort((a, b) => a.value - b.value);

                text = `${a} ${operand} ${b} =`;

                tags = ['odčítání', 'do 20', 'tři možnosti'];

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

            case demoIds.LARGER_2: {
                // No number icons in question.
                // Only two numbers in options.
                // The larger number is the correct answer.
                const min = 1, max = 20;
                const a = _.random(min, max);
                // Number between 1 and 20, excluding a
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

                tags = ['do dvaceti', 'dvě možnosti'];

                break;
            }

            case demoIds.LARGER_3: {
                // No number icons in question.
                // Only two numbers in options.
                // The larger number is the correct answer.
                const min = 1, max = 100;
                const a = _.random(min, max);
                // Number between 1 and 100, excluding a
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

                tags = ['do sta', 'dvě možnosti'];

                break;
            }

            case demoIds.NEXT_NUMBER_1: {
                const min = 10, max = 19;
                const a = _.random(min, max);

                solution = a + 1;
                solutionDisplay = solution;

                options = [{ id: 1, value: solution }];
                options.push(
                    // Random number between 10 and 20, excluding solution
                    { id: 2, value: genAnswerValue(min, max + 1, [solution]) }
                );
                options.push(
                    // Random number between 10 and 20, excluding solution
                    { id: 3, value: genAnswerValue(min, max + 1, [solution, options[1].value]) }
                );

                options = options.sort((a, b) => a.value - b.value);

                text = <div style={{ fontSize: '14px' }}>
                    Následující číslo po <span style={{ fontSize: '30px', fontWeight: 'bold' }}>{a}</span> je
                </div>;
                    
                tags = ['následující číslo', 'do dvaceti', 'tři možnosti'];

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

                ({ text, solution, solutionDisplay, options } = setQuestionsPatterns(text, solution, options));
                textComponent = PatternText({ question: { text, solution, solutionDisplay, options }, result: undefined });

                break;
            }

            case demoIds.DICE_KARAK_1: {

                ({ text, options, solution } = karakQuestions({ demoId, subject }));

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

                break;
            }

            case demoIds.VOICE_ALPHABET_CZ_1: {

                const letters = Object.keys(AUDIO_URLS);
                const correctLetter = _.sample(letters);
                const audioUrl = AUDIO_URLS[correctLetter];

                options = [{ id: correctLetter, value: correctLetter }].concat(
                    letters
                        .filter(letter => letter !== correctLetter)
                        .map((letter) => ({ id: letter, value: letter }))
                ).slice(0, 3);
                // Only 3 options, one of them is the correct letter.
                options = _.shuffle(options);

                // Get cached audio URL for better performance and Safari compatibility
                const cachedAudioUrl = audioCache.getCachedAudioUrl(audioUrl);
                if (cachedAudioUrl) {
                    textComponent = <div>
                        <audio controls autoPlay src={cachedAudioUrl} />
                    </div>;
                } else {
                    // Fallback to regular audio element if not cached
                    textComponent = <div>
                        <audio controls autoPlay src={audioUrl} />
                    </div>;
                }
                
                textComponentProps = { audioUrl };

                solution = correctLetter;

                break;
            }

            case demoIds.VYBUCHY_1: {
                // Explosions game - no correct answer, just explosions
                text = 'Klikni na libovolné emoji pro výbuch!';
                
                // No solution as this is just for fun explosions
                solution = null;
                
                // No options since there's no correct answer
                options = [];
                
                // Custom component for the 3x3 grid with regeneration key
                const regenerateKey = Date.now(); // Unique key to force grid regeneration
                textComponent = <ExplosionGrid regenerateKey={regenerateKey} />;
                textComponentProps = { regenerateKey };
                
                tags = ['výbuchy', 'emoji', 'zábava'];

                break;
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
    const fontSize = size + 'px';
    const diceEmoji = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
    
    if (number >= 1 && number <= 6) {
        return <span style={{ fontSize }}>{diceEmoji[number - 1]}</span>;
    }
    return null;
};

export const isIconDisplay = (demoId) => {
    const iconDisplays = [demoIds.DICE_ADD_1, demoIds.DICE_LARGER_1, demoIds.LARGER_1, demoIds.LARGER_2, demoIds.LARGER_3, demoIds.NEXT_NUMBER_1, demoIds.WORDS_1, demoIds.CHESS_1, demoIds.PATTERNS_1, demoIds.VYBUCHY_1];
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

    // "Jenom bomby!"
    const emojis = ['💣', '🚀'];

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
            // no emoji if it is an object (eg. chessboard or dice)
            if (typeof finalEmoji === 'object') return;

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
