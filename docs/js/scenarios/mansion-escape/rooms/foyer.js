import addAchievement from '../../../default/add-achievement.js';
import print from '../../../default/print.js';
const items = {
    'foyer': { type: 'room' },
    'entrance door': {
        state: 'locked',
        allowedStates: ['locked', 'closed', 'opened'],
        type: 'passage',
        synonyms: ['front door', 'main door', 'mansion door'],
        between: ['foyer', 'outside'],
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
        execute: (gameDefinition, userId, _) => {
            const { variables } = gameDefinition;
            const entranceDoor = variables['entrance door'];
            variables['entrance door'] = Object.assign(Object.assign({}, entranceDoor), { state: 'opened' });
            addAchievement(gameDefinition, userId, 'unlocked main door');
            print(gameDefinition, 'unlocked main door');
        },
    },
];
const strings = {
    foyer: (variables) => `The grand entrance to the mansion with a sweeping staircase, a chandelier, and a large rug.
    A coat stand and an empty umbrella holder are by the door.`,
    'entrance door': (variables) => `A pair of heavy oak doors with intricate carvings of vines and flowers. 
    ${variables['entrance door'].state === 'locked' ? 'Alas, the door is locked.' : 'The door is not locked. Your freedom awaits.'}`,
    'unlocked main door': 'You unlock the main door.',
};
export { actions, items, strings, };
