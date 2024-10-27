import { Condition, GameDefinition, Variables, Attributes, ItemVariable } from '../types';

//condition = itemId, propertyName, validValue, error message
export default function isValidAction(gameDefinition:GameDefinition, conditions:Condition[]):boolean {
    try {
        const { print, variables } = gameDefinition;

        for (const condition in conditions) {
            const { item, property, value, textId } = conditions[condition];
            const itemVariable = (variables[item] as ItemVariable);

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
                    if ((itemVariable.state as Attributes)[property] === value) {
                        return true;
                    }
            }

            print(textId, item);
            return false;
        }
    }
    catch(error) {
        console.error(error, conditions);
        return false;
    }


    return true;
}

function isInRootLocation(variables:Variables, itemName:string, value:string):boolean {

    const itemLocation = (variables[itemName] as ItemVariable).location;
    // if itemLocation is undefined then itemName is a room on its own and we reached as high as we can go

    return itemLocation !== undefined && 
            ((variables[itemLocation] as ItemVariable).location === value || isInRootLocation(variables, itemLocation, value));
}