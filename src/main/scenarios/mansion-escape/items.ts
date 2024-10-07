import { ItemVariable } from '../../types.js';

const items:{[key:string]:ItemVariable} = {
    portrait: {
        type: 'item',
        state: 'unknown-figure:on-the-wall',
        location: 'office',
    },
    'trash bin': {
        type: 'item',
        location: 'office',
    },
    'crumpled newspaper': {
        type: 'item',
        location: 'trash bin',
    }
};

export default items;