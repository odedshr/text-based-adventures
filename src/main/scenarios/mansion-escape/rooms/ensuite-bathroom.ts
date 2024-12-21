import { Action, ItemVariable, PassageVariable, RoomVariable } from '../../../types';

const items:{ [key:string]: ItemVariable|RoomVariable|PassageVariable} = {
    'ensuite bathroom': { type: 'room' },
    'bathing nook': {
        type: 'passage',
        between: ['master bedroom', 'ensuite bathroom'],
        allowedStates: ['opened','closed'],
        state: 'opened',
    },
    'cabinet': {
        type: 'item',
        location: 'ensuite bathroom',
        canContain: 'sleeping pills',
        state: 'closed',
        synonyms: ['cabinet', 'medicine cabinet']
    },

    'sleeping pills': {
        type: 'item',
        location: 'cabinet',
        canBeHeld: true,
        synonyms: ['sleeping pill', 'pill', 'pills']
    }
};

const actions:Action[] = [];

const strings = {
    'ensuite bathroom': 'A private bathroom with marble countertops, a clawfoot tub, a separate shower, and elegant fixtures. Towels hang neatly on heated racks.',
    'bathing nook': 'A sliding door with frosted glass panes, separating the bedroom from the ensuite bathroom. The sound of running water can often be heard behind it.',
    cabinet: 'A small cabinet with a closed door.',
    'sleeping pills': `It's small tab with quite a few pills. From the description you can probably knock out a horse with these.`
};

export {
    actions,
    items,
    strings,
}