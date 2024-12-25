const ensuiteBathroom = {
    actions: [],
    variables: {
        'ensuite bathroom': { type: 'room' },
        'bathing nook': {
            type: 'passage',
            between: ['master bedroom', 'ensuite bathroom'],
            allowedStates: ['opened', 'closed'],
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
            synonyms: ['sleeping pill', 'pill', 'pills', 'bottle of sleeping pills', 'sleeping pills bottle']
        }
    },
    strings: {
        'ensuite bathroom': `A private bathroom with marble countertops, a clawfoot tub, a separate shower, and elegant fixtures.
        There's a small cabinet behind the mirror.`,
        'bathing nook': 'A sliding door with frosted glass panes, separating the bedroom from the ensuite bathroom.',
        cabinet: 'Peeking inside the cabinet, you see a bottle of sleeping pills',
        'sleeping pills': `It's small tab with quite a few pills. From the description you can probably knock out a horse with these.`
    }
};
export default ensuiteBathroom;
