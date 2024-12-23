import findByReference from './find-by-reference.js';
import print from "./print.js";
const inspectItemRegExp = /(?:what is|describe|tell me about|look at|examine|inspect) (the|a|an)?\s*(\w+)/;
const inspectLocationRegExp = /where is the (.+?)\?|where are the (.+?)\?|what is in my (.+?)\?|what do I have|can you tell me where the (.+?) is\?|is there a (.+?) here|where can I find the (.+?)/;
const inspectInventory = /what's in my (.+?)\?|show me my (.+?)|what do I have in my (.+?)|what's in my inventory\?|can you show me my (.+?)\?|check my (.+?)/;
const inspectItemActions = [
    {
        input: inspectItemRegExp,
        execute: (input, gameDefinition, userId) => {
            var _a, _b, _c;
            const item = findByReference(gameDefinition, userId, (_a = input.match(inspectItemRegExp)) === null || _a === void 0 ? void 0 : _a.pop());
            if (!item) {
                console.error('inspectItemRegExp', input, item, (_b = input.match(inspectItemRegExp)) === null || _b === void 0 ? void 0 : _b.pop(), gameDefinition.references[(_c = input.match(inspectItemRegExp)) === null || _c === void 0 ? void 0 : _c.pop()]);
                print(gameDefinition, 'not sure what is item', 'item');
                return;
            }
            print(gameDefinition, item);
        }
    },
    {
        input: inspectLocationRegExp,
        execute: (input, gameDefinition, userId) => {
            var _a;
            const { variables } = gameDefinition;
            const itemName = findByReference(gameDefinition, userId, (_a = input.match(inspectLocationRegExp)) === null || _a === void 0 ? void 0 : _a.pop());
            if (!itemName) {
                console.error('inspectItemRegExp1', input, itemName, inspectLocationRegExp.test(input));
                print(gameDefinition, 'not sure what is item', 'item');
                return;
            }
            const item = variables[itemName];
            if (!item) {
                console.error('inspectItemRegExp2', input, itemName, inspectLocationRegExp.test(input));
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
        execute: (input, gameDefinition, userId) => {
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
export default inspectItemActions;
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
