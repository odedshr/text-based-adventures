import addToInventory from "./add-to-inventory.js";
import findByReference from "./find-by-reference.js";
const pickUpItem = /(pick up|take|grab|get|retrieve|can i take|i'll grab|i want to pick up|take that) (.+?)/; // Regular expression to match "pick up" commands
const pickGenericItem = {
    input: pickUpItem,
    execute: (input, gameDefinition, userId) => {
        // Execute the regex on the input string
        const match = input.match(pickUpItem);
        if (!match) {
            return false;
        }
        const item = findByReference(gameDefinition, userId, match[1]);
        if (!item) {
            return false;
        }
        // addToInventory will verify the item can be picked up and that it's in the same room as the user  
        return addToInventory(gameDefinition, userId, item);
    }
};
export default pickGenericItem;
