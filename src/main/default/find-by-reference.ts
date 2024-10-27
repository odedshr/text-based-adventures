import { GameDefinition, ItemVariable, PassageVariable, PlayerVariable } from "../types";

export default function findByReference(gameDefinition:GameDefinition, userId:string, reference:string):string | undefined {
    const { references, variables } = gameDefinition;
    const candidates = references[reference];
    
    if (!candidates) {
        return undefined;
    } else if (candidates.length === 1) { 
        return candidates[0];
    }
    // more than one candidate
    const currentLocation = (variables[userId] as PlayerVariable).location;

    // TODO: handle scenarios where there are multiple items in the same location
    // TODO: handle "it"
    return candidates.find(candidate => 
        (variables[candidate] as PassageVariable).between?.includes(currentLocation) || (variables[candidate] as ItemVariable).location === currentLocation
    );

}