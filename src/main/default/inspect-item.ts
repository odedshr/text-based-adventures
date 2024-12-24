import { Action, GameDefinition, ItemVariable, PlayerVariable, Variables } from '../types';
import findByReference from './find-by-reference.js';
import isInRootLocation from './is-in-root-location.js';
import { logError } from './error-logging.js';

import print from "./print.js";

const inspectItemRegExp = /(?:what is|describe|tell me about|look at|examine|inspect)(\s+the)?\s*(\w+)/;
const inspectLocationRegExp = /where is the (.+?)\?|where are the (.+?)\?|what is in my (.+?)\?|what do I have|can you tell me where the (.+?) is\?|is there a (.+?) here|where can I find the (.+?)/ 
const inspectInventory = /what's in my (.+?)\?|show me my (.+?)|what do I have in my (.+?)|what's in my inventory\?|can you show me my (.+?)\?|check my (.+?)/;

const actions:Action[] = [
    {
        input: inspectItemRegExp,
        execute: (gameDefinition:GameDefinition, userId:string, input:string) => {
            const { variables, strings, references } = gameDefinition;
            const itemName = input.match(inspectItemRegExp)?.pop() as string;

            if (!itemName) {
                logError(gameDefinition, input);
                print(gameDefinition, 'unreadable', input);    
                return;
            }

            let item = findByReference(gameDefinition, userId, itemName);
            if (!!item) { // it's a variable, make sure it's in the same location as the user
                if (!isInRootLocation(variables,item, (variables[userId] as PlayerVariable).location)) {
                    print(gameDefinition, 'not sure where is item', itemName);
                    return;
                }
            }

            if (!item && strings[itemName]) {
                // not a variable, but still has a description
                item = itemName;
            }

            if (!item) {
                logError(gameDefinition, input);
                print(gameDefinition, 'not sure what is item', 'item');    
                return;
            }

            print(gameDefinition, item);
        }
    },
    {
        input: inspectLocationRegExp,
        execute: (gameDefinition:GameDefinition, userId:string, input:string) => {
            const { variables } = gameDefinition
            const itemName = findByReference(gameDefinition, userId, input.match(inspectLocationRegExp)?.pop());
            if (!itemName) {
                logError(gameDefinition, input);
                print(gameDefinition, 'unreadable', input);    
                return;
            }

            if (!itemName) { 
                logError(gameDefinition, input);
                print(gameDefinition, 'not sure what is item', 'item');    
                return;
            }
            
            const item = variables[itemName] as ItemVariable;

            if (!item) {
                logError(gameDefinition, input);
                print(gameDefinition, 'not sure what is item', itemName);
            } else if (item.touched) {
                print(gameDefinition,'the item is in the location', itemName, (item as ItemVariable).location);
            } else {
                print(gameDefinition, 'not sure where is item', itemName);
            }
        }
    },
    {
        input: inspectInventory,
        execute: (gameDefinition:GameDefinition, userId:string, input:string) => {
            const { variables } = gameDefinition
            const itemName = findByReference(gameDefinition, userId, input.match(inspectInventory)?.pop());
            
            if (!itemName) { 
                logError(gameDefinition, input);
                print(gameDefinition, 'not sure what is item', 'item');    
                return;
            }

            const items = getEverythingIn(gameDefinition.variables, userId);
            if (items.length > 0) {
                print(gameDefinition, 'you have items', items.length > 1 ? items.slice(0, -1).join(', ') + ' and ' + items.slice(-1) : items[0]);
            } else {
                print(gameDefinition, 'you have no items');
            }
        }
    }  
 ];

const strings = {
     unreadable: `I'm not sure what you mean by 'item'.`,
}

export { 
    actions, 
    strings
};

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