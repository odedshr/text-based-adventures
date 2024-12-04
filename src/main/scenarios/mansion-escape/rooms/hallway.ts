import { ItemVariable, Action, RoomVariable, PassageVariable } from '../../../types.js';

const items:{[key:string]: ItemVariable|RoomVariable|PassageVariable } = {
    'hallway': { type: 'room' }
};

const actions:Action[] = [
];

const strings = {
    hallway: 'A long corridor lined with portraits and elegant sconces. The soft carpet muffles footsteps, and several doors lead off into other rooms.',
}

export {
    actions,
    items,
    strings,
}