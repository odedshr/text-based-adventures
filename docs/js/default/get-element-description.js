// return textId (the key of items in "strings")
export default function getElementDescription(gameDefinition, itemName) {
    const { variables } = gameDefinition;
    const item = variables[itemName];
    if (item === undefined) {
        return 'unknown-item';
    }
    if (item.state == undefined) {
        return itemName;
    }
    else if (typeof (item.state) === 'string') {
        return `${itemName}:${item.state}`;
    }
    return `${itemName}:${JSON.stringify(item.state)}`;
}
