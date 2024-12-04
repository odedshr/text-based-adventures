import { Action, GameDefinition, ItemVariable, PassageVariable, RoomVariable } from '../../../types';
import print from "../../../default/print.js";
import addAchievement from '../../../default/add-achievement';

const items:{ [key:string]: ItemVariable|RoomVariable|PassageVariable } = {
    'conservatory': { type: 'room' },
    'garden view': {
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
};

const actions:Action[] = [
    {
        input: /\b(?:read|examine|inspect|check|look\s*at|study|view|scan|peruse)\s*(?:the\s*)?(?:statue|statue\s*plaque|plaque\s*on\s*the\s*statue|statue\s*inscription|plaque)\b/,
        execute: (_:string, gameDefinition:GameDefinition, userId:string) => {
            const { variables } = gameDefinition
            const statue = variables.statue as ItemVariable;
            variables.statue = { ...statue, state: 'read' };
            print(gameDefinition, 'statue');
            addAchievement(gameDefinition, userId, 'read plaque on statue');
            return false;
        }
    }
];

const strings = {
    conservatory: 'A sunlit room filled with potted plants and wicker furniture. Glass walls offer a panoramic view of the surrounding garden and yard.',
    'garden view': 'French doors framed with ivy lead to the conservatory. The sunlight filters through the glass panes, offering a glimpse of the garden beyond.',
    statue: 'You noticed the weird date on the plaque.'
};

export {
    actions,
    items,
    strings,
}