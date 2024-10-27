import { ItemVariable, GameDefinition, Variables } from "../types";
import findRoomByItem from "./find-room-by-item.js";
import isItemAvailable from "./is-item-available.js";
import isValidAction from "./is-valid-action.js";

export default function addToInventory(gameDefinition:GameDefinition, userId:string, itemName:string) {
    const { variables, print } = gameDefinition
    // Search for the item in the state.elements
    const item:ItemVariable = variables[itemName] as ItemVariable;
    const itemLocation = findRoomByItem(variables, itemName);

    if (!isValidAction(gameDefinition, [{item: userId, property: 'location', value: itemLocation, textId:'location-fail:user'}])) {
        return true;
    }

    if (!item || item.type !== 'item') {
        print('no-item-to-pick-up', itemName);
        return true;
    }
    
    if (!item.canBeHeld) {
        print('you-cant-pick-up-that');
        return true;
    }

    // Check if the item is already with the user
    if (isItemAvailable(variables, userId, itemName)) {
        print('already-have-item', itemName);
        return true;
    }

    if (itemFitInContainer(variables, userId, itemName)===undefined) {
        print('carrying-too-many-things');
        return true;
    }
    
    // Update the item's parent to be with the user
    variables[itemName] = {...item, location: userId};
    //TODO: 1 pick up into bag if there is one
    print('you-picked-up-the-item', itemName);
    return true;
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