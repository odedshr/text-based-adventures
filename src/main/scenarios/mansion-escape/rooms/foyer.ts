import { ItemVariable, Action, RoomVariable, PassageVariable } from '../../../types.js';

const items:{[key:string]:ItemVariable|RoomVariable|PassageVariable } = {
    'foyer': { type: 'room' },
    'grand archway': {
        type: 'passage',
        between: ['foyer', 'hallway'],
        allowedStates: ['opened'],
        state: 'opened',
    },
    'entrance door': {
        state: 'locked',
        allowedStates: ['locked', 'closed', 'opened'],
        type: 'passage',
        between: ['foyer door','outside'],
    },
};

const actions:Action[] = [ 
];

const strings = {
    foyer: 'The grand entrance to the mansion with a sweeping staircase, a chandelier, and a large rug. A coat stand and an umbrella holder are by the door.',
    'grand archway': 'A wide archway framed with ornate molding, allowing the sound of footsteps to echo faintly between the foyer and hallway. A fine runner rug extends into the corridor, welcoming guests deeper into the mansion.',
    'entrance door': 'A pair of heavy oak doors with intricate carvings of vines and flowers. They swing open easily, revealing the warm and inviting foyer beyond.',
}

export {
    actions,
    items,
    strings,
}