import { PassageVariable } from '../../types.js';

const passages:{[key:string]:PassageVariable} = {
    'grand archway': {
        type: 'passage',
        between: ['foyer', 'hallway'],
        allowedStates: ['opened'],
        state: 'opened',
    },
    'parlor door': {
        type: 'passage',
        between: ['foyer', 'living room'],
        allowedStates: ['opened'],
        state: 'opened',
    },
    'toilet door': {
        type: 'passage',
        between: ['foyer', 'toilet'],
        allowedStates: ['opened'],
        state: 'opened',
    },
    'dining entrance': {
        type: 'passage',
        between: ['foyer', 'dining room'],
        allowedStates: ['opened'],
        state: 'opened',
    },
    'chef\'s swing': {
        type: 'passage',
        between: ['kitchen', 'dining room'],
        allowedStates: ['opened'],
        state: 'opened',
    },
    'larder hatch': {
        type: 'passage',
        between: ['kitchen', 'pantry'],
        allowedStates: ['opened'],
        state: 'opened',
    },
    'cellar stairs': {
        type: 'passage',
        between: ['basement', 'pantry'],
        allowedStates: ['opened'],
        state: 'opened',
    },
    'attic ladder': {
        type: 'passage',
        between: ['hallway', 'attic'],
        allowedStates: ['opened'],
        state: 'opened',
    },
    'craft door': {
        type: 'passage',
        between: ['hallway', 'hobbies room'],
        allowedStates: ['opened'],
        state: 'opened',
    },
    'bedroom door': {
        type: 'passage',
        between: ['hallway', 'guest room'],
        allowedStates: ['opened'],
        state: 'opened',
    },
    'washroom entry': {
        type: 'passage',
        between: ['hallway', 'bathroom'],
        allowedStates: ['opened'],
        state: 'opened',
    },
    'blue door': {
        type: 'passage',
        between: ['hallway', 'office'],
        state: 'closed',
        synonyms: ['door']
    },
    'lavish door': {
        type: 'passage',
        between: ['hallway', 'master bedroom'],
        allowedStates: ['opened'],
        state: 'opened',
        synonyms: ['door']
    },
    'bathing nook': {
        type: 'passage',
        between: ['master bedroom', 'ensuite bathroom'],
        allowedStates: ['opened'],
        state: 'opened',
    },
    'secret door': {
        type: 'passage',
        between: ['master bedroom', 'secret room'],
        allowedStates: ['opened','hidden'],
        state: 'hidden',
        synonyms: ['door']
    },
    'spiralling stairs': {
        type: 'passage',
        between: ['office', 'library'],
        allowedStates: ['opened'],
        state: 'opened',
        synonyms: ['stairs']
    },
    'lounge arch': {
        type: 'passage',
        between: ['living room', 'library'],
        allowedStates: ['opened'],
        state: 'opened',
    },
    'garden view': {
        type: 'passage',
        between: ['living room', 'conservatory'],
        allowedStates: ['opened'],
        state: 'opened',
    },
    'garden gate': {
        type: 'passage',
        between: ['conservatory', 'back yard'],
        allowedStates: ['opened'],
        state: 'opened',
    },
    'stone path arch': {
        type: 'passage',
        between: ['back yard', 'garage'],
        allowedStates: ['opened'],
        state: 'opened',
    },
    'workshop hatch': {
        type: 'passage',
        between: ['garage', 'basement'],
        allowedStates: ['opened'],
        state: 'opened',
    },
    'vault door': {
        type: 'passage',
        between: ['basement', 'security room'],
        allowedStates: ['hidden', 'opened'],
        state: 'hidden',
    },
    'entrance door': {
        state: 'locked',
        allowedStates: ['locked', 'closed', 'opened'],
        type: 'passage',
        between: ['foyer door','outside'],
    }
};

export default passages;