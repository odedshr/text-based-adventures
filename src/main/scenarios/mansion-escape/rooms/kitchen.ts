import { GameDefinition, ItemVariable, PuzzlePiece } from '../../../types';
import print from '../../../default/print.js';
import addAchievement from '../../../default/add-achievement.js';

const kitchen:PuzzlePiece = {
    variables: {
        'kitchen': { type: 'room' },
        'swinging door': {
            type: 'passage',
            in: 'kitchen',
            out: 'dining room',
            allowedStates: ['opened'],
            state: 'opened',
        },
        pupcake: {
            type: 'item',
            state: 'no-pill', // no-pull | drugged
            location: 'kitchen',
            canBeHeld: true
        }
    },
    actions: [
        {
            input: /\b(?:make|prepare|bake|create)\s*(?:a\s*)?(?:pupcakes?|dog\s*cakes?|treat|dog food)\s*(?:using|with|by\s*using|containing)\s*(?:sleeping\s*pills?|sleep\s*medication|pills?)\b/,
            conditions: (_:GameDefinition, userId:string) => [
                {item: userId, property: 'location', value: 'kitchen', textId:'missing kitchen appliances'},
                {item: 'dog food', property: 'location', value: userId, textId:'location-fail:item'},
                {item: 'sleeping pills', property: 'location', value: userId, textId:'location-fail:item'},
                {item: 'dog food bowl', property: 'location', value: userId, textId:'location-fail:item'},
            ],
            execute: (gameDefinition:GameDefinition, userId:string,_:string) => {
                const { variables } = gameDefinition;
                const pupcake = variables.pupcake;
                variables.pupcake = { ...pupcake, location: 'dog food bowl', state: 'drugged'} as ItemVariable;
                addAchievement(gameDefinition, userId, 'prepared pupcakes');
                addAchievement(gameDefinition, userId, 'drugged pupcakes');
                print(gameDefinition, 'prepared drugged pupcakes');
            }
        },
        {
            input: /\b(?:make|prepare|bake|create)\s*(?:a\s*)?(?:pupcakes?|dog\s*cakes?|treat|dog food)\b/,
            conditions: (_:GameDefinition, userId:string) => [
                {item: userId, property: 'location', value: 'kitchen', textId:'missing kitchen appliances'},
                {item: 'dog food', property: 'location', value: userId, textId:'location-fail:item'},
                {item: 'dog food bowl', property: 'location', value: userId, textId:'location-fail:item'},
            ],
            execute: (gameDefinition:GameDefinition, userId:string,_:string) => {
                const { variables } = gameDefinition;
                const pupcake = variables.pupcake;
                variables.pupcake = { ...pupcake, location: 'dog food bowl' } as ItemVariable;
                addAchievement(gameDefinition, userId, 'prepared pupcakes');
                print(gameDefinition, 'prepared pupcakes');
            }
        },
        {
            input: /\b(?:add|put|mix|insert|include)\s*(?:a\s*)?(?:sleeping\s*pill|sleep\s*medication|pill|sleeping\s*pills)\s*(?:into|to|in|with)\s*(?:the\s*)?(?:pupcakes?|dog\s*cakes?|treat|dog food)\b/,
            conditions: (_:GameDefinition, userId:string) => [
                {item: 'pupcake', property: 'location', value: 'dog food bowl', textId:'location-fail:item'},
                {item: 'sleeping pills', property: 'location', value: userId, textId:'location-fail:item'},
            ],
            execute: (gameDefinition:GameDefinition, userId:string,_:string) => {
                const { variables } = gameDefinition;
                const pupcake = variables.pupcake;
                variables.pupcake = { ...pupcake, location: userId, state: 'drugged'} as ItemVariable;
                addAchievement(gameDefinition, userId, 'drugged pupcakes');
                print(gameDefinition, 'added sleeping pills pupcakes');
            }
        }
    ],
    strings: {
        kitchen: 'A modern kitchen with stainless steel appliances, marble countertops, and a large central island. The room smells of fresh herbs and baking bread.',
        'swinging door': 'A large, swinging door, padded to reduce noise. It swings silently back and forth, allowing the kitchen staff to easily transport dishes between the kitchen and dining room.',
        'missing kitchen appliances': 'You need kitchen appliances to follow this recipe.',
        pupcake: 'A dog-friendly cupcake, perfect for keeping the mansion’s guard dog happy.',
        'prepared pupcakes': 'You skillfully follow the recipe and prepare a pupcake that a dog might eat.',
        'prepared drugged pupcakes': 'While carefully adding the sleeping pills, you skillfully follow the recipe and prepare a pupcake that a dog might eat.',
        'added sleeping pills pupcakes': 'You carefully add a crushed sleeping pill into the pupcake.'
    }
}

export default kitchen;