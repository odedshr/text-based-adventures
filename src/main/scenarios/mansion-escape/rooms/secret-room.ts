import { Action, ItemVariable, RoomVariable } from '../../../types';

const items:{ [key:string]: ItemVariable|RoomVariable } = {
    'secret room': { type: 'room' },
    'train model': {
        type: 'item',
        location: 'secret room'
    },
};

const actions:Action[] = [];

const strings = {
    'secret room': 'A hidden room, accessible only by a secret passage. It contains mysterious artifacts, old documents, and a single desk covered in dust.',
};

export {
    actions,
    items,
    strings,
}