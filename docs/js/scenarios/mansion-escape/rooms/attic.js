import addAchievement from '../../../default/add-achievement.js';
import addToInventory from '../../../default/add-to-inventory.js';
import print from "../../../default/print.js";
const returnIfFlashlightOn = (variables, output) => variables.flashlight && variables.flashlight.state === 'on' ? output : `The room is utter darkness. You can't see anything.`;
const attic = {
    variables: {
        'attic': {
            type: 'room'
        },
        'attic ladder': {
            type: 'passage',
            in: 'attic',
            out: 'hallway',
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
    },
    actions: [
        {
            input: /\b(?:retrieve|take\s*out|pull\s*out|remove|grab|get|pick\s*up)\s(?:the\s)?(?:forensic\s)?kit\s(?:out\s)?(?:of\s)?(?:the\s)?(?:box|boxes)\b/,
            conditions: (_, userId) => [
                { item: userId, property: 'location', value: 'attic', textId: 'location-fail:user' },
                { item: 'forensic kit', property: 'location', value: 'boxes', textId: 'location-fail:item' },
            ],
            execute: (gameDefinition, userId, _) => {
                const { variables } = gameDefinition;
                const boxes = variables['boxes'];
                variables.boxes = Object.assign(Object.assign({}, boxes), { state: 'without-kit' });
                addToInventory(gameDefinition, userId, 'forensic kit');
                addAchievement(gameDefinition, userId, 'picked up forensic kit');
                print(gameDefinition, 'got forensic kit');
                return true;
            }
        },
        {
            input: /\b(?:look|search|check|inspect|examine|peek)\s+in\s+(?:the\s+)?(?:box|boxes)\b/,
            conditions: (_, userId) => [
                { item: userId, property: 'location', value: 'attic', textId: 'location-fail:user' },
            ],
            execute: (gameDefinition, userId, _) => {
                print(gameDefinition, 'boxes');
            }
        }
    ],
    strings: {
        attic: (variables) => returnIfFlashlightOn(variables, 'A dusty, dimly lit space filled with old trunks, forgotten furniture, and cobwebs. The air smells of age and memories.'),
        'attic ladder': 'A retractable wooden ladder hidden in the ceiling. When pulled down, it creaks ominously, allowing access to the dusty attic above.',
        boxes: (variables) => returnIfFlashlightOn(variables, `There are quite a few dusty boxes here with all sorts of rubbish inside.${variables['forensic kit'] && variables['forensic kit'].location === 'boxes' ?
            ' The only thing that looks interesting is a forensic kit.' : ''}`),
        'forensic kit': `It's a kid's version of a forensic kit. Basically it let you copy finger prints from one place to another. It's pretty cool.`,
        'got forensic kit': 'You got the forensic kit, surely it can be useful.'
    },
};
export default attic;
