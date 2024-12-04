import addAchievement from '../../../default/add-achievement.js';
import addToInventory from '../../../default/add-to-inventory.js';
import print from "../../../default/print.js";
const items = {
    'toilet': { type: 'room' },
    'toilet door': {
        type: 'passage',
        between: ['foyer', 'toilet'],
        allowedStates: ['opened'],
        state: 'opened',
    },
    valve: {
        type: 'item',
        location: 'toilet',
        canBeHeld: true,
        synonyms: ['red valve', 'red water valve', 'water valve']
    },
    cistern: {
        type: 'item',
        location: 'toilet',
    },
    sink: {
        type: 'item',
        location: 'toilet',
    },
    tap: {
        type: 'item',
        location: 'toilet',
        canContain: 'water valve',
        state: 'turned-off',
        synonyms: ['faucet', 'water tap']
    }
};
const actions = [
    {
        input: /\b(?:unscrew|pick\s+(?:up)?)\s+(?:red\s+)?(?:water\s+)?valve\b/,
        conditions: (_, userId) => [
            { item: userId, property: 'location', value: 'toilet', textId: 'location-fail:user' },
            { item: 'valve', property: 'location', value: 'toilet', textId: 'location-fail:item' },
        ],
        execute: (_, gameDefinition, userId) => {
            addToInventory(gameDefinition, userId, 'valve');
            print(gameDefinition, 'got water valve');
            addAchievement(gameDefinition, userId, 'picked up water valve');
            return true;
        }
    }
];
const strings = {
    'toilet': 'The toilet room is small and functional. The sink is clean and well-maintained, and the tap is turned off.',
    'toilet door': 'A discreet wooden door tucked in a corner of the foyer. Simple in design, it blends in with the walls, leading quietly to the small guest toilet.',
    'got water valve': 'You unscrew the red water valve from the pipe and put it in your inventory.',
};
export { actions, items, strings, };
