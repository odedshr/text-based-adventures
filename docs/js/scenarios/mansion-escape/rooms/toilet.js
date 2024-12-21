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
        }
    },
    {
        input: /\b(open|look into) (the)? cistern\b/,
        conditions: (_, userId) => [
            { item: userId, property: 'location', value: 'toilet', textId: 'location-fail:user' },
        ],
        execute: (_, gameDefinition, userId) => print(gameDefinition, 'check cistern')
    }
];
const strings = {
    'toilet': (variables) => `The toilet room is small and functional. It has a sink and cistern, but no mirror.${variables.valve.location === 'toilet' ? ` There's a very bright red water valve on the pipe connected to the cistern.` : ''}`,
    'toilet door': 'A discreet wooden door tucked in a corner of the foyer. Simple in design, it blends in with the walls, leading quietly to the small guest toilet.',
    valve: `Strangely bright-red, the water valve is a mechanism to control the flow of liquid.`,
    cistern: `A tank for storing water, potentially hiding something inside.`,
    'check cistern': `You carefully look into the cistern but there's nothing inside.`,
    sink: `A washbasin that might conceal small objects.`,
    tap: `A simple faucet, sideways control the temperature and up-down control the pressure.`,
    'got water valve': 'You unscrew the red water valve from the pipe and put it in your inventory.',
};
export { actions, items, strings, };
