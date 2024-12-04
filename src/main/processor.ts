import { Condition, ConditionalGenerator, GameDefinition, ItemVariable } from './types.js';

import normalizeInput from "./normalize-input.js";
import hasProfanity from "./profanity.js"
import isValidAction from './default/is-valid-action.js';
import print from './default/print.js';

export default async function processMethod(input:string, gameDefinition:GameDefinition, userId: string):Promise<void> {
    const { actions } = gameDefinition;

    input = input.trim().toLowerCase();

    if (hasProfanity(input)) {
        print(gameDefinition, 'profanity', input);
        return;
    }

    // remove abbreviations
    input = normalizeInput(input);

    // Loop through each action defined in the state
    for (const action of actions) {
        // Test if the input matches the action's verb (regular expression)
        if (action.input.test(input)) {
            if ((!action.conditions || isValid(gameDefinition, userId, action.conditions))) {
                action.execute(input, gameDefinition, userId);
            }
            return;
        }
    }
    
    console.error('unknown input', input);
    print(gameDefinition, 'what input means', input);
}

function isValid(gameDefinition: GameDefinition, userId: string , conditions?: Condition[] | ConditionalGenerator):boolean {
    
    if (!conditions) {
        return true;
    }
    if (typeof conditions === 'function') {
        return isValidAction(gameDefinition, conditions(gameDefinition, userId));
    }
    if (Array.isArray(conditions)) {
        return isValidAction(gameDefinition, conditions);
    }

    throw(new Error(`Invalid conditions: ${conditions}`));
}