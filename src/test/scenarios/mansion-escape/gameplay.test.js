import { describe } from "@jest/globals";
import processMethod from '../../../../docs/js/processor.js';

import { actions, strings, variables, handlers } from '../../../../docs/js/scenarios/mansion-escape/index.js';

import initGame from '../../../../docs/js/game-generator.js';

async function exec(gameDefinition, userId, action, result) {
    await processMethod(action, gameDefinition, userId);
    expect(gameDefinition.variables.console.value).toBe(result);
}
describe('Game-play', () => {
    it('should win game', async () => {
        const userId = 'player1';
        const gameDefinition = initGame(variables, actions, strings, handlers);
        
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
        expect(gameDefinition.variables.console.value).toBe('a attic ladder leading to the attic, a grand archway leading to the foyer, a bedroom door, a craft door, a lavish door and a blue door leading to the office.');

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

        await processMethod('pick up glue', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('You picked up the glue.');

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

        await processMethod('go to ensuite bathroom', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('You entered the ensuite bathroom.');

        await processMethod('describe room', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('A private bathroom with marble countertops, a clawfoot tub, a separate shower, and elegant fixtures. Towels hang neatly on heated racks.');

        await processMethod('examine cabinet', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('A small cabinet with a closed door.');

        await processMethod('pick up sleeping pills', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('You picked up the sleeping pills.');
        
        await processMethod('go to master bedroom', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('You entered the master bedroom.');

        await processMethod('go to hallway', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('You entered the hallway.');

        await processMethod('go to foyer', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('You entered the foyer.');

        await processMethod('go to living room', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('You entered the living room.');
        
        await processMethod('go to conservatory', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('You entered the conservatory.');

        await processMethod('examine statue', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('You noticed the weird date on the plaque.');

        await processMethod('go to living room', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('You entered the living room.');

        await processMethod('go to library', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('You entered the library.');
        
        await processMethod('go to office', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('You entered the office.');

        await processMethod('glue broken vase', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('You carefully glue the broken vase.');

        await processMethod('take portrait off the wall', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe(`You removed the portrait from the wall. There's a safe hidden behind the portrait!`);

        await processMethod('unlock safe', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe(`The safe requires a particular key combination to be unlocked.`);

        await processMethod('use code 30 02 1985 to unlock safe', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe(`The safe is unlocked. There's a ledge inside.`);

        await processMethod('pick up ledger', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('You pick up the ledger. You got the incriminating evidence you came for.');
        
        await processMethod('lock safe', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe(`You carefully locked the safe.`);

        await processMethod('go to hallway', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('You entered the hallway.');

        await processMethod('go to foyer', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('You entered the foyer.');

        await processMethod('go to toilet', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('You entered the toilet.');

        await processMethod('look around', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('The toilet room is small and functional. The sink is clean and well-maintained, and the tap is turned off.');

        await processMethod('unscrew water valve', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('You unscrew the red water valve from the pipe and put it in your inventory.');

        await processMethod('go to foyer', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('You entered the foyer.');

        await processMethod('go to dining room', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('You entered the dining room.');

        await processMethod('go to kitchen', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('You entered the kitchen.');

        await processMethod('go to basement', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('You entered the basement.');

        await processMethod('use valve on pipe', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('You screw the red valve to the pipe. You can now use it to drain the pool!');

        await processMethod('use valve to drain pool', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('You can hear the water being drain out of the pool');

        await processMethod('unlock vault door using security badge', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('The vault is unlocked!');

        await processMethod('walk through vault door', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('You entered the security room.');

        await processMethod('describe the room', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('The security room is a large and well-constructed room, filled with security cameras and surveillance equipment. It is a must-see if you want to escape the mansion.');

        await processMethod('look around', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('The security room is a large and well-constructed room, filled with security cameras and surveillance equipment. It is a must-see if you want to escape the mansion.');

        await processMethod('pick up flashlight', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('You picked up the flashlight.');

        await processMethod('watch cctv recording', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('You watch the cctv recording. partner in secret room; hit by the head');

        await processMethod('scrub cctv recording', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('You delete all evidence of your actions from the cctv recording.');

        await processMethod('go to basement', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('You entered the basement.');

        await processMethod('go to kitchen', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('You entered the kitchen.');

        await processMethod('go to pantry', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('You entered the pantry.');

        await processMethod('look around', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('A small room adjacent to the kitchen, lined with shelves stocked with dry goods, canned food, and kitchen supplies.');

        await processMethod('pick up dog food', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('You picked up the dog food.');

        await processMethod('pick up batteries', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('You picked up the batteries.');

        await processMethod('go to kitchen', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('You entered the kitchen.');

        await processMethod('go to dining room', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('You entered the dining room.');

        await processMethod('look around', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('A formal dining room with a long table, elegant chandeliers, and a sideboard for serving. Fine china and silverware are neatly arranged for guests.');
        
        await processMethod('pick up dog bowl', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('You picked up the dog food bowl.');

        await processMethod('go to foyer', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('You entered the foyer.');

        await processMethod('go to living room', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('You entered the living room.');

        await processMethod('go to conservatory', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('You entered the conservatory.');

        await processMethod('go to backyard', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('You entered the backyard.');

        await processMethod('fetch key from pool', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('You picked up the key.');

        await processMethod('go to conservatory', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('You entered the conservatory.');

        await processMethod('go to living room', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('You entered the living room.');

        await processMethod('go to foyer', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('You entered the foyer.');

        await processMethod('go to hallway', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('You entered the hallway.');

        await processMethod('go to attic', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('You entered the attic.');

        await processMethod('look around', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe(`The room is utter darkness. You can't see anything.`);

        await processMethod('turn on flashlight', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe(`You probably need to get batteries for this flashlight to work.`);

        await processMethod('put batteries in flashlight', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe(`You put the batteries in the flashlight, but you're wondering how much juice they actually have in them.`);

        await processMethod('turn on flashlight', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe(`You turn on the flashlight. Let's see how long it would last.`);

        await processMethod('look around', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('A dusty, dimly lit space filled with old trunks, forgotten furniture, and cobwebs. The air smells of age and memories.');

        await processMethod('look in boxes', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('There are quite a few dusty boxes here with all sorts of rubbish inside. The only thing that looks interesting is a forensic kit.');

        await processMethod('pick up forensic kit', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('You picked up the forensic kit.');

        await processMethod('turn off flashlight', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe(`You turn off the flashlight. Smart thinking.`);

        await processMethod('go to hallway', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('You entered the hallway.');

        await processMethod('go to master bedroom', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('You entered the master bedroom.');

        await processMethod('look for secret door', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('You found the secret room!');

        await processMethod('enter secret room', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('You entered the secret room.');

        await processMethod('look around', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('A hidden room, accessible only by a secret passage. It contains mysterious artifacts, old documents, and a single desk covered in dust.');

        await processMethod('copy fingerprints from the train model', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('You carefully copied the fingerprints from the train model.');

        await processMethod('go to master bedroom', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('You entered the master bedroom.');

        await processMethod('go to hallway', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('You entered the hallway.');

        await processMethod('go to office', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('You entered the office.');

        await processMethod('use fingerprints on safe', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('You carefully planted the fingerprints on the safe.');

        await processMethod('put portrait back on the wall', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe(`You put the portrait back on the wall. The safe is hidden again.`);

        await processMethod('go to hallway', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('You entered the hallway.');

        await processMethod('go to foyer', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('You entered the foyer.');

        await processMethod('unlock main door using master key', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('You unlock the main door.');

        await processMethod('walk through main door', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe(`You flee the mansion. After some time Cartwright notices the missing ledger. He checks the surveillance tapes which were scrubbed of.
        He checks the safe for fingerprints and find Lola, who is shortly after apprehended.
        You manage to use the ledger to incriminate Cartwright. Good Job!`);

        const results = JSON.stringify(gameDefinition.variables.achievements.value);
        const expected = JSON.stringify([
            "player1 picked up newspaper",
            "player1 read newspaper",
            "player1 read journal",
            "player1 find secret safe",
            "player1 hid safe",
            "player1 opened blue door",
            "player1 entered the hallway",
            "player1 opened bedroom door",
            "player1 entered the guest room",
            "player1 found light switch",
            "player1 opened craft door",
            "player1 entered the hobby room",
            "player1 fed the fish",
            "player1 took small key out of treasure box",
            "player1 returned treasure box",
            "player1 opened lavish door",
            "player1 entered the master bedroom",
            "player1 unlocked nightstand drawer",
            "player1 entered the ensuite bathroom",
            "player1 entered the foyer",
            "player1 entered the living room",
            "player1 entered the conservatory",
            "player1 read plaque on statue",
            "player1 entered the library",
            "player1 entered the office",
            "player1 glued the vase",
            "player1 unlocked safe",
            "player1 obtained ledger",
            "player1 locked safe",
            "player1 entered the toilet",
            "player1 picked up water valve",
            "player1 entered the dining room",
            "player1 entered the kitchen",
            "player1 entered the basement",
            "player1 secured valve to pipe",
            "player1 drained the pool",
            "player1 unlocked vault",
            "player1 entered the security room",
            "player1 watched cctv",
            "player1 scrubbed cctv",
            "player1 entered the pantry",
            "player1 entered the backyard",
            "player1 picked up key",
            "player1 entered the attic",
            "player1 put batteries in flashlight",
            "player1 used flashlight",
            "player1 found secret room",
            "player1 entered the secret room",
            "player1 copied fingerprints",
            "player1 planted fingerprints",
            "player1 unlocked main door",
            "player1 left the mansion"]);
        expect(results).toBe(expected);
    });
})

// leave mansion properly
// feed dog with sleeping pills