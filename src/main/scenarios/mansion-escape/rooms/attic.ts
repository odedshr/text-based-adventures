import addAchievement from '../../../default/add-achievement.js';
import addToInventory from '../../../default/add-to-inventory.js';
import { ItemVariable, Action, GameDefinition, RoomVariable, PassageVariable, Strings, Variables } from '../../../types.js';
import print from "../../../default/print.js";
import variables from '../variables.js';

const items:{[key:string]: ItemVariable|RoomVariable|PassageVariable } = {
    'attic': {
        type: 'room'
    },
    'attic ladder': {
        type: 'passage',
        between: ['hallway', 'attic'],
        synonyms: ['ladder'],
    },
    'boxes': {
        type: 'item',
        location: 'attic',
        canContain: 5,
        canBeHeld: false
    },
    'forensic kit': {
        type: 'item',
        location: 'boxes',
        state: 'no fingerprints',
        canBeHeld: true
    }
};

const actions:Action[] = [
    {
        input: /\b(?:retrieve|take\s*out|pull\s*out|remove|grab|get|pick\s*up)\s(?:the\s)?(?:forensic\s)?kit\s(?:out\s)?(?:of\s)?(?:the\s)?(?:box|boxes)\b/,
        conditions: (_:GameDefinition, userId:string) => [
            {item: userId, property: 'location', value: 'attic', textId:'location-fail:user'},
            {item: 'forensic kit', property: 'location', value: 'boxes', textId:'location-fail:item'},
        ],
        execute: (_:string, gameDefinition:GameDefinition, userId:string) => {
            const { variables } = gameDefinition;
            
            const boxes = variables['boxes'] as ItemVariable;
            variables.boxes = { ...boxes, state: 'without-kit' };
            
            addToInventory(gameDefinition, userId, 'forensic kit');
            addAchievement(gameDefinition, userId, 'picked up forensic kit');
            print(gameDefinition, 'got forensic kit');

            return true;
        }
    },
    {
        input: /\b(?:look|search|check|inspect|examine|peek)\s+in\s+(?:the\s+)?(?:box|boxes)\b/,
        conditions: (_:GameDefinition, userId:string) => [
            {item: userId, property: 'location', value: 'attic', textId:'location-fail:user'},
        ],
        execute: (_:string, gameDefinition:GameDefinition, userId:string) => {
            print(gameDefinition, 'boxes');
        }
    }
];

const returnIfFlashlightOn = (variables:Variables, output:string) =>
    variables.flashlight && (variables.flashlight as ItemVariable).state === 'on' ? output : `The room is utter darkness. You can't see anything.`

const strings:Strings = {
    attic: (variables:Variables) => returnIfFlashlightOn(variables, 
        'A dusty, dimly lit space filled with old trunks, forgotten furniture, and cobwebs. The air smells of age and memories.'),
    'attic ladder': 'A retractable wooden ladder hidden in the ceiling. When pulled down, it creaks ominously, allowing access to the dusty attic above.',
    boxes: (variables:Variables) => returnIfFlashlightOn(variables,
        `There are quite a few dusty boxes here with all sorts of rubbish inside.${
            variables['forensic kit'] && (variables['forensic kit'] as ItemVariable).location === 'boxes' ? 
            ' The only thing that looks interesting is a forensic kit.' :''}`
     ),
    'forensic kit': `It's a kid's version of a forensic kit. Basically it let you copy finger prints from one place to another. It's pretty cool.`,
    'got forensic kit': 'You got forensic kit, surely it can be useful.'
}

export {
    actions,
    items,
    strings,
}