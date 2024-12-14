import { Action, GameDefinition, ItemVariable, PassageVariable, RoomVariable } from '../../../types';
import print from "../../../default/print.js";
import addAchievement from '../../../default/add-achievement';
import addToInventory from '../../../default/add-to-inventory';

const items:{ [key:string]: ItemVariable|RoomVariable|PassageVariable } = {
    'backyard': { type: 'room' },
    'garden gate': {
        type: 'passage',
        between: ['conservatory', 'backyard'],
        allowedStates: ['opened'],
        state: 'opened',
    },
    dog: {
        type: 'item',
        location: 'backyard',
        state: 'hostile'
    },
    pool: {
        type: 'item',
        location: 'backyard',
        canContain: 'key',
        state: 'full'
    },
    key: {
        type: 'item',
        location: 'pool',
        canBeHeld: true,
        synonyms: ['master key']
    }
}

const actions:Action[] = [
    {
        input: /\b(?:feed|give|offer)\s*(?:the\s*)?(?:pupcake|cake|treat)\s*(?:to\s*(?:the\s*)?(?:dog|puppy)|with\s*(?:the\s*)?(?:dog|puppy))\b/,
        execute: (input:string, gameDefinition:GameDefinition, userId:string) => {
            //8 - feed dog to gain access to the garage
            const { variables } = gameDefinition
            print(gameDefinition, 'not-yet-implemented');
            return false;
        }
    },
    {
        input: /\b(?:pick\s*up|fetch|grab|retrieve|get|take|collect)\s*(?:the\s*)?(?:key|keys)\s*(?:from\s*(?:the\s*)?(?:bottom|depths|floor)\s*of\s*(?:the\s*)?(?:pool|swimming\s*pool|water)|from\s*(?:the\s*)?(?:pool|swimming\s*pool))?\b/,
        conditions: (_:GameDefinition, userId:string) => [
            {item: userId, property: 'location', value: 'backyard', textId:'location-fail:user'},
            {item: 'key', property: 'location', value: 'pool', textId:'location-fail:item'},
            {item: 'pool', property: 'state', value: 'drained', textId:'pool is not empty'}
        ],
        execute: (input:string, gameDefinition:GameDefinition, userId:string) => {
            addToInventory(gameDefinition, userId, 'key');
            print(gameDefinition, 'you-picked-up-the-item', 'key');
            addAchievement(gameDefinition, userId, 'picked up key');
        }
    }
];

const strings = {
    backyard: 'An open outdoor area with manicured lawns, flowerbeds, and a few benches. A stone path leads to the garden and the back entrance of the mansion.',
    'garden gate': 'A wrought-iron gate adorned with climbing roses. It swings open with a soft creak, leading from the glass-walled conservatory into the open backyard.',
    'pool is not empty': 'The pool is not empty',
};

export {
    actions,
    items,
    strings,
}