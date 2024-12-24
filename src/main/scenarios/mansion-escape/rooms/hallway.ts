import { ItemVariable, Action, RoomVariable, PassageVariable } from '../../../types.js';

const items:{[key:string]: ItemVariable|RoomVariable|PassageVariable } = {
    'hallway': { type: 'room' },
    'grand archway': {
        type: 'passage',
        between: ['foyer', 'hallway'],
        allowedStates: ['opened'],
        state: 'opened',
    },
};

const actions:Action[] = [
];

const strings = {
    hallway: 'A long corridor lined with portraits and elegant sconces. The soft carpet muffles footsteps, and several doors lead off into other rooms.',
    'grand archway': 'A wide archway framed with ornate molding, allowing the sound of footsteps to echo faintly between the foyer and hallway.',
}

export {
    actions,
    items,
    strings,
}