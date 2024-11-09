import { Action, ItemVariable, RoomVariable } from '../../../types';

const items:{ [key:string]: ItemVariable|RoomVariable } = {
    'pantry': { type: 'room' },
    'dog food': {
        type: 'item',
        location: 'pantry',
        canBeHeld: true
    },
};

const actions:Action[] = [];

const strings = {
    pantry: 'A small room adjacent to the kitchen, lined with shelves stocked with dry goods, canned food, and kitchen supplies.',
};

export {
    actions,
    items,
    strings,
}