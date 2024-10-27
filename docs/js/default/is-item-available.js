export default function isItemAvailable(variables, expectedLocation, itemName) {
    const item = variables[itemName];
    const itemLocation = item.location;
    if (itemLocation === expectedLocation) {
        const container = variables[itemLocation];
        // a bit counter-intuitive, but if canContain===itemName then the item should be hidden from the outside (e.g. key in treasure box)
        // in such scenario the user is expected to use the "pick-item-out-of-container" which doesn't use this method
        return (container.canContain !== itemName);
    }
    else if (itemLocation === undefined) {
        return false;
    }
    return isItemAvailable(variables, expectedLocation, itemLocation);
}
