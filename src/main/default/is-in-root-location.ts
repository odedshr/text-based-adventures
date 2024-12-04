import { ItemVariable, Variables } from "../types";

export default function isInRootLocation(variables:Variables, itemName:string, container:string):boolean {
    const itemLocation = variables[itemName] ? (variables[itemName] as ItemVariable).location : undefined;
    // if itemLocation is undefined then itemName is a room on its own and we reached as high as we can go

    return itemLocation !== undefined && 
            (itemLocation === container || isInRootLocation(variables, itemLocation, container));
};