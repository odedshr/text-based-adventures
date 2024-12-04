import isInRootLocation from './is-in-root-location';
import print from "./print.js";
//condition = itemId, propertyName, validValue, error message
export default function isValidAction(gameDefinition, conditions) {
    try {
        const { variables } = gameDefinition;
        const conditionFail = conditions.find((condition) => {
            const { item, property, value } = condition;
            if (!variables[item]) {
                console.error(`Item ${item} does not exist`);
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
        console.error(error, conditions);
        return false;
    }
    return true;
}
