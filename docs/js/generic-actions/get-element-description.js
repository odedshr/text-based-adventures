export default function getElementDescription(gameDefinition, itemName) {
    const { strings, variables } = gameDefinition;
    const item = variables[itemName];
    if (item === undefined) {
        return strings['unknown-item'];
    }
    return strings[item.state !== undefined ? `${itemName}:${item.state}` : itemName];
}
