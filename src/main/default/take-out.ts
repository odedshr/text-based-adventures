import { GameDefinition,Action } from '../types';
import addToInventory from "./add-to-inventory";

const pickItemOutOfContainer = /\b(?:take|remove|pull|get|grab|retrieve)\s+(\w+)\s+(?:out\s*of|from)\s+(\w+)\b/;  // Regular expression to match "pick up" commands
const pickGenericItemOutOfContainer:Action = {
    input: pickItemOutOfContainer,
    execute: (input:String, gameDefinition:GameDefinition, userId:string) => {
        const { print } = gameDefinition
       // Execute the regex on the input string
        const match = input.match(pickItemOutOfContainer);

        if (!match) {
            return false;
        }

        const item = match[1];
        const container = match[2];

        // is the container present (in the room or in the inventory)?
        // does the container contain the item?

        // Return null if no match was found
        print('not-yet-implemented');;
        return false;
    }
};

export default pickGenericItemOutOfContainer;