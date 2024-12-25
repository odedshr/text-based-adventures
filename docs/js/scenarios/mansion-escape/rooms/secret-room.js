import addAchievement from '../../../default/add-achievement.js';
import print from '../../../default/print.js';
const secretRoom = {
    actions: [
        {
            input: /\b(?:use\s+(?:a\s+)?(?:forensic|fingerprint|crime\s*scene)\s+kit\s+to\s+)?copy\s+fingerprints\s+from\s+(?:the\s+)?(?:train\s+model|train\s+set|toy\s+train|toy|train)\b/,
            conditions: (_, userId) => [
                { item: userId, property: 'location', value: 'secret room', textId: 'location-fail:user' },
                { item: 'forensic kit', property: 'location', value: userId, textId: 'location-fail:item' },
            ],
            execute(gameDefinition, userId, _) {
                const { variables } = gameDefinition;
                variables['forensic kit'] = Object.assign(Object.assign({}, variables['forensic kit']), { state: 'with fingerprints' });
                print(gameDefinition, 'copied fingerprints');
                addAchievement(gameDefinition, userId, 'copied fingerprints');
            },
        }
    ],
    variables: {
        'secret room': { type: 'room' },
        'secret door': {
            type: 'passage',
            between: ['master bedroom', 'secret room'],
            allowedStates: ['opened', 'hidden'],
            state: 'hidden',
            synonyms: ['door']
        },
        'train model': {
            type: 'item',
            location: 'secret room',
            synonyms: ['train set', 'train', 'toy train', 'toy']
        },
    },
    strings: {
        'secret room': `Very oddly, there's a massive train model in the middle of the room. You try not to be too judgemental about it.`,
        'secret door': 'A concealed door behind a shelf of wine barrels. It leads to the mansion’s secret room.',
        'train model': `A miniature train model that takes up most of the room.`,
        'copied fingerprints': 'You carefully copied the fingerprints from the train model.'
    }
};
export default secretRoom;
