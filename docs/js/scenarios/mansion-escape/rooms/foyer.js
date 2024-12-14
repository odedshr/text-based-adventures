import addAchievement from '../../../default/add-achievement.js';
import print from "../../../default/print.js";
const items = {
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
        synonyms: ['main door'],
        between: ['foyer door', 'outside'],
    },
};
const actions = [
    {
        input: /\bunlock main door using master key\b/,
        conditions: (_, userId) => [
            { item: userId, property: 'location', value: 'foyer', textId: 'location-fail:user' },
            { item: 'key', property: 'location', value: userId, textId: 'location-fail:item' },
            { item: 'entrance door', property: 'state', value: 'locked', textId: 'door is not locked' },
        ],
        execute: (_, gameDefinition, userId) => {
            const { variables } = gameDefinition;
            const entranceDoor = variables['entrance door'];
            variables['entrance door'] = Object.assign(Object.assign({}, entranceDoor), { state: 'opened' });
            addAchievement(gameDefinition, userId, 'unlocked main door');
            print(gameDefinition, 'unlocked main door');
        },
    },
    {
        input: /\bleave mansion\b/,
        conditions: (_, userId) => [
            { item: userId, property: 'location', value: 'foyer', textId: 'location-fail:user' },
            { item: 'entrance door', property: 'state', value: 'opened', textId: 'door is locked' },
        ],
        execute: (_, gameDefinition, userId) => {
            const { variables } = gameDefinition;
            const entranceDoor = variables['entrance door'];
            variables['entrance door'] = Object.assign(Object.assign({}, entranceDoor), { state: 'opened' });
            addAchievement(gameDefinition, userId, 'left the mansion');
            print(gameDefinition, 'left mansion');
        },
    }
];
const strings = {
    foyer: 'The grand entrance to the mansion with a sweeping staircase, a chandelier, and a large rug. A coat stand and an umbrella holder are by the door.',
    'grand archway': 'A wide archway framed with ornate molding, allowing the sound of footsteps to echo faintly between the foyer and hallway. A fine runner rug extends into the corridor, welcoming guests deeper into the mansion.',
    'entrance door': 'A pair of heavy oak doors with intricate carvings of vines and flowers. They swing open easily, revealing the warm and inviting foyer beyond.',
    'door is locked': 'The door is locked.',
    'door is not locked': 'The door is not locked.',
    'unlocked main door': 'You unlock the main door.',
    'left mansion'(variables) {
        return `You left the mansion.`;
    }
};
export { actions, items, strings, };
