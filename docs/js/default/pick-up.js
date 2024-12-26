import addToInventory from './add-to-inventory.js';
import findByReference from './find-by-reference.js';
import print from './print.js';
import { logError } from './error-logging.js';
const items = {};
const pickUpItem = /(?:pick up|take|grab|get|take|retrieve|can i take|i'll grab|i want to pick up|take that)\s+(.+)/; // Regular expression to match 'pick up' commands
const pickUpItemFromLocation = /(?:pick up|take|grab|get|take|retrieve|can i take|i'll grab|i want to pick up|take that)\s+(.+) from (.+)/; // Regular expression to match 'pick up' commands
const actions = [
    {
        input: pickUpItemFromLocation,
        execute: (gameDefinition, userId, input) => {
            const match = input.match(pickUpItemFromLocation);
            if (!match) {
                logError(gameDefinition, input);
                print(gameDefinition, 'not sure what is item');
                return;
            }
            const [_, itemRef, locationRef] = match;
            const item = findByReference(gameDefinition, userId, itemRef);
            if (!item) {
                logError(gameDefinition, input);
                print(gameDefinition, 'picking item not helpful', itemRef);
                return;
            }
            const location = findByReference(gameDefinition, userId, locationRef);
            if (!location) {
                logError(gameDefinition, input);
                print(gameDefinition, 'not sure what is item', locationRef);
                return;
            }
            if (gameDefinition.variables[item].location !== location) {
                print(gameDefinition, 'item not in location', item, location);
                return;
            }
            return addToInventory(gameDefinition, userId, item);
        }
    },
    {
        input: /(?:pick up|take|grab|get|take|retrieve|can i take|i'll grab|i want to pick up)\s+(a )?book/,
        execute: (gameDefinition, userId, input) => {
            print(gameDefinition, 'need to be more specific');
        }
    },
    {
        input: pickUpItem,
        execute: (gameDefinition, userId, input) => {
            var _a;
            const match = (_a = input.match(pickUpItem)) === null || _a === void 0 ? void 0 : _a.pop();
            if (!match) {
                logError(gameDefinition, input);
                print(gameDefinition, 'not sure what is item');
                return;
            }
            const item = findByReference(gameDefinition, userId, match);
            if (!item) {
                logError(gameDefinition, input);
                print(gameDefinition, 'picking item not helpful', match);
                return;
            }
            // addToInventory will verify the item can be picked up and that it's in the same room as the user  
            return addToInventory(gameDefinition, userId, item);
        }
    },
    {
        input: /(pick|pickup)\s+(.+)/,
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
    'item not in location': 'The item is not in the location.',
    'need to be more specific': 'You need to be more specific.',
    'picking item not helpful': `Picking up item will not help you (trust me).`
};
export { actions, items, strings };
