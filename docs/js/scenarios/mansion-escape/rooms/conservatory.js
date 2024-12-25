import print from "../../../default/print.js";
import addAchievement from '../../../default/add-achievement.js';
const conservatory = {
    actions: [
        {
            input: /\b(?:read|examine|inspect|check|look\s*at|study|view|scan|peruse)\s*(?:the\s*)?(?:statue|statue\s*plaque|plaque\s*on\s*the\s*statue|statue\s*inscription|plaque)\b/,
            execute: (gameDefinition, userId, _) => {
                const { variables } = gameDefinition;
                const statue = variables.statue;
                variables.statue = Object.assign(Object.assign({}, statue), { state: 'read' });
                print(gameDefinition, 'statue');
                addAchievement(gameDefinition, userId, 'read plaque on statue');
                return false;
            }
        }
    ],
    variables: {
        'conservatory': { type: 'room' },
        'back door': {
            type: 'passage',
            between: ['living room', 'conservatory'],
            allowedStates: ['opened'],
            state: 'opened',
        },
        statue: {
            type: 'item',
            location: 'conservatory',
            synonyms: ['statue', 'plaque', 'statue plaque', 'plaque on statue'],
            state: 'unread'
        }
    },
    strings: {
        conservatory: `Glass walls offer a panoramic view of the surrounding garden and yard.
        The room is filled with lush greenery and a big statue in the center.`,
        'back door': 'French doors framed with ivy lead to the conservatory.',
        statue: `The statue is of a man, nothing too exciting, however you noticed the weird date on the plaque - 30/02/1985. Surely that can\'t be right? or maybe it has a hidden meaning?`,
    }
};
export default conservatory;
