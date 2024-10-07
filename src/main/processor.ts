import { GameDefinition } from './types.js';

import normalizeInput from "./normalize-input.js";
import handleProfanity from "./profanity.js"
import { pickUpItem } from './generic-actions/pick-up.js';
import inspectItem from './generic-actions/inspect-item.js';
import inspectRoom from './generic-actions/inspect-room.js';
import handlePassage from './generic-actions/handle-passage.js';

// List of common question words
const questionWords = ["what", "who", "where", "when", "why", "how", "is", "are", "do", "does", "can", "could", "will", "would", "should"];


function isQuestion(input:string) {
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

export default async function processMethod(input:string, gameDefinition:GameDefinition, userId: string):Promise<string> {
    const { variables, actions } = gameDefinition;

    input = input.trim().toLowerCase();

    const profanity = handleProfanity(input);
    if (profanity) {
        return profanity
    }

    // remove abbreviations
    input = normalizeInput(input);
    let response;

    // Loop through each action defined in the state
    for (const action of actions) {
        // Test if the input matches the action's verb (regular expression)
        if (action.input.test(input)) {
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
        return `I don't know how to answer to "${input}".`;
    }

    if (/\bhelp|(?:get|call|seek|find|need|ask\s+for|please\s+get|please\s+call|help\s+me|get\s+me|how\s+do\s+I|what\s+can\s+I|someone\s+help|anyone\s+help|could\s+someone|should\s+I)\s*(?:help|assistance|aid|support|rescue|someone|a\s+way)\b/.test(input)) {
        return gameDefinition.strings.help;
    }

    if ((/\b(?:look|peek|glance|gaze|stare|check|peer|observe)\s*(?:out\s*(?:of)?|through)\s*(?:the|a)?\s*(?:window|windows|glass|pane)\b/).test(input)) {
        return gameDefinition.strings.window;
    }

    if ((/\b(?:open|crack|push|slide|lift|unlock|unlatch|pull|pry)\s*(?:the|a)?\s*(?:window|windows|glass|pane)\b/).test(input)) {
        return gameDefinition.strings['open-window'];
    }
    


    if (response = pickUpItem(input, variables, userId)) {
        return response;
    }

    if (response = handlePassage(input, gameDefinition, userId)) {
        return response;
    }

    // If no action matched, return a default message
    return `I don't understand what "${input}" means. Try something else!`;
}