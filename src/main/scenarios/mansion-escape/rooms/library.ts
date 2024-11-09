import addAchievement from '../../../default/add-achievement.js';
import addToInventory from '../../../default/add-to-inventory.js';
import { ItemVariable, Action, GameDefinition, RoomVariable } from '../../../types.js';
import print from "../../../default/print.js";

const items:{[key:string]:ItemVariable|RoomVariable} = {
    'library': { type: 'room' },
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
const actions:Action[] = [
    {
        input: /\b(?:find|locate|search\s*for|look\s*for|get)\s*(?:the\s*)?(?:dog\s*dishes\s*recipe\s*book|recipe\s*book\s*for\s*dog\s*dishes|dog\s*recipe\s*book|book\s*of\s*dog\s*dishes)\b/,
        conditions: (_:GameDefinition, userId:string) => [
            {item: userId, property: 'location', value: 'library', textId:'location-fail:user'},
            {item: 'pupcake recipes book', property: 'location', value: 'bookshelves', textId:'location-fail:item'},
        ],
        execute: (input:string, gameDefinition:GameDefinition, userId:string) => {
            //2 - find dog dishes recipe book
            const { variables } = gameDefinition

            const book = variables['pupcake recipes book'] as ItemVariable;
            variables['pupcake recipes book'] = { ...book, state: 'read' };

            print(gameDefinition, 'found recipe book');
            addToInventory(gameDefinition, userId, 'dog recipes book');
            addAchievement(gameDefinition, userId, 'found dog dishes recipe book');
            return false;
        }
    },
    {
        input: /\b(?:find|locate|search\s*for|look\s*for|get)\s*(?:the\s*)?(forensic(\s*kit)?\s*guide\s*(book)?|(?:book\s*(?:titled\s*)?(?:'how\s*to\s*use\s*forensic\s*kit'|on\s*how\s*to\s*use\s*a?\s*forensic\s*kit|about\s*using\s*a?\s*forensic\s*kit|how\s*to\s*use\s*a?\s*forensic\s*kit)))\b/,
        execute: (input:string, gameDefinition:GameDefinition, userId:string) => {
            const { variables } = gameDefinition
            
            const forensicGuide = variables['forensic guide'] as ItemVariable;
            variables['forensic guide'] = { ...forensicGuide, state: 'read' };

            print(gameDefinition,'found forensic guide');
            addToInventory(gameDefinition, userId, 'forensic guide');
            addAchievement(gameDefinition, userId, 'found forensic guide');
            return false;
        }
    }
];
const strings = {
    library: 'A grand library filled with tall bookshelves, a rolling ladder, and comfortable reading chairs. The scent of old books fills the air.',
    'found recipe book': `You find a book about how to make a pupcake. It looks quite straightforward to make despite your lack of experience.`,
    'found forensic guide': `You find a forensic guide. It's pretty cool. You learn how to use forensic kit and copy finger prints from one place to another.`
};

export {
    actions,
    items,
    strings,
}