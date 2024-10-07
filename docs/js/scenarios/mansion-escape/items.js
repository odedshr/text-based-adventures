const items = {
    portrait: {
        type: 'item',
        state: 'unknown-figure:on-the-wall',
        location: 'office',
    },
    //office
    'trash bin': {
        type: 'item',
        location: 'office',
    },
    'crumpled newspaper': {
        type: 'item',
        location: 'trash bin',
    },
    'broken vase pieces': {
        type: 'item',
        location: 'office'
    },
    safe: {
        type: 'item',
        location: 'office',
        state: 'locked',
    },
    ledger: {
        type: 'item',
        location: 'vault',
    },
    // hobby room
    aquarium: {
        type: 'item',
        state: 'hungry-fish',
        location: 'hobby room',
        canContain: 'treasure box'
    },
    'treasure box': {
        type: 'item',
        location: 'aquarium',
        state: 'closed',
        canContain: 'small key',
        canBeHeld: true
    },
    'small key': {
        type: 'item',
        location: 'treasure box',
        canBeHeld: true
    }
};
export default items;
