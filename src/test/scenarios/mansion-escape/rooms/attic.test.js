import { describe } from "@jest/globals";
import processMethod from '../../../../../docs/js/processor.js';
import inspectRoomActions from '../../../../../docs/js/default/inspect-room.js';
import { actions, items, strings } from '../../../../../docs/js/scenarios/mansion-escape/rooms/attic.js';

describe('attic', () => {
    it('should describe the room', async () => {
        const gameDefinition = {
            variables: { ...items, user: { location: 'attic' }, flashlight:{state:'on'} },
            actions: [...inspectRoomActions, ...actions ],
            strings
        };
        await processMethod('look around', gameDefinition, 'user');

        expect(gameDefinition.variables.console.value).toBe(gameDefinition.strings.attic(gameDefinition.variables));
    });
})