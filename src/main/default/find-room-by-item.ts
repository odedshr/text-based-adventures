import { ItemVariable, Variables } from "../types";

export default function findRoomByItem(variables:Variables, itemName:string) {
    const item = variables[itemName];
    if (item === undefined) {
        return undefined;
    }
    if (item.type==='room') {
        return itemName;
    }

    return findRoomByItem(variables, (item as ItemVariable).location);    
}