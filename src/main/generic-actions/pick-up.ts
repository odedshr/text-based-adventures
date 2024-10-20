import { GameDefinition, Action } from "../types";
import addToInventory from "./add-to-inventory.js";
import findByReference from "./find-by-reference.js";

const pickUpItem = /(pick up|take|grab|get|retrieve|can i take|i'll grab|i want to pick up|take that) (.+?)/;  // Regular expression to match "pick up" commands
const pickGenericItem:Action = {
    input: pickUpItem,
    execute: (input:String,gameDefinition:GameDefinition, userId:string) => {
        console.log('11');
       // Execute the regex on the input string
        const match = input.match(pickUpItem);
        console.log('22');
        if (!match) { return false }
        console.log('33');
        const item = findByReference(gameDefinition, userId, match[1]);
        console.log('44');        
        if (!item) { return false }

        console.log('55');
        // addToInventory will verify the item can be picked up and that it's in the same room as the user  
        return addToInventory(gameDefinition, userId, item);
    }
};

export default pickGenericItem;