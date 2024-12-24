export default function findRoomByItem(variables, itemName) {
    const item = variables[itemName];
    if (item === undefined) {
        return undefined;
    }
    if (item.type === 'room') {
        return itemName;
    }
    return findRoomByItem(variables, item.location);
}
