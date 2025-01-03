import { GameDefinition, ItemVariable, PuzzlePiece, Variables } from '../../../types.js';
import addAchievement from '../../../default/add-achievement.js';
import addToInventory from '../../../default/add-to-inventory.js';
import print from "../../../default/print.js";

const hobbyRoom:PuzzlePiece = {
    variables: {
        'hobby room': { type: 'room' },
        'craft door': {
            type: 'passage',
            in: 'hobby room',
            out: 'hallway',
            allowedStates: ['closed','opened'],
            state: 'closed',
        },
        glue: {
            type: 'item',
            location: 'hobby room',
            canBeHeld: true,
            synonyms: ['10second glue','10second glue tube', 'glue tube']
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
    },
    actions: [
        {
            input: /\b(?:feed|give|offer|provide)\s*(?:the\s*)?(?:fish|fishes)\s*(?:(?:in\s*(?:the\s*)?(?:aquarium|tank|fish\s*tank))?\s*(?:using|with|by\s*using)?\s*(?:the\s*)?(?:fish\s*food|food)?)?\b/,
            conditions: (_:GameDefinition, userId:string) => [
                {item: userId, property: 'location', value: 'hobby room', textId:'location-fail:user'},
                {item: 'aquarium', property: 'state', value: 'hungry-fish', textId:'fish already ate'},
                {item: 'fish food', property: 'state', value: 'full', textId:'fish food empty'},
            ],
            execute: (gameDefinition:GameDefinition, userId:string,_:string) => {
                const { variables } = gameDefinition;
                            
                const aquarium = variables.aquarium as ItemVariable;
                const fishFood = variables['fish food'] as ItemVariable;
                variables.aquarium = { ...aquarium, state: 'fish-fed' };
                variables.fishFood = { ...fishFood, state: 'empty' };
                addAchievement(gameDefinition, userId, 'fed the fish');
                print(gameDefinition, 'fed the fish');
            }
        },
        {
            input: /\b(?:fish\s*out|retrieve|take\s*out|pull\s*out|remove|grab|get|pick\s*up)\s*(?:the\s*)?(?:treasure\s*box|chest|box)\s*(?:out\s*of\s*(?:the\s*)?(?:aquarium|tank|fish\s*tank|water))\b/,
            conditions: (_:GameDefinition, userId:string) => [
                {item: userId, property: 'location', value: 'hobby room', textId:'location-fail:user'},
                {item: 'aquarium', property: 'state', value: 'fish-fed', textId:'those fish are hungry'},
                {item: 'treasure box', property: 'location', value: 'aquarium', textId:'location-fail:item'},
            ],
            execute: (gameDefinition:GameDefinition, userId:string,_:string) => {
                addToInventory(gameDefinition, userId, 'treasure box');
                addAchievement(gameDefinition, userId, 'picked up treasure box');
                print(gameDefinition, 'got treasure box');
    
            }
        },
        {
            input: /\b(?:open|check|inspect|examine|unlock|look\s*into)\s*(?:the\s*)?(?:treasure\s*box|chest|box)\b/,
            conditions: (_:GameDefinition, userId:string) => [
                {item: 'treasure box', property: 'location', value: userId, textId:'location-fail:item'}
            ],
            execute (gameDefinition:GameDefinition, userId:string,_:string) { 
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
            conditions: (_:GameDefinition, userId:string) => [
                {item: userId, property: 'location', value: 'hobby room', textId:'location-fail:user'},
                {item: 'treasure box', property: 'location', value: userId, textId:'location-fail:item'},
            ],
            execute: (gameDefinition:GameDefinition, userId:string,_:string) => {
                const { variables } = gameDefinition;
                
                const treasureBox = variables['treasure box'] as ItemVariable;
                variables['treasure box'] = { ...treasureBox, location: 'aquarium' };
                addAchievement(gameDefinition, userId, 'returned treasure box');
                print(gameDefinition, 'put treasure box back');
            }
        }
    ],
    strings: {
        'hobby room': (variables:Variables) => `A room dedicated to various hobbies, including shelves of crafting supplies, a large table for working on projects, and a cello in one corner.
        There's a large aquarium in the center of the room${(variables.glue as ItemVariable).location==='hobby room' ? ' and a glue tube on the table' : ''}.`,
        'craft door': `A door with a sign "Practice in session, Do not disturb" on it`,
        cello: `It's an expensive looking cello, you rather not touch it.`,
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
    }
}

export default hobbyRoom;