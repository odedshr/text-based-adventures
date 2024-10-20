import { Action, GameDefinition } from '../../../types';

const basementActions:Action[] = [
    {
        input: /\b(?:use|turn|activate|open|operate|adjust)\s*(?:the\s*)?(?:water\s*valve|valve)\s*(?:to\s*)?(?:empty|drain|release\s*water\s*from)\s*(?:the\s*)?(?:pool|swimming\s*pool|water)\b/,
        execute: (input:string, gameDefinition:GameDefinition, userId:string) => {
            //9 - empty pool to get key to secret room
            const { print } = gameDefinition
            print('not-yet-implemented');
            return false;
        }
    }
];

export default basementActions;