import { Action, ItemVariable, GameDefinition, RoomVariable } from '../../../types';
import print from '../../../default/print.js';

const items:{ [key:string]: ItemVariable|RoomVariable } = {
    'security room': { type: 'room' },
    'flashlight': {
        type: 'item',
        location: 'security room',
        canBeHeld: true
    },
};

const actions:Action[] = [
    {
        input: /\b(?:check|inspect|review|examine|look\s*at)\s*(?:the\s*)?(?:cctv\s*recording|cctv\s*footage|video\s*recording)\b/,
        execute: (input:string, gameDefinition:GameDefinition, userId:string) => {
            //9 - check video and see partner in the sex dungeon
            const { variables } = gameDefinition;
            print(gameDefinition, 'not-yet-implemented');
            return false;
        }
    },
    {
        input: /\b(?:delete|remove|erase|discard|clear)\s*(?:the\s*)?(?:cctv\s*recording|cctv\s*footage|video\s*recording)\b/,
        execute: (input:string, gameDefinition:GameDefinition, userId:string) => {
            //0 - delete cctv recording
            const { variables } = gameDefinition;
            print(gameDefinition, 'not-yet-implemented');
            return false;
        }
    }  
    
    //1 - get flashlight
];

const strings = {
    'security room': 'The security room is a large and well-constructed room, filled with security cameras and surveillance equipment. It is a must-see if you want to escape the mansion.',
};

export {
    actions,
    items,
    strings,
}