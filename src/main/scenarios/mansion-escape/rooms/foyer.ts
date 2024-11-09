import { ItemVariable, Action, RoomVariable } from '../../../types.js';

const items:{[key:string]:ItemVariable|RoomVariable} = {
    'foyer': { type: 'room' }
};

const actions:Action[] = [ 
];

const strings = {
    foyer: 'The grand entrance to the mansion with a sweeping staircase, a chandelier, and a large rug. A coat stand and an umbrella holder are by the door.',
}

export {
    actions,
    items,
    strings,
}