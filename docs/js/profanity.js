// List of common foul words for example
const foulLanguageList = ["damn", "hell", "crap", "fuck", "shit", "bitch"];
// Method to check for profanity in the input
export default function handleProfanity(input) {
    if (input) {
        const lowerInput = input.toLowerCase(); // Make the input case-insensitive
        const hasProfanity = foulLanguageList.some(word => lowerInput.includes(word));
        if (hasProfanity) {
            return `It's understandable to get frustrated, but getting upset won't help.
            Take a deep breath, and maybe try exploring your surroundings or interacting with items.`;
        }
    }
    return undefined; // No profanity detected
}
