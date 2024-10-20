import { ItemVariable } from '../../types.js';

const items:{[key:string]:ItemVariable} = {
    portrait: {
        type: 'item',
        state: 'unknown-figure:on-the-wall',
        location: 'office',
        synonyms: ['portrait', 'picture', 'painting', 'paintings']
    },
    //office
    'trash bin': {
        type: 'item',
        location: 'office',
        canBeHeld: true,
        canContain: 10,
        synonyms: ['bin', 'trash', 'paper bin']
    },
    'crumpled newspaper': {
        type: 'item',
        location: 'trash bin',
        canBeHeld: true,
        synonyms: [
            'newspaper',
            'wrinkled newspaper',
            'folded newspaper',
            'crumpled paper'
        ]
    },
    'broken vase pieces': {
        type: 'item',
        location: 'office',
        canBeHeld: true,
        synonyms: [
            'pieces of vase', 'pieces', 'vase', 'vase pieces', 'broken vase', 'shattered vase'
        ]
    },
    safe: {
        type: 'item',
        location: 'office',
        state: 'locked',
        canContain: 'ledger',
    },
    ledger: {
        type: 'item',
        location: 'vault',
        canBeHeld: true,
    },
    journal: {
        type: 'item',
        location: 'office',
        synonyms: ['diary', 'calendar']
    },
    // attic:
    'forensic kit': {
        type: 'item',
        location: 'attic',
        canBeHeld: true
    },
    // hobby room
    aquarium: {
        type: 'item',
        state: 'hungry-fish',
        location: 'hobby room',
        canContain: 'treasure box'
    },
    'fish food': {
        type: 'item',
        location: 'hobby room',
        canBeHeld: true
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