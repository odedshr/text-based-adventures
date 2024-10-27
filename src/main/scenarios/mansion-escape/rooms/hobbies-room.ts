import addToInventory from '../../../default/add-to-inventory.js';
import isValidAction from '../../../default/is-valid-action.js';
import { Action, GameDefinition, ItemVariable } from '../../../types.js';

const items:{[key:string]:ItemVariable} = {
    aquarium: {
        type: 'item',
        state: 'hungry-fish',
        location: 'hobby room',
        canContain: 'treasure box'
    },
    'fish food': {
        type: 'item',
        state: 'full',
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

const actions:Action[] = [
    {
        input: /\b(?:feed|give|offer|provide)\s*(?:the\s*)?(?:fish|fishes)\s*(?:in\s*(?:the\s*)?(?:aquarium|tank|fish\s*tank))\s*(?:using|with|by\s*using)\s*(?:the\s*)?(?:fish\s*food|food)\b/,
        execute: (_:string, gameDefinition:GameDefinition, userId:string) => {
            const { variables, print, addAchievement } = gameDefinition;
            
            if (!isValidAction(gameDefinition, [
                {item: userId, property: 'location', value: 'hobbies room', textId:'location-fail:user'},
                {item: 'aquarium', property: 'state', value: 'hungry-fish', textId:'fish already ate'},
                {item: 'fish food', property: 'state', value: 'full', textId:'fish food empty'},
            ])) {                
                return true;
            }
            
            
            const aquarium = variables.aquarium as ItemVariable;
            const fishFood = variables['fish food'] as ItemVariable;
            variables.aquarium = { ...aquarium, state: 'fish-fed' };
            variables.fishFood = { ...fishFood, state: 'empty' };
            addAchievement(userId, 'fed fish');
            print('fed the fish');

            return true;
        }
    },
    {
        input: /\b(?:fish\s*out|retrieve|take\s*out|pull\s*out|remove|grab|get|pick\s*up)\s*(?:the\s*)?(?:treasure\s*box|chest|box)\s*(?:out\s*of\s*(?:the\s*)?(?:aquarium|tank|fish\s*tank|water))\b/,
        execute: (_:string, gameDefinition:GameDefinition, userId:string) => {
            const { print, addAchievement } = gameDefinition;
            
            if (!isValidAction(gameDefinition, [
                {item: userId, property: 'location', value: 'hobbies room', textId:'location-fail:user'},
                {item: 'aquarium', property: 'state', value: 'fish-fed', textId:'those fish are hungry'},
                {item: 'treasure box', property: 'location', value: 'aquarium', textId:'location-fail:item'},
            ])) {                
                return true;
            }
            
            addToInventory(gameDefinition, userId, 'treasure box');
            addAchievement(userId, 'picked up treasure box');
            print('got treasure box');

            return true;
        }
    },
    {
        input: /\b(?:open|check|inspect|examine|unlock|look\s*into)\s*(?:the\s*)?(?:treasure\s*box|chest|box)\b/,
        execute: (_:string, gameDefinition:GameDefinition, userId:string) => {
            const { print, addAchievement } = gameDefinition;
            
            if (!isValidAction(gameDefinition, [
                {item: 'treasure box', property: 'location', value: userId, textId:'location-fail:item'},
            ])) {                
                return true;
            }
            
            addToInventory(gameDefinition, userId, 'small key');
            addAchievement(userId, 'took small key out of treasure box');
            print('found small key');

            return true;
        }
    },
    {
        input: /\b(?:put|place|return|set|drop)\s*(?:the\s*)?(?:treasure\s*box|chest|box)\s*(?:back\s*)?(?:in|into)\s*(?:the\s*)?(?:aquarium|tank|fish\s*tank|water)\b/,
        execute: (_:string, gameDefinition:GameDefinition, userId:string) => {
            const { variables, print, addAchievement } = gameDefinition;
            
            if (!isValidAction(gameDefinition, [
                {item: 'treasure box', property: 'location', value: userId, textId:'location-fail:item'},
            ])) {                
                return true;
            }

            const treasureBox = variables['treasure box'] as ItemVariable;
            variables['treasure box'] = { ...treasureBox, location: 'aquarium' };
            addAchievement(userId, 'returned treasure box');
            print('put treasure box back');
            return true;
        }
    }

    //3 - take key to drawer from treasure box
    //4 - get glue for vase
];

const strings = {
    'hobbies room': 'A room dedicated to various hobbies, including shelves of crafting supplies, a large table for working on projects, and musical instruments in one corner.',
    'those fish are hungry': `As soon as you your finger in the water those nasty fish try to take a bite at you. This doesn't feel safe`,
    'fish already ate': 'You have already fed the fish',
    'fish food empty': 'The fish food tub is empty',
    'fed the fish': 'You empty the fish food tub and put it in the aquarium. After eating they seems to have calmed down.',
    'got treasure box': 'You carefully put you hand in the water and as the fish leave you alone you reach out and pick the tiny treasure box.',
    'found small key': 'Examining the treasure box you manage to open it and find a small key that you decide to keep for now.',
    'put treasure box back': 'You carefully put the treasure box back where you found it.'
};

export {
    actions,
    items,
    strings
}