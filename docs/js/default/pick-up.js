import addToInventory from './add-to-inventory.js';
import findByReference from './find-by-reference.js';
import print from './print.js';
import { logError } from './error-logging.js';
const items = {};
const pickUpItem = /(pick up|take|grab|get|take|retrieve|can i take|i'll grab|i want to pick up|take that)\s+(.+)/; // Regular expression to match 'pick up' commands
const actions = [
    {
        input: pickUpItem,
        execute: (gameDefinition, userId, input) => {
            var _a;
            const item = findByReference(gameDefinition, userId, (_a = input.match(pickUpItem)) === null || _a === void 0 ? void 0 : _a.pop());
            if (!item) {
                logError(gameDefinition, input);
                print(gameDefinition, 'not sure what is item');
                return;
            }
            if (gameDefinition.variables[item].canBeHeld === false) {
                print(gameDefinition, 'you can\'t pick that up');
                return;
            }
            // addToInventory will verify the item can be picked up and that it's in the same room as the user  
            return addToInventory(gameDefinition, userId, item);
        }
    },
    {
        input: /pick\s+(.+)/,
        execute: (gameDefinition, userId, input) => {
            print(gameDefinition, 'did you mean pick up');
        }
    },
];
const strings = {
    'no-item-to-pick-up.js': `I don't know what the item is.`,
    'you-cant-pick-up-that': `You can't pick that up.`,
    'already-have-item': `You already have the item.`,
    'carrying-too-many-things': `You're carrying too many things`,
    'you-picked-up-the-item': 'You picked up the item.',
    'did you mean pick up': 'Did you mean "pick up"?',
};
export { actions, items, strings };
