import addAchievement from '../../../default/add-achievement';
import print from '../../../default/print.js';
import { Action, GameDefinition, ItemVariable, PassageVariable, RoomVariable } from '../../../types';

const items:{ [key:string]: ItemVariable|RoomVariable|PassageVariable } = {
    'secret room': { type: 'room' },
    'secret door': {
        type: 'passage',
        between: ['master bedroom', 'secret room'],
        allowedStates: ['opened','hidden'],
        state: 'hidden',
        synonyms: ['door']
    },
    'train model': {
        type: 'item',
        location: 'secret room',
        synonyms: ['train set', 'train', 'toy train', 'toy']
    },
};

const actions:Action[] = [
    {
        input: /\b(?:use\s+(?:a\s+)?(?:forensic|fingerprint|crime\s*scene)\s+kit\s+to\s+)?copy\s+fingerprints\s+from\s+(?:the\s+)?(?:train\s+model|train\s+set|toy\s+train|toy|train)\b/,
        conditions: (_:GameDefinition, userId:string) => [
            { item: userId, property: 'location', value: 'secret room', textId:'location-fail:user' },
            { item: 'forensic kit', property: 'location', value: userId, textId:'location-fail:item' },    
        ],
        execute(_:string, gameDefinition:GameDefinition, userId:string) {
            const { variables } = gameDefinition;
            variables['forensic kit'] = { ...variables['forensic kit'], state: 'with fingerprints' } as ItemVariable;
            print(gameDefinition, 'copied fingerprints');
            addAchievement(gameDefinition, userId, 'copied fingerprints');
        },
    }
];

const strings = {
    'secret room': 'A hidden room, accessible only by a secret passage. It contains mysterious artifacts, old documents, and a single desk covered in dust.',
    'secret door': 'A concealed door behind a shelf of wine barrels. It leads to the mansion’s secret room, known only to a select few, hidden deep beneath the house.',
    'train model': `A miniature train that might serve as a puzzle piece or clue.`,
    'copied fingerprints': 'You carefully copied the fingerprints from the train model.'
};

export {
    actions,
    items,
    strings,
}