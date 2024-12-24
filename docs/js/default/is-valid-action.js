import { logError } from './error-logging.js';
import isInRootLocation from './is-in-root-location.js';
import print from "./print.js";
//condition = itemId, propertyName, validValue, error message
export default function isValidAction(gameDefinition, conditions) {
    try {
        const { variables } = gameDefinition;
        const conditionFail = conditions.find((condition) => {
            const { item, property, value } = condition;
            if (!variables[item]) {
                logError(gameDefinition, `condition failed because ${item} is not a valid item`);
                return false;
            }
            const itemVariable = variables[item];
            switch (property) {
                case 'location':
                    return itemVariable.location !== value && !isInRootLocation(variables, item, value);
                case 'state':
                    return itemVariable.state !== value;
                default:
                    return itemVariable.state[property] !== value;
            }
        });
        if (conditionFail) {
            const { item, textId } = conditionFail;
            print(gameDefinition, textId, item);
        }
        return !conditionFail;
    }
    catch (error) {
        logError(gameDefinition, `isValidAction failed (${error}): ${JSON.stringify(conditions)}`);
        return false;
    }
}
