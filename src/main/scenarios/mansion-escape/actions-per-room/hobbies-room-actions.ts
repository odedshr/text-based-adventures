import { Action, GameDefinition } from '../../../types';

const hobbiesRoomActions:Action[] = [
    {
        input: /\b(?:feed|give|offer|provide)\s*(?:the\s*)?(?:fish|fishes)\s*(?:in\s*(?:the\s*)?(?:aquarium|tank|fish\s*tank))\s*(?:using|with|by\s*using)\s*(?:the\s*)?(?:fish\s*food|food)\b/,
        execute: (input:string, gameDefinition:GameDefinition, userId:string) => {
            //2 - feed fish
            const { print } = gameDefinition
            print('not-yet-implemented');
            return false;
        }
    },
    {
        input: /\b(?:fish\s*out|retrieve|take\s*out|pull\s*out|remove|grab|get|pick\s*up)\s*(?:the\s*)?(?:treasure\s*box|chest|box)\s*(?:out\s*of\s*(?:the\s*)?(?:aquarium|tank|fish\s*tank|water))\b/,
        execute: (input:string, gameDefinition:GameDefinition, userId:string) => {
            // get the treasure box only if fish were fed
            const { print } = gameDefinition
            print('not-yet-implemented');
            return false;
        }
    },
    {
        input: /\b(?:open|check|inspect|examine|unlock|look\s*into)\s*(?:the\s*)?(?:treasure\s*box|chest|box)\b/,
        execute: (input:string, gameDefinition:GameDefinition, userId:string) => {
            // open treasure box
            const { print } = gameDefinition
            print('not-yet-implemented');
            return false;
        }
    },
    {
        input: /\b(?:put|place|return|set|drop)\s*(?:the\s*)?(?:treasure\s*box|chest|box)\s*(?:back\s*)?(?:in|into)\s*(?:the\s*)?(?:aquarium|tank|fish\s*tank|water)\b/,
        execute: (input:string, gameDefinition:GameDefinition, userId:string) => {
            // open treasure box
            const { print } = gameDefinition
            print('not-yet-implemented');
            return false;
        }
    }

    //3 - take key to drawer from treasure box
    //4 - get glue for vase
];

export default hobbiesRoomActions;