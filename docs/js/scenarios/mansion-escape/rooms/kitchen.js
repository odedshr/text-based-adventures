import print from '../../../default/print.js';
const items = {
    'kitchen': { type: 'room' }
};
const actions = [
    {
        input: /\b(?:make|prepare|bake|create)\s*(?:a\s*)?(?:pupcake|dog\s*cake|treat)\b/,
        execute: (input, gameDefinition, userId) => {
            // bake pupcake
            const { variables } = gameDefinition;
            print(gameDefinition, 'not-yet-implemented');
            return false;
        }
    },
    {
        input: /\b(?:make|prepare|bake|create)\s*(?:a\s*)?(?:pupcake|dog\s*cake|treat)\s*(?:using|with|by\s*using|containing)\s*(?:sleeping\s*pills|sleep\s*medication|pills)\b/,
        execute: (input, gameDefinition, userId) => {
            // bake pupcake with sleeping pills
            const { variables } = gameDefinition;
            print(gameDefinition, 'not-yet-implemented');
            return false;
        }
    },
    {
        input: /\b(?:add|put|mix|insert|include)\s*(?:a\s*)?(?:sleeping\s*pill|sleep\s*medication|pill|sleeping\s*pills)\s*(?:into|to|in|with)\s*(?:the\s*)?(?:pupcake|dog\s*cake|treat)\b/,
        execute: (input, gameDefinition, userId) => {
            // add sleeping pills to pupcake
            const { variables } = gameDefinition;
            print(gameDefinition, 'not-yet-implemented');
            return false;
        }
    }
];
const strings = {
    kitchen: 'A modern kitchen with stainless steel appliances, marble countertops, and a large central island. The room smells of fresh herbs and baking bread.',
};
export { actions, items, strings, };
