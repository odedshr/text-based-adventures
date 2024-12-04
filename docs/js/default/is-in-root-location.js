export default function isInRootLocation(variables, itemName, container) {
    const itemLocation = variables[itemName] ? variables[itemName].location : undefined;
    // if itemLocation is undefined then itemName is a room on its own and we reached as high as we can go
    return itemLocation !== undefined &&
        (itemLocation === container || isInRootLocation(variables, itemLocation, container));
}
;
