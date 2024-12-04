import { ItemVariable, Action, RoomVariable, PassageVariable } from '../../../types.js';

const items:{[key:string]: ItemVariable|RoomVariable|PassageVariable } = {
    'bathroom': { type: 'room' },
    'washroom entry': {
        type: 'passage',
        between: ['hallway', 'bathroom'],
        allowedStates: ['opened'],
        state: 'opened',
    },
};

const actions:Action[] = [ 
];

const strings = {
    bathroom: 'A shared bathroom with a tiled floor, a large mirror, and a simple but elegant bathtub and shower. Basic toiletries are neatly arranged on the counter-top.',
    'washroom entry': 'A frosted glass door, providing privacy while still letting light through. It swings gently, revealing the shared bathroom beyond.',
}

export {
    actions,
    items,
    strings,
}