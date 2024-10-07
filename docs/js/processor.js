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
import handleProfanity from "./profanity.js";
import { pickUpItem } from './generic-actions/pick-up.js';
import inspectItem from './generic-actions/inspect-item.js';
import inspectRoom from './generic-actions/inspect-room.js';
import handlePassage from './generic-actions/handle-passage.js';
// List of common question words
const questionWords = ["what", "who", "where", "when", "why", "how", "is", "are", "do", "does", "can", "could", "will", "would", "should"];
function isQuestion(input) {
    // Normalize the input to lowercase and trim whitespace
    const cleanInput = input.trim().toLowerCase();
    // Check if the input ends with a question mark
    if (cleanInput.endsWith("?")) {
        return true;
    }
    // Check if the input starts with a question word
    const firstWord = cleanInput.split(" ")[0];
    if (questionWords.includes(firstWord)) {
        return true;
    }
    // Additional heuristic: If the input contains a verb before a subject, it might be a question
    const verbBeforeSubjectPattern = /^(is|are|was|were|can|could|will|would|should|do|does|did)\b/;
    if (verbBeforeSubjectPattern.test(cleanInput)) {
        return true;
    }
    // Default to assuming it's not a question
    return false;
}
export default function processMethod(input, gameDefinition, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const { variables, actions } = gameDefinition;
        input = input.trim().toLowerCase();
        const profanity = handleProfanity(input);
        if (profanity) {
            return profanity;
        }
        // remove abbreviations
        input = normalizeInput(input);
        let response;
        // Loop through each action defined in the state
        for (const action of actions) {
            // Test if the input matches the action's verb (regular expression)
            if (action.verb.test(input)) {
                return action.execute(input, gameDefinition, userId);
            }
        }
        if (response = inspectRoom(input, gameDefinition, userId)) {
            return response;
        }
        if (response = inspectItem(input, gameDefinition, userId)) {
            return response;
        }
        if (isQuestion(input)) {
            // Default response if the question doesn't match any specific pattern
            return `I don't know how to answer that.`;
        }
        if (response = pickUpItem(input, variables, userId)) {
            return response;
        }
        if (response = handlePassage(input, gameDefinition, userId)) {
            return response;
        }
        // If no action matched, return a default message
        return `I don't understand that command. Try something else!`;
    });
}
