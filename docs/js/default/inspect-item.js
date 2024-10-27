import getElementDescription from "./get-element-description.js";
const inspectItemRegExp = /(?:what is|describe|tell me about|look at|examine|inspect) (the|a|an)?\s*(\w+)/;
const inspectLocationRegExp = /where is the (.+?)\?|where are the (.+?)\?|what is in my (.+?)\?|what do I have|can you tell me where the (.+?) is\?|is there a (.+?) here|where can I find the (.+?)/;
const inspectInventory = /what's in my (.+?)\?|show me my (.+?)|what do I have in my (.+?)|what's in my inventory\?|can you show me my (.+?)\?|check my (.+?)/;
const inspectItemActions = [
    {
        input: inspectItemRegExp,
        execute: (input, gameDefinition, userId) => {
            const { print } = gameDefinition;
            const match = input.match(inspectItemRegExp);
            if (!match) {
                return false;
            }
            print(getElementDescription(gameDefinition, match[2]));
            return true;
        }
    },
    {
        input: inspectLocationRegExp,
        execute: (input, gameDefinition, userId) => {
            const { variables, print } = gameDefinition;
            const match = input.match(inspectLocationRegExp);
            if (!match) {
                return false;
            }
            const itemName = match[2];
            const item = variables[itemName];
            if (!item) {
                print('not sure what is item', itemName);
            }
            else if (item.touched) {
                print('the item is in the location', itemName, item.location);
            }
            else {
                print('not sure where is item', itemName);
            }
            return true;
        }
    },
    {
        input: inspectInventory,
        execute: (input, gameDefinition, userId) => {
            const { print } = gameDefinition;
            const match = input.match(inspectInventory);
            if (!match) {
                return false;
            }
            const items = getEverythingIn(gameDefinition.variables, userId);
            if (items.length > 0) {
                print('you have items', items.length > 1 ? items.slice(0, -1).join(', ') + ' and ' + items.slice(-1) : items[0]);
            }
            else {
                print('you have no items');
            }
            return true;
        }
    }
];
export default inspectItemActions;
// export default function inspectItem(input:string, gameDefinition:GameDefinition, userId: string) {
//     const { variables } = gameDefinition;
//     let itemName = isSpatialQuestion(input);
//     if (!!itemName) {
//         const item = variables[itemName] as ItemVariable;
//         return item
//         ? (item.touched ? `The ${itemName} is in ${item.location}.` : `I'm not sure where the ${itemName} is.`) 
//         : `I'm not sure what the ${itemName} is.`
//     }
//     if (isInspectInventoryQuestion(input, variables)) {
//         return listEverythingIn(variables, userId);
//     }
//     itemName = isInspectQuestion(input);
//     if (!itemName) {
//         return undefined;
//     }
//     const userLocation = (variables[userId] as PlayerVariable).location;
//     // Check if the object is in the player's inventory
//     const theItem = variables[itemName] as ItemVariable
//     if (theItem && isItemAvailable(variables, userLocation, itemName)) {
//         return getElementDescription(gameDefinition, itemName) || "You see nothing special about it.";
//     }
//     return `You don't see any ${itemName} anywhere`;
// }
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
