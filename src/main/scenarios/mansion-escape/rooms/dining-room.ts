import { Action, ItemVariable, PassageVariable, RoomVariable } from '../../../types';

const items:{ [key:string]: ItemVariable|RoomVariable|PassageVariable } = {
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

const actions:Action[] = [];

const strings = {
    'dining room': 'A formal dining room with a long table, elegant chandeliers, and a sideboard for serving. Fine china and silverware are neatly arranged for guests.',
    'dining entrance': 'Tall double doors with brass handles, polished to a shine. The scent of food often drifts from behind them when the dining room is in use, hinting at the feast beyond.',
};

export {
    actions,
    items,
    strings,
}