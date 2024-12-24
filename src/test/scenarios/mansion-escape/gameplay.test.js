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
        expect(gameDefinition.variables.console.value).toBe('You picked up the newspaper.');

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
        expect(gameDefinition.variables.console.value).toBe(`A long corridor lined with portraits and elegant sconces.
    On one side of the hallway, a grand archway leads to the foyer.
    On the other side, a ladder that leads to the attic.
    There are 5 doors here, all of which are closed.`);

        await processMethod('describe doors', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('a attic ladder leading to the attic, a bedroom door, a grand archway leading to the foyer, a craft door, a lavish door and a blue door leading to the office.');

        await processMethod('open bedroom door', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('The bedroom door is now opened.');

        await processMethod('enter bedroom', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe(`The room is utter darkness. Maybe there's a light switch somewhere?`);

        await processMethod('look for light switch', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe(`It looks like a guest room. There's a bed, a small table and an empty backpack on the floor`);

        await processMethod('pick up backpack', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe(`You picked up the bag.`);

        await processMethod('go to hallway', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('You entered the hallway.');

        await processMethod('open craft door', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('The craft door is now opened.');

        await processMethod('walk through craft door', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe(`A room dedicated to various hobbies, including shelves of crafting supplies, a large table for working on projects, and a cello in one corner.
    There's a large aquarium in the center of the room and a glue tube on the table.`);

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
        expect(gameDefinition.variables.console.value).toBe(`A luxurious bedroom with a king-sized bed and an ornate wooden furniture.
    There's a nightstand beside the bed.`);

        await processMethod('unlock nightstand drawer', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('You need a key to unlock the nightstand drawer');

        await processMethod('unlock nightstand drawer using the small key', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe(`You unlocked the nightstand drawer. There's a security badge inside.`);
        
        await processMethod('pick up security badge', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe(`You picked up the security badge.`);

        await processMethod('go to ensuite bathroom', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe(`A private bathroom with marble countertops, a clawfoot tub, a separate shower, and elegant fixtures.
    There's a small cabinet behind the mirror.`);

        await processMethod('examine cabinet', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('Peeking inside the cabinet, you see a bottle of sleeping pills');

        await processMethod('pick up sleeping pills', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('You picked up the sleeping pills.');
        
        await processMethod('go to master bedroom', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('You entered the master bedroom.');

        await processMethod('go to hallway', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('You entered the hallway.');

        await processMethod('go to foyer', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe(`The grand entrance to the mansion with a grand archway to the hallway, a fireplace, a chandelier, and a large rug.
    A coat stand and an empty umbrella holder are by the door. The entrance door is what stands between you and freedom.
    There is another door that leads to the dining room and a parlor door that leads to the living room.
    A small door on the side leads to the toilet.`);

        await processMethod('go to living room', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('A spacious room with plush sofas, a fireplace, and a large window offering a view of the garden. Family portraits decorate the walls.');
        
        await processMethod('go to conservatory', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe(`Glass walls offer a panoramic view of the surrounding garden and yard.
    The room is filled with lush greenery and a big statue in the center.`);

        await processMethod('examine statue', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe(`The statue is of a man, nothing too exciting, however you noticed the weird date on the plaque - 30/02/1985. Surely that can't be right? or maybe it has a hidden meaning?`);

        await processMethod('go to living room', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('You entered the living room.');

        await processMethod('go to library', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('A grand library filled with tall bookshelves, a rolling ladder, and comfortable reading chairs.');
        
        await processMethod('go to office', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('You entered the office.');

        await processMethod('glue broken vase', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('You carefully glue the broken vase.');

        await processMethod('take portrait off the wall', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe(`You removed the portrait from the wall. There's a safe hidden behind the portrait!`);

        await processMethod('unlock safe', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe(`The safe requires a particular key combination to be unlocked.`);

        await processMethod('use code 30 02 1985 to unlock safe', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe(`The safe is unlocked. There's a ledger inside.`);

        await processMethod('pick up ledger', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('You pick up the ledger. You got the incriminating evidence you came for.');
        
        await processMethod('lock safe', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe(`You carefully locked the safe.`);

        await processMethod('go to hallway', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('You entered the hallway.');

        await processMethod('go to foyer', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('You entered the foyer.');

        await processMethod('go to toilet', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe(`The toilet room is small and functional. It has a sink and cistern, but no mirror. There's a very bright red water valve on the pipe connected to the cistern.`);

        await processMethod('unscrew water valve', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('You unscrew the red water valve from the pipe and put it in your inventory.');

        await processMethod('go to foyer', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('You entered the foyer.');

        await processMethod('go to dining room', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe(`A formal dining room with a long table, elegant chandeliers, and a sideboard for serving.
    Fine china and silverware are neatly arranged for guests. A dog food bowl sits on the floor.`);

        await processMethod('go to kitchen', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('A modern kitchen with stainless steel appliances, marble countertops, and a large central island. The room smells of fresh herbs and baking bread.');

        await processMethod('go to basement', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe(`A dimly room with a low ceiling and bare cement walls. The air is damp and musty.
    A big pipe runs along the wall, slowly dripping water.
    There's a heavy metal door with keypad lock on the other side of the room.`);

        await processMethod('use valve on pipe', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('You screw the red valve to the pipe. You can now use it to drain the pool!');

        await processMethod('use valve to drain pool', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('You can hear the water being drain out of the pool');

        await processMethod('unlock vault door using security badge', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('The vault is unlocked!');

        await processMethod('walk through vault door', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe(`The security room has a desk with multiple monitors showings different CCTV footages from every possible corner of the mansion.Dread fills you knowing that there's evidence of you breaking into the mansion. There's a flashlight on the desk.`);

        await processMethod('pick up flashlight', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('You picked up the flashlight.');

        await processMethod('watch cctv recording', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe(`Checking out the security recording, you quickly find the recording of you and your partner breaking into the mansion and her knocking the vase on the back of your head.
    Seeing her face, you now recall her name - Lola. Rewinding the video further, you stumble on a video of Lola and Cartwright playing with a train set model in a room next to the master bedroom.
    They were a couple, and it seems she double-crossed you. Cartwright was probably growing suspicious of her so she just threw you under the bus to protect herself.`);

        await processMethod('scrub cctv recording', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe(`You delete all the video footages of you and Lola breaking into the mansion.
        Wisely, you find a feature to pause the recording for the next hour as well, allowing you to move freely without creating further evidence.`);

        await processMethod('go to basement', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('You entered the basement.');

        await processMethod('go to kitchen', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('You entered the kitchen.');

        await processMethod('go to pantry', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe(`A small room adjacent to the kitchen, lined with shelves stocked with dry goods, canned food, and kitchen supplies. A box of dog food is on the floor. A box of batteries is on the shelf.`);

        await processMethod('pick up dog food', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('You picked up the dog food.');

        await processMethod('pick up batteries', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('You picked up the batteries.');

        await processMethod('go to kitchen', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('You entered the kitchen.');

        await processMethod('go to dining room', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('You entered the dining room.');
        
        await processMethod('pick up dog bowl', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('You picked up the dog food bowl.');

        await processMethod('go to kitchen', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('You entered the kitchen.');

        await processMethod('prepare pupcake using sleeping pills', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('While carefully adding the sleeping pills, you skillfully follow the recipe and prepare a pupcake that a dog might eat.');

        await processMethod('go to dining room', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('You entered the dining room.');

        await processMethod('go to foyer', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('You entered the foyer.');

        await processMethod('go to living room', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('You entered the living room.');

        await processMethod('go to conservatory', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('You entered the conservatory.');

        await processMethod('go to backyard', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe(`An open outdoor area with manicured lawns, flowerbeds, and a few benches.
        An empty private swimming pool is at the center of the yard.
        A rottweiler is standing on alert between you and the pool, growling at you.`);

        await processMethod('fetch key from pool', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('The dog growls at you when you try to approach the pool. You dare not step any further.');

        await processMethod('give pupcake to dog', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe('Finally the dogs comes down and heads to sleep in its kennel.');

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
        expect(gameDefinition.variables.console.value).toBe(`The room is utter darkness. You can't see anything.`);

        await processMethod('look for light switch', gameDefinition, userId);
        expect(gameDefinition.variables.console.value).toBe(`You scramble around in the dark, but you can't find the light switch.`);

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
        expect(gameDefinition.variables.console.value).toBe(`Very oddly, there's a massive train model in the middle of the room. You try not to be too judgemental about it.`);

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
        expect(gameDefinition.variables.console.value).toBe(`You flee the mansion.
        After some time Cartwright notices the missing ledger. He checks the surveillance tapes which were scrubbed of.
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
            "player1 opened bedroom door",
            "player1 found light switch",
            "player1 opened craft door",
            "player1 fed the fish",
            "player1 took small key out of treasure box",
            "player1 returned treasure box",
            "player1 opened lavish door",
            "player1 unlocked nightstand drawer",
            "player1 read plaque on statue",
            "player1 glued the vase",
            "player1 unlocked safe",
            "player1 obtained ledger",
            "player1 locked safe",
            "player1 picked up water valve",
            "player1 secured valve to pipe",
            "player1 drained the pool",
            "player1 unlocked vault",
            "player1 watched cctv",
            "player1 scrubbed cctv",
            "player1 prepared pupcakes",
            "player1 drugged pupcakes",
            "player1 fed dog",
            "player1 drugged dog",
            "player1 picked up key",
            "player1 put batteries in flashlight",
            "player1 used flashlight",
            "player1 found secret room",
            "player1 copied fingerprints",
            "player1 planted fingerprints",
            "player1 unlocked main door",
            "player1 left the mansion"]);
        expect(results).toBe(expected);
    });
})

// leave mansion properly
// feed dog with sleeping pills