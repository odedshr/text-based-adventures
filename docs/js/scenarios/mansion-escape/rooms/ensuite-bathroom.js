const items = {
    'ensuite bathroom': { type: 'room' },
    'cabinet': {
        type: 'item',
        location: 'ensuite bathroom',
        canContain: 'sleeping pills',
        state: 'closed',
        synonyms: ['cabinet', 'medicine cabinet']
    },
    'sleeping pills': {
        type: 'item',
        location: 'cabinet',
        canBeHeld: true,
        synonyms: ['sleeping pills', 'sleeping pill', 'pill', 'pills']
    }
};
const actions = [];
const strings = {
    'ensuite bathroom': 'A private bathroom with marble countertops, a clawfoot tub, a separate shower, and elegant fixtures. Towels hang neatly on heated racks.',
};
export { actions, items, strings, };
