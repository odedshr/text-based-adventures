import isValidAction from '../../../default/is-valid-action.js';
const items = {
    'light switch': {
        type: 'item',
        location: 'guest room',
        state: 'off'
    },
    'bag': {
        type: 'item',
        location: 'guest room',
        canBeHeld: true,
        canContain: 100,
        synonyms: ['bag', 'backpack']
    }
};
const actions = [
    {
        input: /\b(?:look\s*for|search\s*for|find|locate|check\s*for|seek\s*out)\s*(?:the\s*)?(?:light\s*switch|switch|light\s*control|lighting\s*switch)\b/,
        execute: (input, gameDefinition, userId) => {
            //0 - find light switch
            const { print } = gameDefinition;
            const lightSwitch = items['light switch'];
            if (!isValidAction(gameDefinition, [
                { item: userId, property: 'location', value: 'office', textId: 'location-fail:user' },
                { item: 'light switch', property: 'state', value: 'off', textId: 'light already on' },
            ])) {
                return true;
            }
            print('not-yet-implemented');
            return false;
        }
    }
    // guest room:
    //1 - find bag (in guest room)
];
const strings = {
    'guest room:dark': `The room is utter darkness. Maybe there's a light switch somewhere?`,
    'guest room:lit-with-bag': `It looks like a guest room. There's a bed, a small table and an empty backpack on the floor.`,
    'guest room:lit': `It looks like a guest room. There's a bed, a small table.`,
    'light already on': 'The light is already on.',
};
export { actions, items, strings, };
