import { ItemVariable, Variables } from "../types";

export default function isItemAvailable(variables:Variables, expectedLocation:string, itemName:string) {
    const item = variables[itemName] as ItemVariable;
    const itemLocation = item.location;
    
    if (itemLocation === expectedLocation) {
        const container = variables[itemLocation] as ItemVariable;
        // a bit counter-intuitive, but if canContain===itemName then the item should be hidden from the outside (e.g. key in treasure box)
        // in such scenario the user is expected to use the "pick-item-out-of-container" which doesn't use this method
        return (container.canContain !== itemName) ;
    } else if (itemLocation === undefined) {
        return false
    }

    return isItemAvailable(variables, expectedLocation, itemLocation);
}