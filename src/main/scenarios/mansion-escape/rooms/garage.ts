import { Action, ItemVariable, PassageVariable, RoomVariable } from '../../../types';

const items:{ [key:string]: ItemVariable|RoomVariable|PassageVariable } = {
    'garage': { type: 'room' },
    'wooden door': {
        type: 'passage',
        between: ['backyard', 'garage'],
        allowedStates: ['opened'],
        state: 'opened',
    },
    // 'workshop hatch': {
    //     type: 'passage',
    //     between: ['garage', 'basement'],
    //     allowedStates: ['locked', 'closed', 'opened'],
    //     state: 'locked',
    // },
    // 'house keys': {
    //     type: 'item',
    //     location: 'garage',
    //     canBeHeld: true,
    //     synonyms: ['keys', 'key', 'house key']
    // },

    'garage door': {
        type: 'item',
        location: 'garage',
    }
};

const actions:Action[] = [];

const strings = {
    garage: 'A large space with room for several cars, tools hanging neatly on the walls, and shelves filled with spare parts and car cleaning supplies.',
    'wooden door': `The door leads to a smaller building, separated from the mansion.`,
    'garage door': `The garage door is closed. You'd probably need a remote to open it and the remote is probably in the car, which isn't here.`
    // 'workshop hatch': `A hatch on the floor, but it's locked.`,
    // 'house keys': `It's a set of door keys. This looks useful.`
};

export {
    actions,
    items,
    strings,
}