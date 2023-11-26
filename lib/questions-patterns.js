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
    let color = {};
    color.A = _.sample(colors);
    color.B = _.sample(_.without(colors, color.A));
    color.C = _.sample(_.without(colors, color.A, color.B));

    // The pattern is randomly selected from the list of patterns.
    const patterns = ['AABBCC', 'ABABAB', 'ABCABC', 'AAABBB'];
    const pattern = _.sample(patterns);
    const position = _.random(0, 5);

    text = _.range(6).map((i) => {
        if (i === position) return '❓';
        return color[pattern[i]];
    }).join('');
    solution = color[pattern[position]];

    // The options are the colors that are in the pattern.
    options = _.shuffle([
        { id: 1, value: color.A },
        { id: 2, value: color.B },
        { id: 3, value: color.C },
    ]);

    return { text, solution, options };
}
