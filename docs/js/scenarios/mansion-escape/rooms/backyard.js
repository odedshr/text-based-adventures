import addAchievement from '../../../default/add-achievement.js';
import addToInventory from '../../../default/add-to-inventory.js';
import print from "../../../default/print.js";
const backyard = {
    actions: [
        {
            input: /\b(?:feed|give|offer)\s*(?:the\s*)?(((?:pupcake|cake|treat)\s*(?:to\s*(?:the\s*)?(?:dog|puppy))|((?:dog|puppy)\s+with\s*(?:the\s*)?(?:pupcake|cake|treat))))\b/,
            conditions: (_, userId) => [
                { item: userId, property: 'location', value: 'backyard', textId: 'location-fail:user' },
                { item: 'dog', property: 'state', value: 'hostile', textId: 'dog already sleeping' },
                { item: 'pupcake', property: 'location', value: 'dog food bowl', textId: 'location-fail:item' },
                { item: 'dog food bowl', property: 'location', value: userId, textId: 'location-fail:item' }
            ],
            execute: (gameDefinition, userId, _) => {
                const { variables } = gameDefinition;
                const dogFoodBowl = variables['dog food bowl'];
                const pupcake = variables.pupcake;
                variables['dog food bowl'] = Object.assign(Object.assign({}, dogFoodBowl), { location: 'backyard' });
                variables.pupcake = Object.assign(Object.assign({}, pupcake), { location: 'kitchen' });
                addAchievement(gameDefinition, userId, 'fed dog');
                if (pupcake.state === 'drugged') {
                    variables.dog = Object.assign(Object.assign({}, variables.dog), { state: 'sleeping' });
                    addAchievement(gameDefinition, userId, 'drugged dog');
                    print(gameDefinition, 'drugged dog');
                }
                else {
                    print(gameDefinition, 'fed dog');
                }
            }
        },
        {
            input: /\b(?:pick\s*up|fetch|grab|retrieve|get|take|collect)\s*(?:the\s*)?(?:key|keys)\s*(?:from\s*(?:the\s*)?(?:bottom|depths|floor)\s*of\s*(?:the\s*)?(?:pool|swimming\s*pool|water)|from\s*(?:the\s*)?(?:pool|swimming\s*pool))?\b/,
            conditions: (_, userId) => [
                { item: userId, property: 'location', value: 'backyard', textId: 'location-fail:user' },
                { item: 'dog', property: 'state', value: 'sleeping', textId: 'dog too hostile' },
                { item: 'key', property: 'location', value: 'pool', textId: 'location-fail:item' },
                { item: 'pool', property: 'state', value: 'drained', textId: 'pool is not empty' }
            ],
            execute: (gameDefinition, userId, input) => {
                addToInventory(gameDefinition, userId, 'key');
                print(gameDefinition, 'you-picked-up-the-item', 'key');
                addAchievement(gameDefinition, userId, 'picked up key');
            }
        }
    ],
    variables: {
        'backyard': { type: 'room' },
        'glass door': {
            type: 'passage',
            between: ['conservatory', 'backyard'],
            allowedStates: ['opened', 'closed'],
            state: 'opened',
        },
        dog: {
            type: 'item',
            location: 'backyard',
            state: 'hostile'
        },
        pool: {
            type: 'item',
            location: 'backyard',
            canContain: 'key',
            state: 'full'
        },
        key: {
            type: 'item',
            location: 'pool',
            canBeHeld: true,
            synonyms: ['master key']
        }
    },
    strings: {
        backyard(variables) {
            const isFull = variables.pool.state == 'full';
            const isSleeping = variables.dog.state == 'sleeping';
            return `An open outdoor area with manicured lawns, flowerbeds, and a few benches.
            A${isFull ? '' : 'n empty'} private swimming pool is at the center of the yard.
            ${isSleeping ? 'A rottweiler is sleeping in its kennel.' : 'A rottweiler is standing on alert between you and the pool, growling at you.'}`;
        },
        'glass door': 'A glass door leads to the conservatory.',
        pool(variables) {
            const isFull = variables.pool.state == 'full';
            const hasKey = variables.key.location == 'pool';
            return `It's a small swimming pool.${isFull ? `The water is freezing cold.` : `It's been emptied of water though.`}${hasKey ? ` There's a key at the bottom of the pool.` : ''}`;
        },
        'pool is not empty': `The water are freezing. It strikes you as an impressively stupid idea to dive in to get the key.`,
        dog(variables) {
            const sleeping = variables.dog.state == 'sleeping';
            return sleeping ?
                `Now fast asleep, the rottweiler doesn't look very intimidating. Yet you wouldn't dare to go near him.` :
                `It's a rottweiler in the size of a small horse. It's growling at you in way that means nothing but death.`;
        },
        key: `It's a key to door. By the looks of it you can guess it's big heavy old door.`,
        'dog too hostile': 'The dog growls at you when you try to approach the pool. You dare not step any further.',
        'fed dog': `The dog ate the pupcake in a single bite. It doesn't look any less hostile though.`,
        'drugged dog': 'Finally the dogs comes down and heads to sleep in its kennel.'
    }
};
export default backyard;
