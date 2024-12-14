import { describe, it } from "@jest/globals";
import processMethod from '../../../../../docs/js/processor.js';
import inspectRoomActions from '../../../../../docs/js/default/inspect-room.js';
import { actions as defaultActions, strings as defaultStrings } from '../../../../../docs/js/default/index.js';
import { actions, items, strings } from '../../../../../docs/js/scenarios/mansion-escape/rooms/security-room.js';
import { actions as pantryActions, items as pantryItems, strings as pantryStrings, handlers as pantryHandlers } from '../../../../../docs/js/scenarios/mansion-escape/rooms/pantry.js';
import initGame from '../../../../../docs/js/game-generator.js';

describe('security room', () => {
    it('should describe the room', async () => {
        const gameDefinition = {
            variables: { ...items, user: { location: 'security room' }, flashlight:{state:'on'} },
            actions: [...inspectRoomActions,, ...actions ],
            strings
        };
        await processMethod('look around', gameDefinition, 'user');

        expect(gameDefinition.variables.console.value).toBe(gameDefinition.strings['security room'](gameDefinition.variables));
    });

    it('should use the flashlight', async () => {
        const gameDefinition = initGame(
            { ...items, user: { location: 'security room' }, ...pantryItems },
            [...defaultActions, ...actions, ...pantryActions ],
            {...strings, ...defaultStrings, ...pantryStrings},
            pantryHandlers
        );

        gameDefinition.variables.flashlight.location = 'user';
        gameDefinition.variables.batteries.location = 'user';
        gameDefinition.variables.batteryPower.value = 0;

        await processMethod('turn on flashlight', gameDefinition, 'user');
        expect(gameDefinition.variables.console.value).toBe('You probably need to get batteries for this flashlight to work.');

        await processMethod('put batteries in flashlight', gameDefinition, 'user');
        expect(gameDefinition.variables.console.value).toBe(`You put the batteries in the flashlight, but you're wondering how much juice they actually have in them.`);

        await processMethod('turn on flashlight', gameDefinition, 'user');
        expect(gameDefinition.variables.console.value).toBe(`You turn on the flashlight. Let's see how long it would last.`);

        await new Promise(resolve => setTimeout(resolve, 2000));
        
        expect(gameDefinition.variables.console.value).toBe(`The batteries ran out of power.`);
        await processMethod('turn on flashlight', gameDefinition, 'user');
        expect(gameDefinition.variables.console.value).toBe(`The batteries are dead.`);

        gameDefinition.stopTimer('batteryPower');
        gameDefinition.stopTimer('countdown');
    });
});