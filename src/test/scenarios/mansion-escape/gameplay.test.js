import { describe } from "@jest/globals";
import processMethod from '../../../../docs/js/processor.js';

import actions from '../../../../docs/js/scenarios/mansion-escape/actions.js';
import strings from '../../../../docs/js/scenarios/mansion-escape/strings.js';
import variables from '../../../../docs/js/scenarios/mansion-escape/variables.js';

import initGame from '../../../../docs/js/game-generator.js';

describe('Game-play', () => {
    it('should win game', async () => {
        const userId = 'player1';
        const gameDefinition = initGame(variables, actions, strings);
        
        // timer isn't being used and leaving it running will prevent to finish if there's an error
        gameDefinition.stopTimer('countdown');

        await processMethod('look around', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe(gameDefinition.strings.office(gameDefinition.variables));
        
        await processMethod('pick up newspaper', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('You picked up the crumpled newspaper.');

        await processMethod('read newspaper', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe(gameDefinition.strings['read newspaper']);

        await processMethod('read journal', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe(gameDefinition.strings['read journal']);

        await processMethod('look at portrait', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe(gameDefinition.strings.portrait(gameDefinition.variables));

        await processMethod('take portrait off the wall', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe(gameDefinition.strings['removed portrait from wall']);

        await processMethod('put portrait back on the wall', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe(gameDefinition.strings['put portrait back on wall']);

        await processMethod('open door', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('The blue door is now opened.');

        await processMethod('walk through door', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('You entered the hallway.');

        await processMethod('where am I?', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('A long corridor lined with portraits and elegant sconces. The soft carpet muffles footsteps, and several doors lead off into other rooms.');

        await processMethod('describe doors', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('a grand archway leading to the foyer, a attic ladder leading to the attic, a bedroom door, a washroom entry leading to the bathroom, a blue door leading to the office, a craft door and a lavish door.');

        await processMethod('open bedroom door', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('The bedroom door is now opened.');

        await processMethod('enter bedroom', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('You entered the guest room.');

        await processMethod('describe the room', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe(`The room is utter darkness. Maybe there's a light switch somewhere?`);

        await processMethod('look for light switch', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe(`You managed to find the light switch and turn it on.`);

        await processMethod('describe the room', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe(`It looks like a guest room. There's a bed, a small table and an empty backpack on the floor`);

        await processMethod('pick up backpack', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe(`You picked up the bag.`);

        await processMethod('go to hallway', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('You entered the hallway.');

        await processMethod('open craft door', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('The craft door is now opened.');

        await processMethod('walk through craft door', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('You entered the hobby room.');

        await processMethod('describe the room', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe(`A room dedicated to various hobby, including shelves of crafting supplies, a large table for working on projects, and musical instruments in one corner.`);

        await processMethod('feed the fish', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('You empty the fish food tub and put it in the aquarium. After eating they seems to have calmed down.');

        await processMethod('pick up treasure box', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('You picked up the treasure box.');

        await processMethod('open treasure box', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('Examining the treasure box you manage to open it and find a small key that you decide to keep for now.');

        await processMethod('put treasure box back', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('You carefully put the treasure box back where you found it.');

        await processMethod('go to hallway', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('You entered the hallway.');

        await processMethod('open lavish door', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('The lavish door is now opened.');
        
        await processMethod('go to lavish door', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('You entered the master bedroom.');
        
        await processMethod('describe the room', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('A luxurious bedroom with a king-sized bed, ornate wooden furniture, a walk-in closet, and a grand view of the estate grounds.');

        await processMethod('unlock nightstand drawer', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('You need a key to unlock the nightstand drawer');

        await processMethod('unlock nightstand drawer using the small key', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe(`You unlocked the nightstand drawer. There's a security badge inside.`);
        
        await processMethod('pick up security badge', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe(`You picked up the security badge.`);

        await processMethod('go to hallway', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('You entered the hallway.');

        await processMethod('go to foyer', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('You entered the foyer.');

        await processMethod('go to dining room', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('You entered the dining room.');

        await processMethod('go to kitchen', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('You entered the kitchen.');

        await processMethod('go to basement', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('You entered the basement.');

        await processMethod('unlock vault door using security badge', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('The vault is unlocked!');

        const results = JSON.stringify(gameDefinition.variables.achievements.value);
        const expected = JSON.stringify([
            "player1 picked up newspaper",
            "player1 read newspaper",
            "player1 read journal",
            "player1 find secret safe",
            "player1 hid safe",
            "player1 opened blue door",
            "player1 entered hallway",
            "player1 opened bedroom door",
            "player1 entered guest room",
            "player1 found light switch",
            "player1 opened craft door",
            "player1 entered hobby room",
            "player1 fed the fish",
            "player1 took small key out of treasure box",
            "player1 returned treasure box",
            "player1 opened lavish door",
            "player1 entered master bedroom",
            "player1 unlocked nightstand drawer",
            "player1 entered foyer",
            "player1 entered dining room",
            "player1 entered kitchen",
            "player1 entered basement",
            "player1 unlocked vault"]);
        expect(results).toBe(expected);
    });
})