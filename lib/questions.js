import _ from 'lodash';
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6 } from 'react-bootstrap-icons';

export function generateDemoQuestion({ demoId, subject }) {

    let options = [], pretext, solution, solutionDisplay, tags = [], text, timeDisplayed, timeCompleted;

    // DEMO questions
    if (demoId) {
        switch (demoId) {
            case 'add-1': {
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

            case 'multiply-1': {
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

            case 'capitals-1': {

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

            case 'dice-add-1': {
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

            case 'dice-larger-1': {
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

            default:
                break;
        }
    }

    return {
        clickCount: 0,
        text, pretext,
        solution,
        /** Graphical representation of solution, eg. icon of a dice */
        solutionDisplay,
        state: 'new',
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

export const getResult = (question) => {
    let ok = false;
    let text = 'Nehodnoceno';

    if (question && question.options) {
        ok = question.options.some(option => option.selected && option.value === question.solution);
    }

    if (ok) {
        text = <div>
            <b className='badge bg-success'>Výborně!</b>
            <span className='px-1'>Vaše odpověď je správně: <b>{question.solutionDisplay || question.solution}</b></span>
        </div>;
    } else {
        text = <div>
            <b className='badge bg-danger'>Chyba!</b>
            <span className='px-1'>Správná odpověď je: <b>{question.solutionDisplay || question.solution}</b></span>
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
    const iconDisplays = ['dice-add-1', 'dice-larger-1'];
    return iconDisplays.includes(demoId);
};
