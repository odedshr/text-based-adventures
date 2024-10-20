export default function findRoomByItem(variables, itemName) {
    const item = variables[itemName];
    if (item.type === 'room') {
        return itemName;
    }
    return findRoomByItem(variables, item.location);
}
