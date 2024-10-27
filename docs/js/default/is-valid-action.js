//condition = itemId, propertyName, validValue, error message
export default function isValidAction(gameDefinition, conditions) {
    try {
        const { print, variables } = gameDefinition;
        for (const condition in conditions) {
            const { item, property, value, textId } = conditions[condition];
            const itemVariable = variables[item];
            switch (property) {
                case 'location':
                    if (itemVariable.location === value || isInRootLocation(variables, item, value)) {
                        return true;
                    }
                case 'state':
                    if (itemVariable.state === value) {
                        return true;
                    }
                default:
                    if (itemVariable.state[property] === value) {
                        return true;
                    }
            }
            print(textId, item);
            return false;
        }
    }
    catch (error) {
        console.error(error, conditions);
        return false;
    }
    return true;
}
function isInRootLocation(variables, itemName, value) {
    const itemLocation = variables[itemName].location;
    // if itemLocation is undefined then itemName is a room on its own and we reached as high as we can go
    return itemLocation !== undefined &&
        (variables[itemLocation].location === value || isInRootLocation(variables, itemLocation, value));
}
