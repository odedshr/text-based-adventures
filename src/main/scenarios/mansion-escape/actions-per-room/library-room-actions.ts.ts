import { Action, GameDefinition } from '../../../types';

const libraryActions:Action[] = [
    {
        input: /\b(?:find|locate|search\s*for|look\s*for|get)\s*(?:the\s*)?(?:dog\s*dishes\s*recipe\s*book|recipe\s*book\s*for\s*dog\s*dishes|dog\s*recipe\s*book|book\s*of\s*dog\s*dishes)\b/,
        execute: (input:string, gameDefinition:GameDefinition, userId:string) => {
            //2 - find dog dishes recipe book
            const { print } = gameDefinition
            print('not-yet-implemented');
            return false;
        }
    },
    {
        input: /\b(?:find|locate|search\s*for|look\s*for|get)\s*(?:the\s*)?(?:book\s*(?:titled\s*)?(?:'how\s*to\s*use\s*forensic\s*kit'|on\s*how\s*to\s*use\s*a?\s*forensic\s*kit|about\s*using\s*a?\s*forensic\s*kit|how\s*to\s*use\s*a?\s*forensic\s*kit))\b/,
        execute: (input:string, gameDefinition:GameDefinition, userId:string) => {
            //3 - find book how to use forensic kit
            const { print } = gameDefinition
            print('not-yet-implemented');
            return false;
        }
    }
];

export default libraryActions;