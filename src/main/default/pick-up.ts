import { GameDefinition, Action, ItemVariable, RoomVariable } from "../types";
import addToInventory from "./add-to-inventory.js";
import findByReference from "./find-by-reference.js";

const items:{[key:string]:ItemVariable|RoomVariable} = {};

const pickUpItem = /(pick up|take|grab|get|retrieve|can i take|i'll grab|i want to pick up|take that)\s+(.+)/;  // Regular expression to match "pick up" commands
const actions:Action[] = [{
    input: pickUpItem,
    execute: (input:String,gameDefinition:GameDefinition, userId:string) => {
        const item = findByReference(gameDefinition, userId, input.match(pickUpItem)?.pop());
        if (!item) { return; }

        // addToInventory will verify the item can be picked up and that it's in the same room as the user  
        return addToInventory(gameDefinition, userId, item);
    }
}];

const strings = {
    'no-item-to-pick-up': `I don't know what the item is.`,
    'you-cant-pick-up-that': `You can't pick that up.`,
    'already-have-item': `You already have the item.`,
    'carrying-too-many-things': `You're carrying too many things`,
    'you-picked-up-the-item': 'You picked up the item.',
};


export {
    actions,
    items,
    strings
};