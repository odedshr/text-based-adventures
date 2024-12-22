const items = {
    'dining room': { type: 'room' },
    'dining entrance': {
        type: 'passage',
        between: ['foyer', 'dining room'],
        allowedStates: ['opened'],
        state: 'opened',
    },
    'dog food bowl': {
        type: 'item',
        location: 'dining room',
        canBeHeld: true,
        synonyms: ['dog bowl', 'bowl', 'bowl of dog food']
    }
};
const actions = [];
const strings = {
    'dining room': (variables) => `A formal dining room with a long table, elegant chandeliers, and a sideboard for serving.
    Fine china and silverware are neatly arranged for guests.${variables['dog food bowl'].location === 'dining room' ? ' A dog food bowl sits on the floor.' : ''}`,
    'dining entrance': 'Tall double doors with brass handles, polished to a shine.',
    'dog food bowl': 'A standard silver food bowl with the label "Fifi" engraved on its side.'
};
export { actions, items, strings, };
