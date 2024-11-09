import print from "../../../default/print.js";
const items = {
    'backyard': { type: 'room' },
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
        canBeHeld: true
    }
};
const actions = [
    {
        input: /\b(?:feed|give|offer)\s*(?:the\s*)?(?:pupcake|cake|treat)\s*(?:to\s*(?:the\s*)?(?:dog|puppy)|with\s*(?:the\s*)?(?:dog|puppy))\b/,
        execute: (input, gameDefinition, userId) => {
            //8 - feed dog to gain access to the garage
            const { variables } = gameDefinition;
            print(gameDefinition, 'not-yet-implemented');
            return false;
        }
    },
    {
        input: /\b(?:pick\s*up|grab|retrieve|get|take|collect)\s*(?:the\s*)?(?:key|keys)\s*(?:from\s*(?:the\s*)?(?:bottom|depths|floor)\s*of\s*(?:the\s*)?(?:pool|swimming\s*pool|water))\b/,
        execute: (input, gameDefinition, userId) => {
            //9 - get key from pool drainage using the plunger
            // if pool not empty then refuse
            const { variables } = gameDefinition;
            print(gameDefinition, 'not-yet-implemented');
            return false;
        }
    }
];
const strings = {
    'backyard': 'An open outdoor area with manicured lawns, flowerbeds, and a few benches. A stone path leads to the garden and the back entrance of the mansion.',
};
export { actions, items, strings, };
