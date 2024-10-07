import { GameDefinition, ItemVariable } from '../types.js';

export default function getElementDescription(gameDefinition: GameDefinition, itemName: string) {
    const { strings, variables } = gameDefinition;
    const item = variables[itemName] as ItemVariable;
    if (item===undefined) {
        return strings['unknown-item'];
    }

    return strings[item.state !== undefined ? `${itemName}:${item.state}` : itemName];
}