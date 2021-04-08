import _ from 'lodash'

export function generateDemoQuestion({ demoId, subject }) {
  // TODO async?

  let options = [], pretext, solution, tags = [], text, title;

  // DEMO questions
  if (demoId) {
    switch (demoId) {
      case 'add-1': {
        title = 'Sčítání jednociferných čísel'
        const min = 1, max = 9
        const a = _.random(min, max)
        const b = _.random(min, max)

        const operand = '+';
        solution = a + b;

        options = [{ id: 1, value: solution }]

        options.push({ id: 2, value: genAnswerValue(solution - 3, solution + 3, options.map(option => option.value)) })
        options.push({ id: 3, value: genAnswerValue(solution - 3, solution + 3, options.map(option => option.value)) })

        options = options.sort((a, b) => a.value - b.value)

        text = `${a} ${operand} ${b} =`;

        break;
      }

      case 'multiply-1': {
        title = 'Malá násobilka'
        const min = 1, max = 9
        const a = _.random(min, max)
        const b = _.random(min, max)

        const operand = '*';
        solution = a * b;

        options = [{ id: 1, value: solution }]

        options.push({ id: 2, value: genAnswerValue(solution - 3, solution + 3, options.map(option => option.value)) })
        options.push({ id: 3, value: genAnswerValue(solution - 3, solution + 3, options.map(option => option.value)) })

        options = options.sort((a, b) => a.value - b.value)

        text = `${a} ${operand} ${b} =`;

        break;
      }

      case 'capitals-1': {
        title = 'Hlavní města'

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
        ]

        const i = _.random(capitals.length-1);

        pretext = 'Hlavní město: '
        text = capitals[i].country
        solution = capitals[i].capital

        options = [{ id: 1, value: solution }]
        options.push({ id: 2, value: _.sample(_.without(capitalsAll, ...options.map((o) => o.value))) })
        options.push({ id: 3, value: _.sample(_.without(capitalsAll, ...options.map((o) => o.value))) })

        options = _.shuffle(options)

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
    subject,
    tags,
    options
  }
}

const genAnswerValue = (min, max, excludedValues = []) => {
  let rand = null;  //an integer
  let i = 0
  while (rand === null || excludedValues.includes(rand) || rand < 1) {
    rand = _.random(min, max)
    i++
    if (i > 1000) throw new Error('Cannot generate random answer')
  }

  return rand
}

export const getResult = (question) => {
  let ok = false;
  let text = 'Nehodnoceno'

  if (question && question.options) {
    ok = question.options.some(option => option.selected && option.value === question.solution)
  }

  if (ok) {
    text = 'Výborně! Vaše odpověď je správně: ' + question.solution
  } else {
    text = 'Chyba. Správná odpověď je ' + question.solution
  }

  return { ok, text };
}
