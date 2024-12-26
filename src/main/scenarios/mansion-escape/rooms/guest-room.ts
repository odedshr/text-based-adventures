import { ItemVariable, Condition, GameDefinition, Variables, RoomVariable, PlayerVariable, PuzzlePiece } from '../../../types.js';
import addAchievement from '../../../default/add-achievement.js';
import isValidAction from '../../../default/is-valid-action.js';
import print from "../../../default/print.js";

const guestRoom:PuzzlePiece = {
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
            execute: (gameDefinition:GameDefinition, userId:string,_:string) => {
                const { variables } = gameDefinition;
    
                const lightSwitch = variables['light switch'] as ItemVariable;
                const guestRoom = variables['guest room'] as RoomVariable;
    
                if ((variables[userId] as PlayerVariable).location === 'attic') {
                    print(gameDefinition, 'cant find light switch');
                    return;
                }  else if (!isValidAction(gameDefinition, [
                    {item: userId, property: 'location', value: 'guest room', textId:'location-fail:user'},
                ])) {                
                    return;
                } else if (lightSwitch.state === 'on') {
                    print(gameDefinition, 'light is already on');
                    return;
                }
                if (lightSwitch.state === 'hidden') {
                    addAchievement(gameDefinition, userId, 'found light switch');
                    print(gameDefinition, 'light turned on for the first time');
                }
    
                variables['light switch'] = { ... lightSwitch, state: 'on' as string };
                variables['guest room'] = { ... guestRoom, state: 'light' as string };
                
                print(gameDefinition, 'guest room');
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
            execute: (gameDefinition:GameDefinition, userId:string,_:string) => {
            const { variables } = gameDefinition;
            variables['light switch'] = { ... variables['light switch'], state: 'on' as string } as ItemVariable;
            variables['guest room'] = { ... variables['guest room'], state: 'light' as string } as RoomVariable;
        }},
        { 
            input: /(?:turn\s?off|switch\s?off|flip(\s?off)?|deactivate|power\s?off)\s(?:the\s)?(?:light|lights|light\s?switch)/,
            conditions: (gameDefinition:GameDefinition, userId:string) => [
                { item: userId, property: 'location', value: 'guest room', textId:'location-fail:user' },
                { item: 'light switch', property: 'state', value: 'on',
                    textId: (gameDefinition.variables['light switch'] as ItemVariable).state === 'hidden' ? 'location-fail:item' : 'light is already off'
                },
            ],
            execute: (gameDefinition:GameDefinition, userId:string,_:string) => {
            const { variables } = gameDefinition;
            variables['light switch'] = { ... variables['light switch'], state: 'off' as string } as ItemVariable;
            variables['guest room'] = { ... variables['guest room'], state: 'dark' as string } as RoomVariable;
        }}
    ],
    strings: {
        'guest room': (variables:Variables) => {
            const room = variables['guest room'] as RoomVariable;
            const lightSwitchHidden = (variables['light switch'] as ItemVariable).state === 'hidden';
            const flashlight = variables.flashlight && (variables.flashlight as ItemVariable).state === 'on';
            const tableAndBag = (variables['bag'] as ItemVariable).location==='guest room' ? `a small table and an empty backpack on the floor` : 'and a small table';
            if (room.state === 'dark' && !flashlight) { return `The room is utter darkness.${lightSwitchHidden ? ` Maybe there's a light switch somewhere?` : ''}`; }
    
            return `It looks like a guest room. There's a bed, ${tableAndBag}`;
        },
        'bedroom door': 'A simple yet elegant door with a brass knocker.',
        'light switch'(variables:Variables) {
            const isOn = (variables['light switch'] as ItemVariable).state === 'on';
            return `It's a standard light switch. It's turned ${isOn ? 'on': 'off'}`;
        },
        'cant find light switch': `You scramble around in the dark, but you can't find the light switch.`,
        'light already on': 'The light is already on.',
        'light turned on for the first time': `You managed to find the light switch and turn it on.`,
        bag: 'A sturdy backpack. It can be useful if you want carry stuff around.'
    }
}

export default guestRoom;