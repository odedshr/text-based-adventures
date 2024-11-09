const items = {
    'master bedroom': { type: 'room' },
    'lavish door': {
        type: 'passage',
        between: ['hallway', 'master bedroom'],
        allowedStates: ['opened', 'closed'],
        state: 'closed',
        synonyms: ['door']
    },
};
const actions = [
// master bedroom
//5 - unlock drawer
// /\b(?:unlock|open|release)\s*(?:the\s*)?([\w\s]+)\s*(?:with|using)\s*(?:the\s*)?([\w\s]+)\b/i
//7 - find passage to secret room
// /\b(?:look\s*for|search\s*for|find|locate)\s*(?:the\s*)?([\w\s]+)\b/i
//6 - get security badge for security room from drawer
];
const strings = {
    'master bedroom': 'A luxurious bedroom with a king-sized bed, ornate wooden furniture, a walk-in closet, and a grand view of the estate grounds.'
};
export { actions, items, strings, };
