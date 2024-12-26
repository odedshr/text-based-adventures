import { ItemVariable, PuzzlePiece, Variables } from '../../../types';

const diningRoom:PuzzlePiece = {
    variables: {
        'dining room': { type: 'room' },
        'dining entrance': {
            type: 'passage',
            in: 'dining room',
            out: 'foyer',
            allowedStates: ['opened'],
            state: 'opened',
        },
        'dog food bowl': {
            type: 'item',
            location: 'dining room',
            canBeHeld: true,
            synonyms: ['dog bowl', 'bowl', 'bowl of dog food']
        }
    },
    actions: [],
    strings: {
        'dining room': (variables:Variables) => `A formal dining room with a long table, elegant chandeliers, and a sideboard for serving.
        Fine china and silverware are neatly arranged for guests.${(variables['dog food bowl'] as ItemVariable).location === 'dining room' ? ' A dog food bowl sits on the floor.' : ''}`,
        'dining entrance': 'Tall double doors with brass handles, polished to a shine.',
        'dog food bowl': 'A standard silver food bowl with the label "Fifi" engraved on its side.'
    }
}

export default diningRoom;