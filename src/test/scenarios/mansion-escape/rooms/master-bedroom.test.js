import { describe } from "@jest/globals";
import processMethod from '../../../../../docs/js/processor.js';
import inspectRoomActions from '../../../../../docs/js/default/inspect-room.js';
import inspectItemActions from '../../../../../docs/js/default/inspect-item.js';
import { actions, items, strings } from '../../../../../docs/js/scenarios/mansion-escape/rooms/master-bedroom.js';

import genericStrings from '../../../../../docs/js/default/strings.js';
import initGame from '../../../../../docs/js/game-generator.js';

describe('master bedroom', () => {
    it('should describe the room', async () => {
        const gameDefinition = initGame(
            { ...items, user: { type: "player", location: "master bedroom", canContain: 1 },
                'small key': {
                    type: 'item',
                    location: 'user',
                    canBeHeld: true
                }
            },
            [...inspectRoomActions, ...actions ],
            strings
        );
        await processMethod('look around', gameDefinition, 'user');

        expect(gameDefinition.variables.console.value).toBe(strings["master bedroom"]);
    });

    describe('unlock the drawer', () => {
        ['unlock drawer',
        'unlock nightstand drawer']
        .forEach(input => it(`should handle 'unlock the drawer'`, async () => {
            const smallKey = items['small key'];
            const gameDefinition = initGame(
                { ...items, user: { type: "player", location: "master bedroom", canContain: 1 },
                    'small key': {
                        type: 'item',
                        location: 'user',
                        canBeHeld: true
                    }
                },
                [...inspectRoomActions, ...actions ],
                strings
            );

            await processMethod(input, gameDefinition, 'user');
            expect(gameDefinition.variables.console.value).toBe('You need a key to unlock the nightstand drawer');
        }));

        ['unlock nightstand drawer using the small key',
        'open bedside drawer with the little key',
        'access drawer with small key'
        ]
        .forEach(input => it(`should handle 'unlock the drawer using key'`, async () => {
            const gameDefinition = initGame(
                { ...items, user: { type: "player", location: "master bedroom", canContain: 1 },
                    'small key': {
                        type: 'item',
                        location: 'user',
                        canBeHeld: true
                    }
                },
                [...inspectRoomActions, ...actions ],
                { ...strings,...genericStrings }
            );

            await processMethod(input, gameDefinition, 'user');
            expect(gameDefinition.variables.console.value).toBe(`You unlocked the nightstand drawer. There's a security badge inside.`);
        }));
    });
})