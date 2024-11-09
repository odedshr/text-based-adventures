const items = {
    'toilet': { type: 'room' },
    'water valve': {
        type: 'item',
        location: 'tap',
        canBeHeld: true,
        synonyms: ['valve', 'red water valve', 'water valve']
    },
    'cistern': {
        type: 'item',
        location: 'toilet room',
    },
    'sink': {
        type: 'item',
        location: 'toilet room',
    },
    'tap': {
        type: 'item',
        location: 'toilet room',
        canContain: 'water valve',
        state: 'turned-off',
        synonyms: ['faucet', 'water tap']
    }
};
const actions = [];
const strings = {
    'toilet': 'The toilet room is small and functional. The sink is clean and well-maintained, and the tap is turned off.',
};
export { actions, items, strings, };
