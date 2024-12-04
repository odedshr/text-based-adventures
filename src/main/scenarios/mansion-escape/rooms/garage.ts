import { Action, ItemVariable, PassageVariable, RoomVariable } from '../../../types';

const items:{ [key:string]: ItemVariable|RoomVariable|PassageVariable } = {
    'garage': { type: 'room' },
    'stone path arch': {
        type: 'passage',
        between: ['backyard', 'garage'],
        allowedStates: ['opened'],
        state: 'opened',
    },
    'workshop hatch': {
        type: 'passage',
        between: ['garage', 'basement'],
        allowedStates: ['locked', 'closed', 'opened'],
        state: 'locked',
    },
    'house keys': {
        type: 'item',
        location: 'garage',
        canBeHeld: true,
        synonyms: ['keys', 'key', 'house key']
    },

    'garage door': {
        type: 'item',
        location: 'garage',
    }
};

const actions:Action[] = [];

const strings = {
    garage: 'A large space with room for several cars, tools hanging neatly on the walls, and shelves filled with spare parts and car cleaning supplies.',
};

export {
    actions,
    items,
    strings,
}