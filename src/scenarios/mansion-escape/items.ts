import { ItemVariable } from "../../types";

const items:{[key:string]:ItemVariable} = {
    'trash bin': {
        type: 'item',
        location: 'office',
        touched: false
    },
    'crumpled newspaper': {
        type: 'item',
        location: 'trash bin',
        touched: false
    }
};

export default items;