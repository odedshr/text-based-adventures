import { PuzzlePiece } from '../../../types.js';

const hallway:PuzzlePiece = {
    variables: {
        'hallway': { type: 'room' },
        'grand archway': {
            type: 'passage',
            in: 'hallway',
            out: 'foyer',
            allowedStates: ['opened'],
            state: 'opened',
        },
    },
    actions: [],
    strings: {
        hallway: `A long corridor lined with portraits and elegant sconces.
        On one side of the hallway, a grand archway leads to the foyer.
        On the other side, a ladder that leads to the attic.
        There are 5 doors here, all of which are closed.`,
        'grand archway': 'A wide archway framed with ornate molding, allowing the sound of footsteps to echo faintly between the foyer and hallway.',
        portraits: 'No one you recognize, but they all seem to be staring at you.',
    }
}

export default hallway;