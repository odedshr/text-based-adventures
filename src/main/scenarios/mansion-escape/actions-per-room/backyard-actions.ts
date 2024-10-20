import { Action, GameDefinition } from '../../../types';

const backyardActions:Action[] = [
    {
        input: /\b(?:feed|give|offer)\s*(?:the\s*)?(?:pupcake|cake|treat)\s*(?:to\s*(?:the\s*)?(?:dog|puppy)|with\s*(?:the\s*)?(?:dog|puppy))\b/,
        execute: (input:string, gameDefinition:GameDefinition, userId:string) => {
            //8 - feed dog to gain access to the garage
            const { print } = gameDefinition
            print('not-yet-implemented');
            return false;
        }
    },
    {
        input: /\b(?:pick\s*up|grab|retrieve|get|take|collect)\s*(?:the\s*)?(?:key|keys)\s*(?:from\s*(?:the\s*)?(?:bottom|depths|floor)\s*of\s*(?:the\s*)?(?:pool|swimming\s*pool|water))\b/,
        execute: (input:string, gameDefinition:GameDefinition, userId:string) => {
            //9 - get key from pool drainage using the plunger
            // if pool not empty then refuse
            const { print } = gameDefinition
            print('not-yet-implemented');
            return false;
        }
    }
];

export default backyardActions;