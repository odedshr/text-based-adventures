import { ItemVariable, GameDefinition, Variables } from "../types";
import findRoomByItem from "./find-room-by-item.js";
import isItemAvailable from "./is-item-available.js";
import isValidAction from "./is-valid-action.js";
import print from "./print.js";

export default function addToInventory(gameDefinition:GameDefinition, userId:string, itemName:string) {
    const { variables } = gameDefinition
    // Search for the item in the state.elements
    const item:ItemVariable = variables[itemName] as ItemVariable;
    const itemLocation = findRoomByItem(variables, itemName);

    if (!itemLocation || !isValidAction(gameDefinition, [{item: userId, property: 'location', value: itemLocation, textId:'location-fail:user'}])) {
        return;
    }

    if (!item || item.type !== 'item') {
        print(gameDefinition, 'no-item-to-pick-up', itemName);
        return;
    }
    
    if (!item.canBeHeld) {
        print(gameDefinition, 'you-cant-pick-up-that');
        return;
    }

    // Check if the item is already with the user
    if (isItemAvailable(variables, userId, itemName)) {
        print(gameDefinition, 'already-have-item', itemName);
        return;
    }

    if (tryToFitItemInContainer(variables, userId, itemName)) {
        print(gameDefinition, 'you-picked-up-the-item', itemName);
        return;
    } else if (item.canContain){ // item doesn't fit in user inventory but it can contain other items
        if (!isNaN(item.canContain  as number) && (item.canContain as number > findItemsInLocation(variables, itemName).length)) {
            // item can contain other items and have free space
            const currentlyHeldItemName = Object.keys(variables).find(
                itemName => (variables[itemName] as ItemVariable).location === userId
            );

            if (currentlyHeldItemName) {
                variables[currentlyHeldItemName] = {...variables[currentlyHeldItemName] as ItemVariable, location: itemName};
                variables[itemName] = {...variables[itemName] as ItemVariable, location: userId};
                print(gameDefinition, 'you-picked-up-the-item', itemName);
                return;
            }
        }

        print(gameDefinition, 'carrying-too-many-things');
    }
   
    //TODO: 1 pick up into bag if there is one

    return;
}

function tryToFitItemInContainer(variables:Variables, userId:string, itemName:string):boolean {
    const freeContainer = itemFitInContainer(variables, userId, itemName);
    if (freeContainer) {
        variables[itemName] = {...variables[itemName] as ItemVariable, location: freeContainer};
    }
    return !!freeContainer;
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
        const itemsInContainer = findItemsInLocation(variables, containerName);

        if (itemsInContainer.length < container.canContain) {
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