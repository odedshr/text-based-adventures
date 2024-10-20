import { Condition, GameDefinition } from './../types';
import { ItemVariable } from "../types";


//condition = itemId, propertyName, validValue, error message
export default function isValidAction(gameDefinition:GameDefinition, conditions:Condition[]):boolean {
    try {
        const { print, variables } = gameDefinition;

        for (const condition in conditions) {
            const { item, property, value, textId } = conditions[condition];
    
            if ((variables[item] as ItemVariable)[property] !== value) {
                print(textId, item);
                return false;
            }
        }
    }
    catch(error) {
        console.error(error, conditions);
        return false;
    }


    return true;
}