import findRoomByItem from "./find-room-by-item.js";
import isItemAvailable from "./is-item-available.js";
import isValidAction from "./is-valid-action.js";
import print from "./print.js";
export default function addToInventory(gameDefinition, userId, itemName) {
    const { variables } = gameDefinition;
    // Search for the item in the state.elements
    const item = variables[itemName];
    const itemLocation = findRoomByItem(variables, itemName);
    if (!itemLocation || !isValidAction(gameDefinition, [{ item: userId, property: 'location', value: itemLocation, textId: 'location-fail:user' }])) {
        return;
    }
    if (!item || item.type !== 'item') {
        print(gameDefinition, 'no-item-to-pick-up.js', itemName);
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
    }
    else if (item.canContain) { // item doesn't fit in user inventory but it can contain other items
        if (!isNaN(item.canContain) && (item.canContain > findItemsInLocation(variables, itemName).length)) {
            // item can contain other items and have free space
            const currentlyHeldItemName = Object.keys(variables).find(itemName => variables[itemName].location === userId);
            if (currentlyHeldItemName) {
                variables[currentlyHeldItemName] = Object.assign(Object.assign({}, variables[currentlyHeldItemName]), { location: itemName });
                variables[itemName] = Object.assign(Object.assign({}, variables[itemName]), { location: userId });
                print(gameDefinition, 'you-picked-up-the-item', itemName);
                return;
            }
        }
        print(gameDefinition, 'carrying-too-many-things');
    }
    //TODO: 1 pick up into bag if there is one
    return;
}
function tryToFitItemInContainer(variables, userId, itemName) {
    const freeContainer = itemFitInContainer(variables, userId, itemName);
    if (freeContainer) {
        variables[itemName] = Object.assign(Object.assign({}, variables[itemName]), { location: freeContainer });
    }
    return !!freeContainer;
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
