import { GameDefinition, GetStringMethod } from "../types";

export default function print(gameDefinition: GameDefinition, textId:string, itemName?:string, locationName?: string) {
    const { strings, variables } = gameDefinition;
    //@ts-ignore
    let value:string = strings[textId];
    if (typeof(value as unknown as GetStringMethod) === "function") {
        value = (value as unknown as GetStringMethod)(variables);
    }

    if (value) {
        if (itemName) {
            value = value.replace(/item/g, itemName);
        }
        if (locationName) {
            value = value.replace(/location/g, locationName);
        }
        
        variables.console = { type: 'console', value }    
    } else {
        console.error(`Unknown textId: ${textId} `);
    }
}