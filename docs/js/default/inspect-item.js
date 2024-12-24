import findByReference from './find-by-reference.js';
import isInRootLocation from './is-in-root-location.js';
import print from "./print.js";
const inspectItemRegExp = /(?:what is|describe|tell me about|look at|examine|inspect)(\s+the)?\s*(\w+)/;
const inspectLocationRegExp = /where is the (.+?)\?|where are the (.+?)\?|what is in my (.+?)\?|what do I have|can you tell me where the (.+?) is\?|is there a (.+?) here|where can I find the (.+?)/;
const inspectInventory = /what's in my (.+?)\?|show me my (.+?)|what do I have in my (.+?)|what's in my inventory\?|can you show me my (.+?)\?|check my (.+?)/;
const actions = [
    {
        input: inspectItemRegExp,
        execute: (gameDefinition, userId, input) => {
            var _a;
            const { variables, strings, references } = gameDefinition;
            const itemName = (_a = input.match(inspectItemRegExp)) === null || _a === void 0 ? void 0 : _a.pop();
            if (!itemName) {
                console.error('inspectItemRegExp: failed to extract item name', input);
                print(gameDefinition, 'unreadable', input);
                return;
            }
            let item = findByReference(gameDefinition, userId, itemName);
            if (!!item) { // it's a variable, make sure it's in the same location as the user
                if (!isInRootLocation(variables, item, variables[userId].location)) {
                    print(gameDefinition, 'not sure where is item', itemName);
                    return;
                }
            }
            if (!item && strings[itemName]) {
                // not a variable, but still has a description
                item = itemName;
            }
            if (!item) {
                console.error('inspectItemRegExp', input, item, itemName, references[itemName]);
                print(gameDefinition, 'not sure what is item', 'item');
                return;
            }
            print(gameDefinition, item);
        }
    },
    {
        input: inspectLocationRegExp,
        execute: (gameDefinition, userId, input) => {
            var _a;
            const { variables } = gameDefinition;
            const itemName = findByReference(gameDefinition, userId, (_a = input.match(inspectLocationRegExp)) === null || _a === void 0 ? void 0 : _a.pop());
            if (!itemName) {
                console.error('inspectItemRegExp: failed to extract item name', input);
                print(gameDefinition, 'unreadable', input);
                return;
            }
            if (!itemName) {
                console.error('inspectLocationRegExp', input, itemName, inspectLocationRegExp.test(input));
                print(gameDefinition, 'not sure what is item', 'item');
                return;
            }
            const item = variables[itemName];
            if (!item) {
                console.error('inspectLocationRegExp', input, itemName, inspectLocationRegExp.test(input));
                print(gameDefinition, 'not sure what is item', itemName);
            }
            else if (item.touched) {
                print(gameDefinition, 'the item is in the location', itemName, item.location);
            }
            else {
                print(gameDefinition, 'not sure where is item', itemName);
            }
            return true;
        }
    },
    {
        input: inspectInventory,
        execute: (gameDefinition, userId, input) => {
            var _a;
            const { variables } = gameDefinition;
            const itemName = findByReference(gameDefinition, userId, (_a = input.match(inspectInventory)) === null || _a === void 0 ? void 0 : _a.pop());
            if (!itemName) {
                console.error('inspectItemRegExp', input, itemName, inspectInventory.test(input));
                print(gameDefinition, 'not sure what is item', 'item');
                return;
            }
            const items = getEverythingIn(gameDefinition.variables, userId);
            if (items.length > 0) {
                print(gameDefinition, 'you have items', items.length > 1 ? items.slice(0, -1).join(', ') + ' and ' + items.slice(-1) : items[0]);
            }
            else {
                print(gameDefinition, 'you have no items');
            }
            return true;
        }
    }
];
const strings = {
    unreadable: `I'm not sure what you mean by 'item'.`,
};
export { actions, strings };
function getEverythingIn(variables, location) {
    const possessions = [];
    const reversedTree = {};
    const queue = [location];
    Object.keys(variables)
        .filter(itemName => variables[itemName].type === 'item') // get only actual types
        .forEach(itemName => {
        const location = variables[itemName].location;
        reversedTree[location] = reversedTree[location] ? [...reversedTree[location], itemName] : [itemName];
    });
    while (queue.length) {
        const item = queue.shift();
        if (item !== location) {
            possessions.push(item);
        }
        queue.push(...reversedTree[item]);
    }
    return possessions;
}
