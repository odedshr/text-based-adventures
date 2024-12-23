import { Condition, GameDefinition, Attributes, ItemVariable } from '../types';
import isInRootLocation from './is-in-root-location.js';
import print from "./print.js";

//condition = itemId, propertyName, validValue, error message
export default function isValidAction(gameDefinition:GameDefinition, conditions:Condition[]):boolean {
    try {
        const { variables } = gameDefinition;
        
        const conditionFail = conditions.find((condition) => {
            const { item, property, value } = condition;
            if (!variables[item]) {
                console.error(`Item ${item} does not exist`);
                return false;
            }
            const itemVariable = (variables[item] as ItemVariable);
            switch (property) {
                case 'location':
                    return itemVariable.location !== value && !isInRootLocation(variables, item, value);
                case 'state':
                    return itemVariable.state !== value;
                default:
                    return (itemVariable.state as Attributes)[property] !== value;
            }
        });

        if (conditionFail) {
            const { item, textId } = conditionFail;
            print(gameDefinition, textId, item);
        }

        return !conditionFail;
    }
    catch(error) {
        console.error(error, conditions);
        return false;
    }


    return true;
}