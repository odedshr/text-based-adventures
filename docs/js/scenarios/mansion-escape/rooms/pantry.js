const items = {
    'pantry': { type: 'room' },
    'dog food': {
        type: 'item',
        location: 'pantry',
        canBeHeld: true
    },
};
const actions = [];
const strings = {
    pantry: 'A small room adjacent to the kitchen, lined with shelves stocked with dry goods, canned food, and kitchen supplies.',
};
export { actions, items, strings, };
