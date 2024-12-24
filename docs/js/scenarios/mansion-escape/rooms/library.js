import addAchievement from '../../../default/add-achievement.js';
import addToInventory from '../../../default/add-to-inventory.js';
import print from "../../../default/print.js";
const items = {
    'library': { type: 'room' },
    'spiralling stairs': {
        type: 'passage',
        between: ['office', 'library'],
        synonyms: ['stairs']
    },
    'lounge arch': {
        type: 'passage',
        between: ['living room', 'library'],
        allowedStates: ['opened'],
        state: 'opened',
    },
    'bookshelves': {
        type: 'item',
        location: 'library',
        canContain: 100,
        synonyms: ['bookshelves', 'bookshelf', 'shelves', 'shelf']
    },
    'pupcake recipes book': {
        type: 'item',
        location: 'books',
        canBeHeld: true,
        state: 'unread',
        synonyms: ['recipe', 'recipes', 'recipes book']
    },
    'forensic guide': {
        type: 'item',
        location: 'books',
        canBeHeld: true,
        state: 'unread',
        synonyms: ['forensic guide book', 'forensic kit book', 'forensic kit guide', 'forensic kit guide book', 'guide book']
    }
};
const actions = [
    {
        input: /\b(?:find|locate|search\s*for|look\s*for|get)\s*(?:the\s*)?(?:dog\s*dishes\s*recipe\s*book|recipe\s*book\s*for\s*dog\s*dishes|dog\s*recipe\s*book|book\s*of\s*dog\s*dishes)\b/,
        conditions: (_, userId) => [
            { item: userId, property: 'location', value: 'library', textId: 'location-fail:user' },
            { item: 'pupcake recipes book', property: 'location', value: 'bookshelves', textId: 'location-fail:item' },
        ],
        execute: (gameDefinition, userId, input) => {
            //2 - find dog dishes recipe book
            const { variables } = gameDefinition;
            const book = variables['pupcake recipes book'];
            variables['pupcake recipes book'] = Object.assign(Object.assign({}, book), { state: 'read' });
            print(gameDefinition, 'found recipe book');
            addToInventory(gameDefinition, userId, 'dog recipes book');
            addAchievement(gameDefinition, userId, 'found dog dishes recipe book');
            return false;
        }
    },
    {
        input: /\b(?:find|locate|search\s*for|look\s*for|get)\s*(?:the\s*)?(forensic(\s*kit)?\s*guide\s*(book)?|(?:book\s*(?:titled\s*)?(?:'how\s*to\s*use\s*forensic\s*kit'|on\s*how\s*to\s*use\s*a?\s*forensic\s*kit|about\s*using\s*a?\s*forensic\s*kit|how\s*to\s*use\s*a?\s*forensic\s*kit)))\b/,
        execute: (gameDefinition, userId, input) => {
            const { variables } = gameDefinition;
            const forensicGuide = variables['forensic guide'];
            variables['forensic guide'] = Object.assign(Object.assign({}, forensicGuide), { state: 'read' });
            print(gameDefinition, 'found forensic guide');
            addToInventory(gameDefinition, userId, 'forensic guide');
            addAchievement(gameDefinition, userId, 'found forensic guide');
            return false;
        }
    }
];
const strings = {
    library: 'A grand library filled with tall bookshelves, a rolling ladder, and comfortable reading chairs.',
    'spiralling stairs': 'A magnificent spiral staircase crafted from polished oak, with ornate wrought-iron railings spiraling upward.',
    bookshelves: 'Sturdy shelves packed with books, some hiding useful clues.',
    'pupcake recipes book': 'A collection of recipes for crafting the perfect pupcake treat.',
    'forensic guide': 'A manual offering insights into crime scene techniques, useful for incriminating evidence. It includes a section on how to copy fingerprints from one place to another.',
    'lounge arch': 'A wide arch framed by elegant wooden beams. Bookshelves line the wall beyond, offering easy access from the cozy living room to the expansive library.',
    'found recipe book': `You find a book about how to make a pupcake. It looks quite straightforward to make despite your lack of experience.`,
    'found forensic guide': `You find a forensic guide. It's pretty cool. You learn how to use forensic kit and copy finger prints from one place to another.`
};
export { actions, items, strings, };
