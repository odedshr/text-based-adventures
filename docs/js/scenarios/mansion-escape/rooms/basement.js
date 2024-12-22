import print from "../../../default/print.js";
import addAchievement from '../../../default/add-achievement';
const items = {
    basement: { type: 'room' },
    'cellar stairs': {
        type: 'passage',
        between: ['basement', 'kitchen'],
        allowedStates: ['opened'],
        state: 'opened',
    },
    pipe: {
        type: 'item',
        location: 'basement'
    }
};
const actions = [
    {
        input: /\b(?:unlock|open|access|unfasten)\s*(?:the\s*)?(?:vault|safe)\s*(?:door)?\s*(?:using|with|by\s*using)?\s*(?:the\s*)?(?:security\s*badge|badge|keycard|access\s*card)\b/,
        conditions: (_, userId) => [
            { item: userId, property: 'location', value: 'basement', textId: 'location-fail:user' },
            { item: 'security badge', property: 'location', value: userId, textId: 'location-fail:item' },
            { item: 'vault door', property: 'state', value: 'locked', textId: 'vault not locked' }
        ],
        execute(_, gameDefinition, userId) {
            const { variables } = gameDefinition;
            const door = variables['vault door'];
            variables['vault door'] = Object.assign(Object.assign({}, door), { state: 'opened' });
            print(gameDefinition, 'vault is unlocked');
            addAchievement(gameDefinition, userId, 'unlocked vault');
            return false;
        }
    },
    {
        input: /\b(?:use|attach|fit|connect|screw|utilize)\s+(?:red\s+)?(?:water\s+)?valve\s+on\s+pipe\b/,
        conditions: (_, userId) => [
            { item: userId, property: 'location', value: 'basement', textId: 'location-fail:user' },
            { item: 'valve', property: 'location', value: userId, textId: 'location-fail:item' },
        ],
        execute(_, gameDefinition, userId) {
            const { variables } = gameDefinition;
            variables.valve = Object.assign(Object.assign({}, variables['valve']), { location: 'pipe' });
            print(gameDefinition, 'valve screwed to pipe');
            addAchievement(gameDefinition, userId, 'secured valve to pipe');
            return false;
        }
    },
    {
        input: /\b(?:use|turn|activate|open|operate|adjust)\s*(?:the\s*)?(?:water\s*valve|valve)\s*(?:to\s*)?(?:empty|drain|release\s*water\s*from)\s*(?:the\s*)?(?:pool|swimming\s*pool|water)\b/,
        execute(input, gameDefinition, userId) {
            //9 - empty pool to get key to secret room
            const { variables } = gameDefinition;
            variables.pool = Object.assign(Object.assign({}, variables['pool']), { state: 'drained' });
            print(gameDefinition, 'pool drained');
            addAchievement(gameDefinition, userId, 'drained the pool');
            return false;
        }
    },
];
const strings = {
    basement: `A dimly room with a low ceiling and bare cement walls. The air is damp and musty.
    A big pipe runs along the wall, slowly dripping water.
    There's a heavy metal door with keypad lock on the other side of the room.`,
    'cellar stairs': 'A narrow stone staircase spirals down from the pantry into the cool, dark basement.',
    'vault not locked': 'The vault is not locked',
    'vault is unlocked': 'The vault is unlocked!',
    pipe(variables) {
        const valveAttached = (variables.valve.location) === 'pipe';
        return `It's a 30cm pipe. by the dripping you can infer it's a water pipe.${valveAttached ? ` The big red valve is screwed to it.` : ` It seems like the valve is missing though.`}`;
    },
    'valve screwed to pipe': 'You screw the red valve to the pipe. You can now use it to drain the pool!',
    'pool drained': 'You can hear the water being drain out of the pool'
};
export { actions, items, strings, };
