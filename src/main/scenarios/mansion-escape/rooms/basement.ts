import { Action, GameDefinition, ItemVariable, RoomVariable } from '../../../types';
import print from "../../../default/print.js";

const items:{ [key:string]: ItemVariable|RoomVariable } = {
    'basement': { type: 'room' },
};

const actions:Action[] = [
    {
        input: /\b(?:use|turn|activate|open|operate|adjust)\s*(?:the\s*)?(?:water\s*valve|valve)\s*(?:to\s*)?(?:empty|drain|release\s*water\s*from)\s*(?:the\s*)?(?:pool|swimming\s*pool|water)\b/,
        execute: (input:string, gameDefinition:GameDefinition, userId:string) => {
            //9 - empty pool to get key to secret room
            const { variables } = gameDefinition
            print(gameDefinition, 'not-yet-implemented');
            return false;
        }
    }
];

const strings = {
    basement: 'A dimly lit, musty room filled with old furniture, storage boxes, and tools. The air is cool, and the walls are lined with exposed brick.',
};

export {
    actions,
    items,
    strings,
}