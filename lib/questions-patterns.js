import _ from 'lodash';

export function setQuestionsPatterns(text, solution, options) {
    // Question is a pattern of 6 circle emojis.
    // Available patterns are:
    // - AABBCC
    // - ABABAB
    // - ABCABC
    // - AAABBB

    // The colors are randomly selected from the list of colors.
    const colors = ['🔴', '🟠', '🟡', '🟢', '🔵', '🟣', '🟤', '⚫', '⚪'];
    const items = ['🗡️', '🛡️', '🐉'];
    const transport = ['🚗', '🛳️', '🛩️'];
    const things = _.sample([colors, items, transport]);
    let thing = {};
    thing.A = _.sample(things);
    thing.B = _.sample(_.without(things, thing.A));
    thing.C = _.sample(_.without(things, thing.A, thing.B));

    // The pattern is randomly selected from the list of patterns.
    const patterns = ['AABBCC', 'ABABAB', 'ABCABC', 'AAABBB'];
    const pattern = _.sample(patterns);
    const position = _.random(0, 5);

    text = _.range(6).map((i) => {
        if (i === position) return '❓';
        return thing[pattern[i]];
    }).join('');
    solution = thing[pattern[position]];

    // The options are the colors that are in the pattern.
    options = _.shuffle([
        { id: 1, value: thing.A },
        { id: 2, value: thing.B },
        { id: 3, value: thing.C },
    ]);

    return { text, solution, options };
}
