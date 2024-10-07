import { GameDefinition, ItemVariable, PlayerVariable, Variables } from "../types";

import getElementDescription from "./get-element-description.js";
import { isItemSomewhereInLocation } from "./pick-up.js";

function isInspectQuestion(input:string) {
    const objectRegex = /(?:what is|describe|tell me about|look at|examine|inspect) (the|a|an)?\s*(\w+)/;
    const match = input.match(objectRegex);

    return match ? match[2] : false;
}

function isSpatialQuestion(input:string) {
    // Regular expression to match questions about the location of items
    const spatialQuestions = /where is the (.+?)\?|where are the (.+?)\?|what is in my (.+?)\?|what do I have|can you tell me where the (.+?) is\?|is there a (.+?) here|where can I find the (.+?)/i;

    // Test if the input matches the spatial question patterns
    const match = input.match(spatialQuestions);
    
    // If a match is found, extract the item name from the capturing groups
    if (match) {
        // The item name is captured in the first non-null group
        for (let i = 1; i < match.length; i++) {
            if (match[i]) {
                return match[i].trim();  // Return the item name, trimming any whitespace
            }
        }
    }

    return false;  // Return false if no spatial question is found
}


function isInspectInventoryQuestion(input:string, state:any) {
    // Regular expression to match questions about the user's inventory
    const inventoryQuestions = /what's in my (.+?)\?|show me my (.+?)|what do I have in my (.+?)|what's in my inventory\?|can you show me my (.+?)\?|check my (.+?)/i;

    // Test if the input matches the inventory question patterns
    const match = input.match(inventoryQuestions);
    
    // If a match is found, extract the type of inventory from the capturing groups
    if (match) {
        // The inventory type is captured in the first non-null group
        for (let i = 1; i < match.length; i++) {
            if (match[i]) {
                return match[i].trim()===state.inventoryKeyword;
            }
        }
    }

    return false;  // Return null if no inventory question is found
}

export default function inspectItem(input:string, gameDefinition:GameDefinition, userId: string) {
    const { variables } = gameDefinition;
    let itemName = isSpatialQuestion(input);

    if (!!itemName) {
        const item = variables[itemName] as ItemVariable;
        return item
        ? (item.touched ? `The ${itemName} is in ${item.location}.` : `I'm not sure where the ${itemName} is.`) 
        : `I'm not sure what the ${itemName} is.`
    }

    if (isInspectInventoryQuestion(input, variables)) {
        return listEverythingIn(variables, userId);
    }

    itemName = isInspectQuestion(input);
    if (!itemName) {
        return undefined;
    }

    const userLocation = (variables[userId] as PlayerVariable).location;

    // Check if the object is in the player's inventory
    const theItem = variables[itemName] as ItemVariable
    if (theItem && isItemSomewhereInLocation(variables, userLocation, theItem)) {
        return getElementDescription(gameDefinition, itemName) || "You see nothing special about it.";
    }

    return `You don't see any ${itemName} anywhere`;
}


function listEverythingIn(variables:Variables, location: string) {
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

    return possessions.length > 0 
    ? `so far you got ${possessions.join(", ")}.` 
    : `You're kind empty handed right now'`;
}