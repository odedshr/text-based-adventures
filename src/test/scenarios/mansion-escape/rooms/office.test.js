import { describe } from "@jest/globals";
import processMethod from '../../../../../docs/js/processor.js';
import inspectRoomActions from '../../../../../docs/js/default/inspect-room.js';
import inspectItemActions from '../../../../../docs/js/default/inspect-item.js';
import * as passages from '../../../../../docs/js/default/passages.js';
import { actions as officeActions, items as officeItems, strings as officeStrings } from '../../../../../docs/js/scenarios/mansion-escape/rooms/office.js';

import genericStrings from '../../../../../docs/js/default/strings.js';
import initGame from '../../../../../docs/js/game-generator.js';

describe('office', () => {
    it('should describe the room', async () => {
        const gameDefinition = initGame(
            { ...officeItems, user: { type: "player", location: "office", canContain: 1 } },
            [...inspectRoomActions, ...officeActions ],
            officeStrings
        );
        await processMethod('look around', gameDefinition, 'user');

        expect(gameDefinition.variables.console.value).toBe(officeStrings.office(gameDefinition.variables));
    });
})