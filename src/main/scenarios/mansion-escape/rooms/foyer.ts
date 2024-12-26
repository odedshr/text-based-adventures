import { ItemVariable, PassageVariable, GameDefinition, Variables, PuzzlePiece } from '../../../types.js';
import addAchievement from '../../../default/add-achievement.js';
import print from '../../../default/print.js';

const foyer:PuzzlePiece = {
    variables: {
        'foyer': { type: 'room' },
        'entrance door': {
            type: 'passage',
            in: 'foyer',
            out: 'outside',
            state: 'locked',
            allowedStates: ['locked', 'closed', 'opened'],
            synonyms: ['front door','main door', 'mansion door'],
        },
    },
    actions: [
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
    ],
    strings: {
        foyer: (_:Variables) => `The grand entrance to the mansion with a grand archway to the hallway, a chandelier, and a large rug.
        A coat stand and an empty umbrella holder are by the door. The entrance door is what stands between you and freedom.
        There is another door that leads to the dining room and a parlor door that leads to the living room.
        A small door on the side leads to the toilet.`,
        chandelier: 'A large chandelier hangs from the ceiling, but it is not lit.',
        'coat stand': 'A coat stand with a few coats hanging on it.',
        'umbrella holder': 'An empty umbrella holder.',
        'entrance door': (variables:Variables) =>  `A pair of heavy oak doors with intricate carvings of vines and flowers. 
        ${ (variables['entrance door'] as ItemVariable).state === 'locked' ? 'Alas, the door is locked.' : 'The door is not locked. Your freedom awaits.' }`,
        'unlocked main door': 'You unlock the main door.',
    }
}

export default foyer;