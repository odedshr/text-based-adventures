import addAchievement from '../../../default/add-achievement.js';
import addToInventory from '../../../default/add-to-inventory.js';
import { ItemVariable, Action, GameDefinition, RoomVariable } from '../../../types.js';
import print from "../../../default/print.js";

const items:{[key:string]:ItemVariable|RoomVariable} = {
    'attic': { type: 'room' },
    'boxes': {
        type: 'item',
        location: 'attic',
        state: 'with-kit',
        canContain: 5,
        canBeHeld: false
    },
    'forensic kit': {
        type: 'item',
        location: 'boxes',
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
];

const strings = {
    attic: 'A dusty, dimly lit space filled with old trunks, forgotten furniture, and cobwebs. The air smells of age and memories.',
    'boxes:with-kit': 'There are quite a few dusty boxes here with all sorts of rubbish inside. The only thing that looks interesting is a forensic kit.',
    'boxes:without-kit': 'There are quite a few dusty boxes here with all sorts of rubbish inside.',
    'forensic kit': `It's a kid's version of a forensic kit. Basically it let you copy finger prints from one place to another. It's pretty cool.`,
    'got forensic kit': 'You got forensic kit, surely it can be useful.'
}

export {
    actions,
    items,
    strings,
}