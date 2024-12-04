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
        canBeHeld: true
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
    }
    //1 - get flashlight
];
const strings = {
    'security room': 'The security room is a large and well-constructed room, filled with security cameras and surveillance equipment. It is a must-see if you want to escape the mansion.',
    'vault door': 'The vault door is a large and well-constructed door, filled with security cameras and surveillance equipment. It is a must-see if you want to escape the mansion.',
    'watch cctv recording': 'You watch the cctv recording. partner in secret room; hit by the head',
    'already scrubbed': 'You already scrubbed the cctv recording.',
};
export { actions, items, strings, };
