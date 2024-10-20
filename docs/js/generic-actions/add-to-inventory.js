import findRoomByItem from "./find-room-by-item.js";
import isItemAvailable from "./is-item-available.js";
import isValidAction from "./is-valid-action.js";
export default function addToInventory(gameDefinition, userId, itemName) {
    const { variables, print } = gameDefinition;
    // Search for the item in the state.elements
    const item = variables[itemName];
    const itemLocation = findRoomByItem(variables, itemName);
    if (!isValidAction(gameDefinition, [{ item: userId, property: 'location', value: itemLocation, textId: 'location-fail:user' }])) {
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
    if (itemFitInContainer(variables, userId, itemName) === undefined) {
        print('carrying-too-many-things');
        return true;
    }
    // Update the item's parent to be with the user
    variables[itemName] = Object.assign(Object.assign({}, item), { location: userId });
    //TODO: 1 pick up into bag if there is one
    print('you-picked-up-the-item', itemName);
    return true;
}
function itemFitInContainer(variables, containerName, itemName) {
    const container = variables[containerName];
    if (container.canContain === undefined) {
        return undefined;
    }
    if (container.canContain === itemName) {
        return containerName;
    }
    if (typeof (container.canContain) === 'number') {
        const itemsInContainer = findItemsInLocation(variables, containerName);
        if (itemsInContainer.length < container.canContain) {
            return containerName;
        }
        return itemsInContainer.find(potentialContainer => itemFitInContainer(variables, potentialContainer, itemName));
    }
    return undefined;
}
function findItemsInLocation(variables, location) {
    return Object.keys(variables)
        .filter(item => variables[item].location === location);
}
