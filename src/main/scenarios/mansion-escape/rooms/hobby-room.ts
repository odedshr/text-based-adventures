import addAchievement from '../../../default/add-achievement.js';
import addToInventory from '../../../default/add-to-inventory.js';
import isValidAction from '../../../default/is-valid-action.js';
import { Action, GameDefinition, ItemVariable, PassageVariable, RoomVariable, Variables } from '../../../types.js';
import print from "../../../default/print.js";

const items:{[key:string]:ItemVariable|RoomVariable|PassageVariable} = {
    'hobby room': { type: 'room' },
    'craft door': {
        type: 'passage',
        between: ['hallway', 'hobby room'],
        allowedStates: ['closed','opened'],
        state: 'closed',
    },
    glue: {
        type: 'item',
        location: 'hobby room',
        canBeHeld: true
    },
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
        input: /\b(?:feed|give|offer|provide)\s*(?:the\s*)?(?:fish|fishes)\s*(?:(?:in\s*(?:the\s*)?(?:aquarium|tank|fish\s*tank))?\s*(?:using|with|by\s*using)?\s*(?:the\s*)?(?:fish\s*food|food)?)?\b/,
        execute: (_:string, gameDefinition:GameDefinition, userId:string) => {
            const { variables } = gameDefinition;
            
            if (!isValidAction(gameDefinition, [
                {item: userId, property: 'location', value: 'hobby room', textId:'location-fail:user'},
                {item: 'aquarium', property: 'state', value: 'hungry-fish', textId:'fish already ate'},
                {item: 'fish food', property: 'state', value: 'full', textId:'fish food empty'},
            ])) {                
                return true;
            }
            
            
            const aquarium = variables.aquarium as ItemVariable;
            const fishFood = variables['fish food'] as ItemVariable;
            variables.aquarium = { ...aquarium, state: 'fish-fed' };
            variables.fishFood = { ...fishFood, state: 'empty' };
            addAchievement(gameDefinition, userId, 'fed the fish');
            print(gameDefinition, 'fed the fish');

            return true;
        }
    },
    {
        input: /\b(?:fish\s*out|retrieve|take\s*out|pull\s*out|remove|grab|get|pick\s*up)\s*(?:the\s*)?(?:treasure\s*box|chest|box)\s*(?:out\s*of\s*(?:the\s*)?(?:aquarium|tank|fish\s*tank|water))\b/,
        execute: (_:string, gameDefinition:GameDefinition, userId:string) => {
            const { variables } = gameDefinition;
            
            if (!isValidAction(gameDefinition, [
                {item: userId, property: 'location', value: 'hobby room', textId:'location-fail:user'},
                {item: 'aquarium', property: 'state', value: 'fish-fed', textId:'those fish are hungry'},
                {item: 'treasure box', property: 'location', value: 'aquarium', textId:'location-fail:item'},
            ])) {                
                return true;
            }
            
            addToInventory(gameDefinition, userId, 'treasure box');
            addAchievement(gameDefinition, userId, 'picked up treasure box');
            print(gameDefinition, 'got treasure box');

            return true;
        }
    },
    {
        input: /\b(?:open|check|inspect|examine|unlock|look\s*into)\s*(?:the\s*)?(?:treasure\s*box|chest|box)\b/,
        conditions: (_:GameDefinition, userId:string) => [
            {item: 'treasure box', property: 'location', value: userId, textId:'location-fail:item'}
        ],
        execute (_:string, gameDefinition:GameDefinition, userId:string) { 
            const { variables } = gameDefinition;
            
            // we need to remove the key out of the box before adding it to the inventory
            const smallKey = variables['small key'] as ItemVariable;
            variables['small key'] = { ...smallKey, location: 'hobby room' };
            addToInventory(gameDefinition, userId, 'small key');
            addAchievement(gameDefinition, userId, 'took small key out of treasure box');
            print(gameDefinition, 'found small key');
        }
    },
    {
        input: /\b(?:put|place|return|set|drop)\s*(?:the\s*)?(?:treasure\s*box|chest|box)\s*(?:back\s*)?((?:in|into)\s*(?:the\s*)?(?:aquarium|tank|fish\s*tank|water))?\b/,
        execute: (_:string, gameDefinition:GameDefinition, userId:string) => {
            const { variables } = gameDefinition;
            
            if (!isValidAction(gameDefinition, [
                {item: 'treasure box', property: 'location', value: userId, textId:'location-fail:item'},
            ])) {                
                return true;
            }

            const treasureBox = variables['treasure box'] as ItemVariable;
            variables['treasure box'] = { ...treasureBox, location: 'aquarium' };
            addAchievement(gameDefinition, userId, 'returned treasure box');
            print(gameDefinition, 'put treasure box back');
            return true;
        }
    }
];

const strings = {
    'hobby room': 'A room dedicated to various hobby, including shelves of crafting supplies, a large table for working on projects, and musical instruments in one corner.',
    'craft door': `A door with a sign "Practice in session, Do not disturb" on it`,
    glue: `10second glue. "Can glue anything", at least that's what the label says`,
    aquarium(variables:Variables) {
        const treasureBox = (variables['treasure box'] as ItemVariable).location ==='aquarium';
        return `You estimate the aquarium to be 200litter in size. There several fished in different colors swimming around.${
            treasureBox ? `There's a peculiar treasure box in the center of the aquarium, seems to be guarded by the fish`: ''
        }`;
    },
    'fish': `About ten fish in various sizes swimming in the aquarium. It's hard count as they keep moving.`,
    'fish food': 'A half full tub of flake-looking fish food',
    'those fish are hungry': `As soon as you your finger in the water those nasty fish try to take a bite at you. This doesn't feel safe`,
    'fish already ate': 'You have already fed the fish',
    'fish food empty': 'The fish food tub is empty',
    'fed the fish': 'You empty the fish food tub and put it in the aquarium. After eating they seems to have calmed down.',
    'treasure box': `A miniature scale of a pirate's treasure box. Quite cute, to be honest.`,
    'got treasure box': 'You carefully put you hand in the water and as the fish leave you alone you reach out and pick the tiny treasure box.',
    'small key': 'A small flimsy key. It looks like it can open a drawer or something of that sort.',
    'found small key': 'Examining the treasure box you manage to open it and find a small key that you decide to keep for now.',
    'put treasure box back': 'You carefully put the treasure box back where you found it.'
};

export {
    actions,
    items,
    strings
}