// return textId (the key of items in "strings")
export default function getElementDescription(gameDefinition, itemName) {
    const { variables } = gameDefinition;
    const item = variables[itemName];
    if (item === undefined) {
        return 'unknown-item';
    }
    return item.state !== undefined ? `${itemName}:${item.state}` : itemName;
}
