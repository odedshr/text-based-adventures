import { GameDefinition, ItemVariable, PuzzlePiece } from '../../../types';
import print from "../../../default/print.js";
import addAchievement from '../../../default/add-achievement.js';

const conservatory:PuzzlePiece = {
    variables: {
        'conservatory': { type: 'room' },
        'back door': {
            type: 'passage',
            in: 'conservatory',
            out: 'living room',
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
    actions: [
        {
            input: /\b(?:read|examine|inspect|check|look\s*at|study|view|scan|peruse)\s*(?:the\s*)?(?:statue|statue\s*plaque|plaque\s*on\s*the\s*statue|statue\s*inscription|plaque)\b/,
            execute: (gameDefinition:GameDefinition, userId:string,_:string) => {
                const { variables } = gameDefinition
                const statue = variables.statue as ItemVariable;
                variables.statue = { ...statue, state: 'read' };
                print(gameDefinition, 'statue');
                addAchievement(gameDefinition, userId, 'read plaque on statue');
                return false;
            }
        }
    ],
    strings: {
        conservatory: `Glass walls offer a panoramic view of the surrounding garden and yard.
        The room is filled with lush greenery and a big statue in the center.`,
        'back door': 'French doors framed with ivy lead to the conservatory.',
        statue: `The statue is of a man, nothing too exciting, however you noticed the weird date on the plaque - 30/02/1985. Surely that can\'t be right? or maybe it has a hidden meaning?`,
    }
}

export default conservatory;