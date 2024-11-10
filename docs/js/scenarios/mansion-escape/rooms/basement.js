import print from "../../../default/print.js";
import addAchievement from '../../../default/add-achievement';
const items = {
    'basement': { type: 'room' },
    'vault door': {
        type: 'passage',
        between: ['basement', 'security room'],
        allowedStates: ['locked', 'closed', 'opened'],
        state: 'locked',
    },
};
const actions = [
    {
        input: /\b(?:use|turn|activate|open|operate|adjust)\s*(?:the\s*)?(?:water\s*valve|valve)\s*(?:to\s*)?(?:empty|drain|release\s*water\s*from)\s*(?:the\s*)?(?:pool|swimming\s*pool|water)\b/,
        execute(input, gameDefinition, userId) {
            //9 - empty pool to get key to secret room
            const { variables } = gameDefinition;
            print(gameDefinition, 'not-yet-implemented');
            return false;
        }
    },
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
    }
];
const strings = {
    basement: 'A dimly lit, musty room filled with old furniture, storage boxes, and tools. The air is cool, and the walls are lined with exposed brick.',
    'vault not locked': 'The vault is not locked',
    'vault is unlocked': 'The vault is unlocked!',
};
export { actions, items, strings, };
