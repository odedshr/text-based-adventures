import addAchievement from '../../../default/add-achievement.js';
import isValidAction from '../../../default/is-valid-action.js';
import print from "../../../default/print.js";
const items = {
    'guest room': {
        type: 'room',
        state: 'dark',
        synonyms: ['bedroom']
    },
    'bedroom door': {
        type: 'passage',
        between: ['hallway', 'guest room'],
        allowedStates: ['closed', 'opened'],
        state: 'closed',
    },
    'light switch': {
        type: 'item',
        location: 'guest room',
        state: 'hidden'
    },
    bag: {
        type: 'item',
        location: 'guest room',
        canBeHeld: true,
        canContain: 100,
        synonyms: ['backpack']
    }
};
const actions = [
    {
        input: /\b(?:look\s*for|search\s*for|find|locate|check\s*for|seek\s*out)\s*(?:the\s*)?(?:light\s*switch|switch|light\s*control|lighting\s*switch)\b/,
        execute: (_, gameDefinition, userId) => {
            const { variables } = gameDefinition;
            const lightSwitch = variables['light switch'];
            const guestRoom = variables['guest room'];
            if (!isValidAction(gameDefinition, [
                { item: userId, property: 'location', value: 'guest room', textId: 'location-fail:user' },
            ])) {
                return true;
            }
            if (lightSwitch.state === 'on') {
                print(gameDefinition, 'light is already on');
                return true;
            }
            if (lightSwitch.state === 'hidden') {
                variables['light switch'] = Object.assign(Object.assign({}, lightSwitch), { state: 'on' });
                variables['guest room'] = Object.assign(Object.assign({}, guestRoom), { state: 'light' });
                addAchievement(gameDefinition, userId, 'found light switch');
            }
            print(gameDefinition, 'light turned on for the first time');
            return true;
        }
    },
    {
        input: /(?:turn\s?on|switch\s?on|flip(\son)?|activate|power\s?on)\s(?:the\s)?(?:light|lights|light\s?switch)/,
        execute: (_, gameDefinition, userId) => {
            const { variables } = gameDefinition;
            const lightSwitch = items['light switch'];
            if (!isValidAction(gameDefinition, [
                { item: userId, property: 'location', value: 'guest room', textId: 'location-fail:user' }
            ])) {
                return true;
            }
            if (lightSwitch.state === 'on') {
                print(gameDefinition, 'light is already on');
                return true;
            }
            if (lightSwitch.state === 'hidden') {
                print(gameDefinition, 'location-fail:item', 'light switch');
                return true;
            }
            variables['light switch'] = Object.assign(Object.assign({}, lightSwitch), { state: 'on' });
            return true;
        }
    },
    {
        input: /(?:turn\s?off|switch\s?off|flip(\s?off)?|deactivate|power\s?off)\s(?:the\s)?(?:light|lights|light\s?switch)/,
        execute: (_, gameDefinition, userId) => {
            const { variables } = gameDefinition;
            const lightSwitch = items['light switch'];
            if (!isValidAction(gameDefinition, [
                { item: userId, property: 'location', value: 'guest room', textId: 'location-fail:user' }
            ])) {
                return true;
            }
            if (lightSwitch.state === 'off') {
                print(gameDefinition, 'light is already off');
                return true;
            }
            if (lightSwitch.state === 'hidden') {
                print(gameDefinition, 'location-fail:item', 'light switch');
                return true;
            }
            variables['light switch'] = Object.assign(Object.assign({}, lightSwitch), { state: 'off' });
            return true;
        }
    }
];
const strings = {
    'guest room': (variables) => {
        const room = variables['guest room'];
        const lightSwitch = items['light switch'].state;
        const tableAndBag = items['bag'].location === 'guest room' ? `a small table and an empty backpack on the floor` : 'and a small table';
        if (room.state === 'dark') {
            return `The room is utter darkness.${lightSwitch === 'hidden' ? ` Maybe there's a light switch somewhere?` : ''}`;
        }
        return `It looks like a guest room. There's a bed, ${tableAndBag}`;
    },
    'bedroom door': 'A simple yet elegant door with a brass knocker. It gives an inviting air, ushering visitors into the cozy guest room beyond.',
    'light already on': 'The light is already on.',
    'light turned on for the first time': `You managed to find the light switch and turn it on.`,
};
export { actions, items, strings, };
