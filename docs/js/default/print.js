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
        variables.console = { type: 'console', value };
    }
    else {
        console.error(`Unknown textId: ${textId} `);
    }
}