import { Action, GameDefinition, ItemVariable, RoomVariable } from '../../../types';
import print from "../../../default/print.js";

const items:{ [key:string]: ItemVariable|RoomVariable } = {
    'conservatory': { type: 'room' },
    statue: {
        type: 'item',
        location: 'conservatory',
        synonyms: ['statue', 'plaque', 'statue plaque', 'plaque on statue']
    }
};

const actions:Action[] = [
    {
        input: /\b(?:read|examine|inspect|check|look\s*at|study|view|scan|peruse)\s*(?:the\s*)?(?:statue\s*plaque|plaque\s*on\s*the\s*statue|statue\s*inscription|plaque)\b/,
        execute: (input:string, gameDefinition:GameDefinition, userId:string) => {
            //7 - read plaque from statue (the code for the safe)
            const { variables } = gameDefinition
            print(gameDefinition, 'not-yet-implemented');
            return false;
        }
    }
];

const strings = {
    conservatory: 'A sunlit room filled with potted plants and wicker furniture. Glass walls offer a panoramic view of the surrounding garden and yard.',
};

export {
    actions,
    items,
    strings,
}