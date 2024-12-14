import print from '../../../default/print.js';
import addAchievement from '../../../default/add-achievement';
const items = {
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
const actions = [
    {
        input: /\b(?:watch|view|check|see|look\s*at|access|examine|check)\s*(?:the\s*)?(?:cctv|security|camera)\s*(?:recording|footage|video|feed)\b/,
        conditions: (gameDefinition, userId) => {
            const watched = gameDefinition.variables.cctv.state === 'watched';
            return [
                { item: userId, property: 'location', value: 'security room', textId: 'location-fail:user' },
                { item: 'cctv', property: 'state', value: watched ? 'watched' : 'idle', textId: 'already scrubbed' },
            ];
        },
        execute: (_, gameDefinition, userId) => {
            //9 - check video and see partner in the sex dungeon
            const { variables } = gameDefinition;
            const cctv = variables.cctv;
            variables.cctv = Object.assign(Object.assign({}, cctv), { state: 'watched' });
            addAchievement(gameDefinition, userId, 'watched cctv');
            print(gameDefinition, 'watch cctv recording');
            return false;
        }
    },
    {
        input: /\b(?:delete|remove|erase|discard|clear|cctv)\s*(?:the\s*)?(?:cctv\s*recording|cctv\s*footage|video\s*recording)\b/,
        execute: (_, gameDefinition, userId) => {
            //0 - delete cctv recording
            const { variables } = gameDefinition;
            print(gameDefinition, 'not-yet-implemented');
            return false;
        }
    },
    {
        input: /\bput batteries in flashlight\b/,
        conditions: (gameDefinition, userId) => [
            { item: 'flashlight', property: 'location', value: userId, textId: 'location-fail:item' },
            { item: 'batteries', property: 'location', value: userId, textId: 'location-fail:item' },
        ],
        execute: (_, gameDefinition, userId) => {
            const { variables } = gameDefinition;
            const batteries = variables.batteries;
            variables.batteries = Object.assign(Object.assign({}, batteries), { location: 'flashlight' });
            print(gameDefinition, 'batteries in flashlight');
            addAchievement(gameDefinition, userId, 'put batteries in flashlight');
        }
    },
    {
        input: /\bturn on flashlight\b/,
        conditions: (_, userId) => [
            { item: 'flashlight', property: 'location', value: userId, textId: 'location-fail:item' },
            { item: 'flashlight', property: 'state', value: 'off', textId: 'flashlight not off' },
            { item: 'batteries', property: 'location', value: 'flashlight', textId: 'need batteries' },
            { item: 'batteries', property: 'state', value: 'full', textId: 'batteries empty' },
        ],
        execute: (_, gameDefinition, userId) => {
            const { variables, startTimer } = gameDefinition;
            const flashlight = variables.flashlight;
            variables.flashlight = Object.assign(Object.assign({}, flashlight), { state: 'on' });
            print(gameDefinition, 'flashlight on');
            startTimer('batteryPower');
            addAchievement(gameDefinition, userId, 'used flashlight');
        },
    },
    {
        input: /\bturn off flashlight\b/,
        conditions: (gameDefinition, userId) => [
            { item: 'flashlight', property: 'location', value: userId, textId: 'location-fail:item' },
            { item: 'flashlight', property: 'state', value: 'on', textId: 'flashlight not on' },
            { item: 'batteries', property: 'location', value: 'flashlight', textId: 'need batteries' },
        ],
        execute: (_, gameDefinition, userId) => {
            const { variables, stopTimer } = gameDefinition;
            const flashlight = variables.flashlight;
            variables.flashlight = Object.assign(Object.assign({}, flashlight), { state: 'off' });
            print(gameDefinition, 'flashlight off');
            stopTimer('batteryPower');
            addAchievement(gameDefinition, userId, 'used flashlight');
        },
    }
];
const strings = {
    'security room'(variables) {
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
export { actions, items, strings, };
