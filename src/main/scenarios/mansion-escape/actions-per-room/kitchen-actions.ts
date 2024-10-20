import { Action, GameDefinition } from '../../../types';

const kitchenActions:Action[] = [
    {
        input: /\b(?:make|prepare|bake|create)\s*(?:a\s*)?(?:pupcake|dog\s*cake|treat)\b/,
        execute: (input:string, gameDefinition:GameDefinition, userId:string) => {
            // bake pupcake
            const { print } = gameDefinition
            print('not-yet-implemented');
            return false;
        }
    },
    {
        input: /\b(?:make|prepare|bake|create)\s*(?:a\s*)?(?:pupcake|dog\s*cake|treat)\s*(?:using|with|by\s*using|containing)\s*(?:sleeping\s*pills|sleep\s*medication|pills)\b/,
        execute: (input:string, gameDefinition:GameDefinition, userId:string) => {
            // bake pupcake with sleeping pills
            const { print } = gameDefinition
            print('not-yet-implemented');
            return false;
        }
    },
    {
        input: /\b(?:add|put|mix|insert|include)\s*(?:a\s*)?(?:sleeping\s*pill|sleep\s*medication|pill|sleeping\s*pills)\s*(?:into|to|in|with)\s*(?:the\s*)?(?:pupcake|dog\s*cake|treat)\b/,
        execute: (input:string, gameDefinition:GameDefinition, userId:string) => {
            // add sleeping pills to pupcake
            const { print } = gameDefinition
            print('not-yet-implemented');
            return false;
        }
    }
];

export default kitchenActions;