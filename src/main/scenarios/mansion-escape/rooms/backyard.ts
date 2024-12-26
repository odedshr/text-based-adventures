import { GameDefinition, ItemVariable,  PuzzlePiece, Variables } from '../../../types';
import addAchievement from '../../../default/add-achievement.js';
import addToInventory from '../../../default/add-to-inventory.js';
import print from "../../../default/print.js";

const backyard:PuzzlePiece = {
    variables: {
        'backyard': { type: 'room' },
        'glass door': {
            type: 'passage',
            in: 'conservatory',
            out: 'backyard',
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
    actions: [
        {
            input: /\b(?:feed|give|offer)\s*(?:the\s*)?(((?:pupcake|cake|treat)\s*(?:to\s*(?:the\s*)?(?:dog|puppy))|((?:dog|puppy)\s+with\s*(?:the\s*)?(?:pupcake|cake|treat))))\b/,
            conditions: (_:GameDefinition, userId:string) => [
                { item: userId, property: 'location', value: 'backyard', textId:'location-fail:user' },
                { item: 'dog', property: 'state', value: 'hostile', textId: 'dog already sleeping' },
                { item: 'pupcake', property: 'location', value: 'dog food bowl', textId:'location-fail:item' },
                { item: 'dog food bowl', property: 'location', value: userId, textId:'location-fail:item' }
            ],
            execute: (gameDefinition:GameDefinition, userId:string,_:string) => {
                const { variables } = gameDefinition;
                const dogFoodBowl = variables['dog food bowl'];
                const pupcake = variables.pupcake as ItemVariable;
                variables['dog food bowl'] = { ...dogFoodBowl, location: 'backyard'} as ItemVariable;
                variables.pupcake = { ...pupcake, location: 'kitchen'} as ItemVariable;
                addAchievement(gameDefinition, userId, 'fed dog');
                if (pupcake.state === 'drugged') {
                    variables.dog = { ...variables.dog, state: 'sleeping' } as ItemVariable;
                    addAchievement(gameDefinition, userId, 'drugged dog');
                    print(gameDefinition, 'drugged dog');
                } else {
                    print(gameDefinition, 'fed dog');
                }
            }
        },
        {
            input: /^(?:call|pet|feed|walk|play(?: with)?|scratch|train|teach|command|give (?:a )?(?:treat|food)|cuddle|hug|brush|groom|bathe|wash|talk to|comfort|pick up|carry|chase|throw (?:a )?(?:ball|stick)|run with|sit with|rub|pat|bond with|observe|reward|discipline|scold|love|snuggle)(.*)\s*(?:the\s*)?(?:dog|puppy|rottweiler)$/,
            conditions: (_:GameDefinition, userId:string) => [
                { item: userId, property: 'location', value: 'backyard', textId:'location-fail:user' }
            ],
            execute: (gameDefinition, userId, input) => {
                print(gameDefinition, 'dog not friendly');
            }
        },
        {
            input: /\b(?:pick\s*up|fetch|grab|retrieve|get|take|collect)\s*(?:the\s*)?(?:key|keys)\s*(?:from\s*(?:the\s*)?(?:bottom|depths|floor)\s*of\s*(?:the\s*)?(?:pool|swimming\s*pool|water)|from\s*(?:the\s*)?(?:pool|swimming\s*pool))?\b/,
            conditions: (_:GameDefinition, userId:string) => [
                { item: userId, property: 'location', value: 'backyard', textId:'location-fail:user' },
                { item: 'dog', property: 'state', value: 'sleeping', textId: 'dog too hostile' },
                { item: 'key', property: 'location', value: 'pool', textId:'location-fail:item' },
                { item: 'pool', property: 'state', value: 'drained', textId:'pool is not empty' }
            ],
            execute: (gameDefinition:GameDefinition, userId:string, input:string) => {
                addToInventory(gameDefinition, userId, 'key');
                print(gameDefinition, 'you-picked-up-the-item', 'key');
                addAchievement(gameDefinition, userId, 'picked up key');
            }
        }
    ],
    strings: {
        backyard(variables:Variables) {
            const isFull = (variables.pool as ItemVariable).state == 'full';
            const isSleeping = (variables.dog as ItemVariable).state == 'sleeping';
            return `An open outdoor area with manicured lawns, flowerbeds, and a few benches.
            A${ isFull ? '' :'n empty'} private swimming pool is at the center of the yard.
            ${isSleeping ? 'A rottweiler is sleeping in its kennel.' : 'A rottweiler is standing on alert between you and the pool, growling at you.'}`;
        },
        'glass door': 'A glass door leads to the conservatory.',
        pool(variables:Variables) {
            const isFull = (variables.pool as ItemVariable).state == 'full';
            const hasKey = (variables.key as ItemVariable).location == 'pool';
            return `It's a small swimming pool.${
                isFull ? `The water is freezing cold.` : `It's been emptied of water though.`
            }${
                hasKey? ` There's a key at the bottom of the pool.` : ''}`
        },
        'pool is not empty': `The water are freezing. It strikes you as an impressively stupid idea to dive in to get the key.`,
        dog(variables:Variables) {
            const sleeping = (variables.dog as ItemVariable).state == 'sleeping';
            return sleeping ?
            `Now fast asleep, the rottweiler doesn't look very intimidating. Yet you wouldn't dare to go near him.` : 
            `It's a rottweiler in the size of a small horse. It's growling at you in way that means nothing but death.`
        },
        key: `It's a key to door. By the looks of it you can guess it's big heavy old door.`,
        'dog not friendly': `The dog doesn't look friendly at all. You'd better not try to approach it.`,
        'dog too hostile': 'The dog growls at you when you try to approach the pool. You dare not step any further.',
        'fed dog': `The dog ate the pupcake in a single bite. It doesn't look any less hostile though.`,
        'drugged dog': 'Finally the dogs comes down and heads to sleep in its kennel.'
    }
}

export default backyard;