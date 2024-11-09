import { ItemVariable, Action, RoomVariable } from '../../../types.js';

const items:{[key:string]:ItemVariable|RoomVariable} = {
    'living room': { type: 'room' }
};

const actions:Action[] = [ 
];

const strings = {
    'living room': 'A spacious room with plush sofas, a fireplace, and a large window offering a view of the garden. Family portraits decorate the walls.',
}

export {
    actions,
    items,
    strings,
}