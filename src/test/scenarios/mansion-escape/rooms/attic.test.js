import { describe } from "@jest/globals";
import processMethod from '../../../../../docs/js/processor.js';
import inspectRoomActions from '../../../../../docs/js/default/inspect-room.js';
import puzzle from '../../../../../docs/js/scenarios/mansion-escape/rooms/attic.js';

const { variables, actions, strings } = puzzle;

describe('attic', () => {
    it('should describe the room', async () => {
        const gameDefinition = {
            variables: { ...variables, user: { location: 'attic' }, flashlight:{state:'on'}, console: { type: 'data', value: 'initial string' } },
            actions: [...inspectRoomActions, ...actions ],
            strings
        };
        await processMethod('look around', gameDefinition, 'user');

        expect(gameDefinition.variables.console.value).toBe(gameDefinition.strings.attic(gameDefinition.variables));
    });
})