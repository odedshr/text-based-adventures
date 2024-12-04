const items = {
    'living room': { type: 'room' },
    'parlor door': {
        type: 'passage',
        between: ['foyer', 'living room'],
        allowedStates: ['opened'],
        state: 'opened',
    },
};
const actions = [];
const strings = {
    'living room': 'A spacious room with plush sofas, a fireplace, and a large window offering a view of the garden. Family portraits decorate the walls.',
    'parlor door': 'A pair of heavy oak doors with intricate carvings of vines and flowers. They swing open easily, revealing the warm and inviting living room beyond.',
};
export { actions, items, strings, };
