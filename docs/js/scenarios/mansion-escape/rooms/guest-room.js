import addAchievement from '../../../default/add-achievement.js';
import isValidAction from '../../../default/is-valid-action.js';
import print from "../../../default/print.js";
const guestRoom = {
    variables: {
        'guest room': {
            type: 'room',
            state: 'dark',
            synonyms: ['bedroom']
        },
        'bedroom door': {
            type: 'passage',
            in: 'guest room',
            out: 'hallway',
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
    },
    actions: [
        {
            input: /\b(?:look\s*for|search\s*for|find|locate|check\s*for|seek\s*out)\s*(?:the\s*)?(?:light\s*switch|switch|light\s*control|lighting\s*switch)\b/,
            execute: (gameDefinition, userId, _) => {
                const { variables } = gameDefinition;
                const lightSwitch = variables['light switch'];
                const guestRoom = variables['guest room'];
                if (variables[userId].location === 'attic') {
                    print(gameDefinition, 'cant find light switch');
                    return;
                }
                else if (!isValidAction(gameDefinition, [
                    { item: userId, property: 'location', value: 'guest room', textId: 'location-fail:user' },
                ])) {
                    return;
                }
                else if (lightSwitch.state === 'on') {
                    print(gameDefinition, 'light is already on');
                    return;
                }
                if (lightSwitch.state === 'hidden') {
                    addAchievement(gameDefinition, userId, 'found light switch');
                    print(gameDefinition, 'light turned on for the first time');
                }
                variables['light switch'] = Object.assign(Object.assign({}, lightSwitch), { state: 'on' });
                variables['guest room'] = Object.assign(Object.assign({}, guestRoom), { state: 'light' });
                print(gameDefinition, 'guest room');
            }
        },
        {
            input: /(?:turn\s?on|switch\s?on|flip(\son)?|activate|power\s?on)\s(?:the\s)?(?:light|lights|light\s?switch)/,
            conditions(gameDefinition, userId) {
                const { variables } = gameDefinition;
                const flashlight = variables.flashlight && variables.flashlight.state === 'on';
                const lightSwitchState = variables['light switch'].state;
                const lightSwitchCondition = [];
                if (lightSwitchState === 'on') {
                    lightSwitchCondition.push({ textId: 'light already on' });
                }
                else if (lightSwitchState === 'hidden' && !flashlight) {
                    lightSwitchCondition.push({ textId: 'location-fail:item' });
                }
                return [
                    { item: userId, property: 'location', value: 'guest room', textId: 'location-fail:user' },
                    ...lightSwitchCondition,
                ];
            },
            execute: (gameDefinition, userId, _) => {
                const { variables } = gameDefinition;
                variables['light switch'] = Object.assign(Object.assign({}, variables['light switch']), { state: 'on' });
                variables['guest room'] = Object.assign(Object.assign({}, variables['guest room']), { state: 'light' });
            }
        },
        {
            input: /(?:turn\s?off|switch\s?off|flip(\s?off)?|deactivate|power\s?off)\s(?:the\s)?(?:light|lights|light\s?switch)/,
            conditions: (gameDefinition, userId) => [
                { item: userId, property: 'location', value: 'guest room', textId: 'location-fail:user' },
                { item: 'light switch', property: 'state', value: 'on',
                    textId: gameDefinition.variables['light switch'].state === 'hidden' ? 'location-fail:item' : 'light is already off'
                },
            ],
            execute: (gameDefinition, userId, _) => {
                const { variables } = gameDefinition;
                variables['light switch'] = Object.assign(Object.assign({}, variables['light switch']), { state: 'off' });
                variables['guest room'] = Object.assign(Object.assign({}, variables['guest room']), { state: 'dark' });
            }
        }
    ],
    strings: {
        'guest room': (variables) => {
            const room = variables['guest room'];
            const lightSwitchHidden = variables['light switch'].state === 'hidden';
            const flashlight = variables.flashlight && variables.flashlight.state === 'on';
            const tableAndBag = variables['bag'].location === 'guest room' ? `a small table and an empty backpack on the floor` : 'and a small table';
            if (room.state === 'dark' && !flashlight) {
                return `The room is utter darkness.${lightSwitchHidden ? ` Maybe there's a light switch somewhere?` : ''}`;
            }
            return `It looks like a guest room. There's a bed, ${tableAndBag}`;
        },
        'bedroom door': 'A simple yet elegant door with a brass knocker.',
        'light switch'(variables) {
            const isOn = variables['light switch'].state === 'on';
            return `It's a standard light switch. It's turned ${isOn ? 'on' : 'off'}`;
        },
        'cant find light switch': `You scramble around in the dark, but you can't find the light switch.`,
        'light already on': 'The light is already on.',
        'light turned on for the first time': `You managed to find the light switch and turn it on.`,
        bag: 'A sturdy backpack. It can be useful if you want carry stuff around.'
    }
};
export default guestRoom;
