import { logError } from './error-logging.js';
export default function print(gameDefinition, textId, itemName, locationName) {
    const { strings, variables } = gameDefinition;
    //@ts-ignore
    let value = strings[textId];
    if (typeof value === "function") {
        value = value(variables);
    }
    if (value) {
        if (itemName) {
            value = value.replace(/item/g, itemName);
        }
        if (locationName) {
            value = value.replace(/location/g, locationName);
        }
        if (!variables.console) {
            variables.console = { type: 'console', value: '' };
        }
        variables.console = Object.assign(Object.assign({}, variables.console), { value });
    }
    else {
        logError(gameDefinition, `Unknown textId: ${textId} `);
    }
}
