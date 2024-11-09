import { Action, ItemVariable, RoomVariable } from '../../../types';

const items:{ [key:string]: ItemVariable|RoomVariable } = {
    'dining room': { type: 'room' },
    'dog food bowl': {
        type: 'item',
        location: 'dining room',
        canBeHeld: true,
        synonyms: ['dog food bowl', 'bowl', 'bowl of dog food']
    }
};

const actions:Action[] = [];

const strings = {
    'dining room': 'A formal dining room with a long table, elegant chandeliers, and a sideboard for serving. Fine china and silverware are neatly arranged for guests.',
};

export {
    actions,
    items,
    strings,
}