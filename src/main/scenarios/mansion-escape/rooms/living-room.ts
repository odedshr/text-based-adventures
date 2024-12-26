import { PuzzlePiece } from '../../../types.js';

const livingRoom:PuzzlePiece = {
    variables: {
        'living room': { type: 'room' },
        'parlor door': {
            type: 'passage',
            in: 'living room',
            out: 'foyer',
            allowedStates: ['opened'],
            state: 'opened',
        }
    },
    actions: [],
    strings: {
        'living room': 'A spacious room with plush sofas, a fireplace, and a large window offering a view of the garden. Family portraits decorate the walls.',
        'parlor door': 'A pair of heavy oak doors with intricate carvings of vines and flowers. They swing open easily, revealing the warm and inviting living room beyond.',
        fireplace: 'A large fireplace but it is cold. Looks quite messy.',
        sofas: 'Comfortable and inviting, but covered in dust.',
        portraits: 'Family portraits of stern-looking people in old-fashioned clothing.'
    }
};

export default livingRoom;