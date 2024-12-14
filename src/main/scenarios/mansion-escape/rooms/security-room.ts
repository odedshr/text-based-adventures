import { Action, ItemVariable, GameDefinition, RoomVariable, PassageVariable, Variables } from '../../../types';
import print from '../../../default/print.js';
import addAchievement from '../../../default/add-achievement';

const items:{ [key:string]: ItemVariable|RoomVariable|PassageVariable } = {
    'security room': { type: 'room' },
    'vault door': {
        type: 'passage',
        between: ['basement', 'security room'],
        allowedStates: ['locked', 'opened'],
        state: 'locked',
    },
    cctv: {
        type: 'item',
        location: 'security room',
        state: 'idle'
    },
    flashlight: {
        type: 'item',
        location: 'security room',
        canBeHeld: true,
        state: 'off'
    },
};

const actions:Action[] = [
    {
        input: /\b(?:watch|view|check|see|look\s*at|access|examine|check)\s*(?:the\s*)?(?:cctv|security|camera)\s*(?:recording|footage|video|feed)\b/,
        conditions: (gameDefinition:GameDefinition, userId:string) => {
            const watched = (gameDefinition.variables.cctv as ItemVariable).state === 'watched';
            return [
                {item: userId, property: 'location', value: 'security room', textId:'location-fail:user'},
                {item: 'cctv', property: 'state', value: watched ? 'watched' : 'idle', textId:'already scrubbed'},
            ];
        },
        execute: (_:string, gameDefinition:GameDefinition, userId:string) => {
            //9 - check video and see partner in the sex dungeon
            const { variables } = gameDefinition;
            const cctv = variables.cctv as ItemVariable;
            variables.cctv = { ...cctv, state: 'watched' };
            addAchievement(gameDefinition, userId, 'watched cctv');
            print(gameDefinition, 'watch cctv recording');
            return false;
        }
    },
    {
        input: /\b(?:delete|remove|erase|discard|clear|cctv)\s*(?:the\s*)?(?:cctv\s*recording|cctv\s*footage|video\s*recording)\b/,
        execute: (_:string, gameDefinition:GameDefinition, userId:string) => {
            //0 - delete cctv recording
            const { variables } = gameDefinition;
            print(gameDefinition, 'not-yet-implemented');
            return false;
        }
    },
    {
        input: /\bput batteries in flashlight\b/,
        conditions: (gameDefinition:GameDefinition, userId:string) => [
            {item: 'flashlight', property: 'location', value: userId, textId:'location-fail:item'},
            {item: 'batteries', property: 'location', value: userId, textId:'location-fail:item'},
        ],
        execute: (_:string, gameDefinition:GameDefinition, userId:string) => {
            const { variables } = gameDefinition;
            const batteries = variables.batteries;
            variables.batteries = { ...batteries, location: 'flashlight'} as ItemVariable;
            print(gameDefinition,'batteries in flashlight');
            addAchievement(gameDefinition, userId, 'put batteries in flashlight');
        }
    },
    {
        input: /\bturn on flashlight\b/,
        conditions: (_:GameDefinition, userId:string) => [
            {item: 'flashlight', property: 'location', value: userId, textId:'location-fail:item'},
            {item: 'flashlight', property: 'state', value: 'off', textId:'flashlight not off'},
            {item: 'batteries', property: 'location', value: 'flashlight', textId:'need batteries'},
            {item: 'batteries', property: 'state', value: 'full', textId:'batteries empty'},
        ],
        execute: (_:string, gameDefinition:GameDefinition, userId:string) => {
            const { variables, startTimer } = gameDefinition;
            const flashlight = variables.flashlight;
            variables.flashlight = { ...flashlight, state: 'on'} as ItemVariable;
            print(gameDefinition, 'flashlight on');
            startTimer('batteryPower');
            addAchievement(gameDefinition, userId, 'used flashlight');
        },
    },
    {
        input: /\bturn off flashlight\b/,
        conditions: (gameDefinition:GameDefinition, userId:string) => [
            {item: 'flashlight', property: 'location', value: userId, textId:'location-fail:item'},
            {item: 'flashlight', property: 'state', value: 'on', textId:'flashlight not on'},
            {item: 'batteries', property: 'location', value: 'flashlight', textId:'need batteries'},
        ],
        execute: (_:string, gameDefinition:GameDefinition, userId:string) => {
            const { variables, stopTimer } = gameDefinition;
            const flashlight = variables.flashlight;
            variables.flashlight = { ...flashlight, state: 'off'} as ItemVariable;
            print(gameDefinition, 'flashlight off');
            stopTimer('batteryPower');
            addAchievement(gameDefinition, userId, 'used flashlight');
        },
    }
];

const strings = {
    'security room' (variables:Variables) {
        return 'The security room is a large and well-constructed room, filled with security cameras and surveillance equipment. It is a must-see if you want to escape the mansion.';
    },
    'vault door': 'The vault door is a large and well-constructed door, filled with security cameras and surveillance equipment. It is a must-see if you want to escape the mansion.',
    'watch cctv recording': 'You watch the cctv recording. partner in secret room; hit by the head',
    'already scrubbed': 'You already scrubbed the cctv recording.',
    'need batteries': 'You probably need to get batteries for this flashlight to work.',
    'batteries in flashlight': `You put the batteries in the flashlight, but you're wondering how much juice they actually have in them.`,
    'flashlight on': `You turn on the flashlight. Let's see how long it would last.`,
    'flashlight off': `You turn off the flashlight. Smart thinking.`,
    'flashlight not on': 'The flashlight is already switched off.',
    'flashlight not off': 'The flashlight is already switched on.',
    'batteries empty': 'The batteries are dead.',
};

export {
    actions,
    items,
    strings,
}