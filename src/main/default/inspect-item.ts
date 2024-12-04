import { Action, GameDefinition, ItemVariable, Variables } from "../types";
import findByReference from "./find-by-reference";

import print from "./print.js";

const inspectItemRegExp = /(?:what is|describe|tell me about|look at|examine|inspect) (the|a|an)?\s*(\w+)/;
const inspectLocationRegExp = /where is the (.+?)\?|where are the (.+?)\?|what is in my (.+?)\?|what do I have|can you tell me where the (.+?) is\?|is there a (.+?) here|where can I find the (.+?)/ 
const inspectInventory = /what's in my (.+?)\?|show me my (.+?)|what do I have in my (.+?)|what's in my inventory\?|can you show me my (.+?)\?|check my (.+?)/;

const inspectItemActions:Action[] = [
    {
        input: inspectItemRegExp,
        execute: (input:string, gameDefinition:GameDefinition, userId:string) => {
            const item = findByReference(gameDefinition, userId, input.match(inspectItemRegExp)?.pop());
            if (!item) { 
                console.error('inspectItemRegExp', input, item, input.match(inspectItemRegExp)?.pop(), gameDefinition.references[input.match(inspectItemRegExp)?.pop() as string]);
                print(gameDefinition, 'not sure what is item', 'item');    
                return;
            }

            print(gameDefinition, item);
        }
    },
    {
        input: inspectLocationRegExp,
        execute: (input:string, gameDefinition:GameDefinition, userId:string) => {
            const { variables } = gameDefinition
            const itemName = findByReference(gameDefinition, userId, input.match(inspectLocationRegExp)?.pop());
            
            if (!itemName) { 
                console.error('inspectItemRegExp1', input, itemName, inspectLocationRegExp.test(input));
                print(gameDefinition, 'not sure what is item', 'item');    
                return;
            }
            
            const item = variables[itemName] as ItemVariable;

            if (!item) {
                console.error('inspectItemRegExp2', input, itemName, inspectLocationRegExp.test(input));
                print(gameDefinition, 'not sure what is item', itemName);
            } else if (item.touched) {
                print(gameDefinition,'the item is in the location', itemName, (item as ItemVariable).location);
            } else {
                print(gameDefinition, 'not sure where is item', itemName);
            }

            return true;
        }
    },
    {
        input: inspectInventory,
        execute: (input:string, gameDefinition:GameDefinition, userId:string) => {
            const { variables } = gameDefinition
            const itemName = findByReference(gameDefinition, userId, input.match(inspectInventory)?.pop());
            
            if (!itemName) { 
                console.error('inspectItemRegExp', input, itemName, inspectInventory.test(input));
                print(gameDefinition, 'not sure what is item', 'item');    
                return;
            }

            const items = getEverythingIn(gameDefinition.variables, userId);
            if (items.length > 0) {
                print(gameDefinition, 'you have items', items.length > 1 ? items.slice(0, -1).join(', ') + ' and ' + items.slice(-1) : items[0]);
            } else {
                print(gameDefinition, 'you have no items');
            }

            return true;
        }
    }  
 ];

 export default inspectItemActions;

function getEverythingIn(variables:Variables, location: string) {
    const possessions:string[] = [];
    const reversedTree:{[key:string]:string[]} = {};
    const queue = [location];

    Object.keys(variables)
        .filter(itemName => (variables[itemName] as ItemVariable).type === 'item') // get only actual types
        .forEach(itemName => {
            const location = (variables[itemName] as ItemVariable).location;
            reversedTree[location] = reversedTree[location] ? [...reversedTree[location], itemName] : [itemName];
        })
    
    while (queue.length) {
        const item = queue.shift() as string;
        if (item!==location) {
            possessions.push(item);
        }
        queue.push(...reversedTree[item]);
    }

    return possessions;
}