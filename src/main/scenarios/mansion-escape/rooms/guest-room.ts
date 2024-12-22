import addAchievement from '../../../default/add-achievement.js';
import isValidAction from '../../../default/is-valid-action.js';
import { ItemVariable, Action, Condition, GameDefinition, Variables, RoomVariable, PassageVariable } from '../../../types.js';
import print from "../../../default/print.js";

const items:{[key:string]: ItemVariable|RoomVariable|PassageVariable } = {
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

const actions:Action[] = [
    {
        input: /\b(?:look\s*for|search\s*for|find|locate|check\s*for|seek\s*out)\s*(?:the\s*)?(?:light\s*switch|switch|light\s*control|lighting\s*switch)\b/,
        execute: (_:string, gameDefinition:GameDefinition, userId:string) => {
            const { variables } = gameDefinition;

            const lightSwitch = variables['light switch'] as ItemVariable;
            const guestRoom = variables['guest room'] as RoomVariable;

            if (!isValidAction(gameDefinition, [
                {item: userId, property: 'location', value: 'guest room', textId:'location-fail:user'},
            ])) {                
                return true;
            }

            if (lightSwitch.state === 'on') {
                print(gameDefinition, 'light is already on');
                return true;
            } 
            
            if (lightSwitch.state === 'hidden') {
                variables['light switch'] = { ... lightSwitch, state: 'on' as string };
                variables['guest room'] = { ... guestRoom, state: 'light' as string };
                addAchievement(gameDefinition, userId, 'found light switch');
            }

            print(gameDefinition, 'light turned on for the first time');

            return true;
        }
    },
    { 
        input: /(?:turn\s?on|switch\s?on|flip(\son)?|activate|power\s?on)\s(?:the\s)?(?:light|lights|light\s?switch)/,
        conditions(gameDefinition:GameDefinition, userId:string) {
            const { variables } = gameDefinition;
            const flashlight = variables.flashlight && (variables.flashlight as ItemVariable).state === 'on';
            const lightSwitchState = (variables['light switch'] as ItemVariable).state as string;
            const lightSwitchCondition = [];
            
            if (lightSwitchState==='on') {
                lightSwitchCondition.push({textId: 'light already on'});
            } else if (lightSwitchState==='hidden' && !flashlight) {
                lightSwitchCondition.push({textId: 'location-fail:item'});
            }

            return [
                {item: userId, property: 'location', value: 'guest room', textId:'location-fail:user'},
                ...lightSwitchCondition,
            ] as Condition[];
        },
        execute: (_:string, gameDefinition:GameDefinition, userId:string) => {
        const { variables } = gameDefinition;
        const lightSwitch = items['light switch'] as ItemVariable;
        
        variables['light switch'] = { ... lightSwitch, state: 'on' as string };
        return true;
    }},
    { 
        input: /(?:turn\s?off|switch\s?off|flip(\s?off)?|deactivate|power\s?off)\s(?:the\s)?(?:light|lights|light\s?switch)/,
        execute: (_:string, gameDefinition:GameDefinition, userId:string) => {
        const { variables } = gameDefinition;
        const lightSwitch = items['light switch'] as ItemVariable;

        if (!isValidAction(gameDefinition, [
            {item: userId, property: 'location', value: 'guest room', textId:'location-fail:user'}
        ])) {                
            return true;
        }

        if (lightSwitch.state === 'off') {
            print(gameDefinition,'light is already off');
            return true;
        } 
        
        if (lightSwitch.state === 'hidden') {
            print(gameDefinition, 'location-fail:item', 'light switch');
            return true;
        }
        
        variables['light switch'] = { ... lightSwitch, state: 'off' as string };
        return true;
    }}
];

const strings = {
    'guest room': (variables:Variables) => {
        const room = variables['guest room'] as RoomVariable;
        const lightSwitchHidden = items['light switch'].state === 'hidden';
        const flashlight = variables.flashlight && (variables.flashlight as ItemVariable).state === 'on';
        const tableAndBag = (items['bag'] as ItemVariable).location==='guest room' ? `a small table and an empty backpack on the floor` : 'and a small table';
        if (room.state === 'dark' && !flashlight) { return `The room is utter darkness.${lightSwitchHidden ? ` Maybe there's a light switch somewhere?` : ''}`; }

        return `It looks like a guest room. There's a bed, ${tableAndBag}`;
    },
    'bedroom door': 'A simple yet elegant door with a brass knocker.',
    'light switch'(variables:Variables) {
        const isOn = items['light switch'].state === 'on';
        return `It's a standard light switch. It's turned ${isOn ? 'on': 'off'}`;
    },
    'light already on': 'The light is already on.',
    'light turned on for the first time': `You managed to find the light switch and turn it on.`,
    bag: 'A sturdy backpack. It can be useful if you want carry stuff around.'
}
export {
    actions,
    items,
    strings,
}