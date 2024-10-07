function pickUpItem(input, variables, userId) {
    const pickUpVerbs = /pick up|take|grab|get|retrieve|can i take|i’ll grab|i want to pick up|take that/i; // Regular expression to match "pick up" commands
    // Check if the input matches any of the pick-up patterns
    const match = input.match(pickUpVerbs);
    if (match) {
        // Extract the item name from the input
        const itemName = input.replace(pickUpVerbs, '').replace(/^the /, '').trim(); // Remove the verb part, leaving just the item
        // Search for the item in the state.elements
        const item = variables[itemName];
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
        }
        else {
            return `There is no ${itemName} to pick up.`;
        }
    }
    return undefined;
}
function isItemSomewhereInLocation(variables, expectedLocation, item) {
    const itemLocation = item.location;
    if (itemLocation === expectedLocation) {
        return true;
    }
    else if (itemLocation === undefined) {
        return false;
    }
    return isItemSomewhereInLocation(variables, expectedLocation, variables[itemLocation]);
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
        if (container.canContain < itemsInContainer.length) {
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
export { isItemSomewhereInLocation, pickUpItem };
