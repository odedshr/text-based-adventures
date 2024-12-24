var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import normalizeInput from "./normalize-input.js";
import hasProfanity from "./profanity.js";
import isValidAction from './default/is-valid-action.js';
import print from './default/print.js';
export default function processMethod(input, gameDefinition, userId) {
    return __awaiter(this, void 0, void 0, function* () {
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
                if ((!action.conditions || isValid(gameDefinition, userId, input, action.conditions))) {
                    action.execute(gameDefinition, userId, input);
                }
                return;
            }
        }
        console.error('unknown input', input);
        print(gameDefinition, 'what input means', input);
    });
}
function isValid(gameDefinition, userId, input, conditions) {
    if (!conditions) {
        return true;
    }
    if (typeof conditions === 'function') {
        return isValidAction(gameDefinition, conditions(gameDefinition, userId, input));
    }
    if (Array.isArray(conditions)) {
        return isValidAction(gameDefinition, conditions);
    }
    throw (new Error(`Invalid conditions: ${conditions}`));
}
