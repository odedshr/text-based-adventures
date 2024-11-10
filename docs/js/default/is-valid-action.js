import print from "./print.js";
//condition = itemId, propertyName, validValue, error message
export default function isValidAction(gameDefinition, conditions) {
    try {
        const { variables } = gameDefinition;
        return conditions.every(condition => {
            const { item, property, value, textId } = condition;
            const itemVariable = variables[item];
            if (itemVariable) {
                switch (property) {
                    case 'location':
                        if (itemVariable.location === value || isInRootLocation(variables, item, value)) {
                            return true;
                        }
                        break;
                    case 'state':
                        if (itemVariable.state === value) {
                            return true;
                        }
                        break;
                    default:
                        if (itemVariable.state[property] === value) {
                            return true;
                        }
                        break;
                }
            } else {
                console.error(`Unknown item: ${item}`);
            }

            print(gameDefinition, textId, item);
            return false;
        });
    }
    catch (error) {
        console.error(error, conditions);
        return false;
    }
    return true;
}
function isInRootLocation(variables, itemName, container) {
    const itemLocation = variables[itemName].location;
    // if itemLocation is undefined then itemName is a room on its own and we reached as high as we can go
    return itemLocation !== undefined &&
        (variables[itemLocation].location === container || isInRootLocation(variables, itemLocation, container));
}
