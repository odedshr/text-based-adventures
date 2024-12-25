import { describe } from "@jest/globals";
import processMethod from '../../../../../docs/js/processor.js';
import inspectRoomActions from '../../../../../docs/js/default/inspect-room.js';
import initGame from '../../../../../docs/js/game-generator.js';
import puzzle from '../../../../../docs/js/scenarios/mansion-escape/rooms/office.js';


describe('office', () => {
    it('should describe the room', async () => {
        const gameDefinition = initGame(puzzle);
        gameDefinition.variables.user  = { location: 'office' };
        gameDefinition.variables.console = { type: 'data', value: '' };

        gameDefinition.actions = [ ...gameDefinition.actions, ...inspectRoomActions];

        await processMethod('look around', gameDefinition, 'user');
        
        expect(gameDefinition.variables.console.value).toBe(puzzle.strings.office(gameDefinition.variables));
    });
})