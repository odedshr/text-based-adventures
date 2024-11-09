// List of common foul words for example
const foulLanguageList = ["damn", "hell", "crap", "fuck", "shit", "bitch"];
// Method to check for profanity in the input
export default function hasProfanity(input) {
    const lowerInput = input ? input.toLowerCase() : ''; // Make the input case-insensitive
    return foulLanguageList.some(word => lowerInput.includes(word));
}
