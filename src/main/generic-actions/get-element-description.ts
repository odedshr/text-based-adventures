import { GameDefinition, ItemVariable } from '../types.js';

// return textId (the key of items in "strings")
export default function getElementDescription(gameDefinition: GameDefinition, itemName: string) {
    const { variables } = gameDefinition;
    const item = variables[itemName] as ItemVariable;
    if (item===undefined) {
        return 'unknown-item';
    }

    return item.state !== undefined ? `${itemName}:${item.state}` : itemName;
}