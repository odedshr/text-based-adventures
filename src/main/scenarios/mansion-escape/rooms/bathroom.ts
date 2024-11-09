import { ItemVariable, Action, RoomVariable } from '../../../types.js';

const items:{[key:string]:ItemVariable|RoomVariable} = {
    'bathroom': { type: 'room' },
};

const actions:Action[] = [ 
];

const strings = {
    bathroom: 'A shared bathroom with a tiled floor, a large mirror, and a simple but elegant bathtub and shower. Basic toiletries are neatly arranged on the counter-top.',
}

export {
    actions,
    items,
    strings,
}