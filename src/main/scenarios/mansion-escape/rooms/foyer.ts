import { ItemVariable, Action, RoomVariable, PassageVariable, GameDefinition, Variable, Variables, PlayerVariable, Attributes } from '../../../types.js';
import addAchievement from '../../../default/add-achievement.js';
import isInRootLocation from '../../../default/is-in-root-location.js';
import print from '../../../default/print.js';

const items:{[key:string]:ItemVariable|RoomVariable|PassageVariable } = {
    'foyer': { type: 'room' },
    'entrance door': {
        state: 'locked',
        allowedStates: ['locked', 'closed', 'opened'],
        type: 'passage',
        synonyms: ['front door','main door', 'mansion door'],
        between: ['foyer','outside'],
    },
};

const actions:Action[] = [
    {
        input: /\bunlock main door using master key\b/,
        conditions: (_, userId) => [
            { item: userId, property: 'location', value: 'foyer', textId:'location-fail:user'},
            { item: 'key', property: 'location', value: userId, textId:'location-fail:item'},
            { item: 'entrance door', property: 'state', value: 'locked', textId:'door is not locked'},
        ],
        execute: (gameDefinition:GameDefinition, userId:string,_:string) => {
            const { variables } = gameDefinition;
            const entranceDoor = variables['entrance door'];
            variables['entrance door'] = { ...entranceDoor, state: 'opened' } as PassageVariable;
            addAchievement(gameDefinition, userId, 'unlocked main door');
            print(gameDefinition, 'unlocked main door');
        },
    },
];

const strings = {
    foyer: (variables:Variables) => `The grand entrance to the mansion with a sweeping staircase, a chandelier, and a large rug.
    A coat stand and an empty umbrella holder are by the door.`,
    'entrance door': (variables:Variables) =>  `A pair of heavy oak doors with intricate carvings of vines and flowers. 
    ${ (variables['entrance door'] as ItemVariable).state === 'locked' ? 'Alas, the door is locked.' : 'The door is not locked. Your freedom awaits.' }`,
    'unlocked main door': 'You unlock the main door.',
}

export {
    actions,
    items,
    strings,
}