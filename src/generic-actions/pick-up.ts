import { Variables, ItemVariable } from "../types";

function pickUpItem(input:String, variables:Variables, userId:string) {
    const pickUpVerbs = /pick up|take|grab|get|retrieve|can i take|i’ll grab|i want to pick up|take that/i;  // Regular expression to match "pick up" commands

    // Check if the input matches any of the pick-up patterns
    const match = input.match(pickUpVerbs);
    if (match) {
        // Extract the item name from the input
        const itemName = input.replace(pickUpVerbs, '').replace(/^the /,'').trim();  // Remove the verb part, leaving just the item

        // Search for the item in the state.elements
        const item:ItemVariable = variables[itemName] as ItemVariable;
        
        if (item && item.type === 'item') {
            if (!item.canBeHeld) {
                return 'You can\'t pick up that.';
            }

            // Check if the item is already with the user
            if (isItemSomewhereInLocation(variables, userId, item)) {
                return `You already have the ${itemName}.`;
            }

            if (!itemFitInContainer(variables, userId, itemName)) {
                return `You're carrying too many things`;
            }
            
            // Update the item's parent to be with the user
            item.location = userId;
            return `You pick up the ${itemName}.`;
        } else {
            return `There is no ${itemName} to pick up.`;
        }
    }

    return undefined;
}

function isItemSomewhereInLocation(variables:Variables, expectedLocation:string, item:ItemVariable) {
    const itemLocation = item.location;
    
    if (itemLocation === expectedLocation) {
        return true;
    } else if (itemLocation === undefined) {
        return false
    }

    return isItemSomewhereInLocation(variables, expectedLocation, variables[itemLocation] as ItemVariable);
}


function itemFitInContainer(variables:Variables, containerName:string, itemName:string):string|undefined {

    const container = variables[containerName] as ItemVariable;

    if (container.canContain=== undefined) {
        return undefined;
    }

    if (container.canContain === itemName){
        return containerName;
    }

    if (typeof(container.canContain) === 'number') {
        const itemsInContainer = findItemsInLocation(variables, containerName)
        if (container.canContain < itemsInContainer.length) {
            return containerName;
        }

        return itemsInContainer.find(potentialContainer => itemFitInContainer(variables, potentialContainer, itemName));
    }

    return undefined
}

function findItemsInLocation(variables:Variables, location:string) {
    return Object.keys(variables)
    .filter(item => (variables[item] as ItemVariable).location === location);
}

export {
    isItemSomewhereInLocation,
    pickUpItem
}