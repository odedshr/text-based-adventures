// Define common abbreviations and their full forms
const abbreviations = {
    "what's": "what is",
    "who's": "who is",
    "it's": "it is",
    "i'm": "i am",
    "can't": "cannot",
    "won't": "will not",
    "don't": "do not",
    "didn't": "did not",
    "i've": "i have",
    "you're": "you are",
    "we're": "we are",
    "they're": "they are",
    "isn't": "is not",
    "aren't": "are not",
    "wasn't": "was not",
    "weren't": "were not",
    "hasn't": "has not",
    "haven't": "have not",
    "couldn't": "could not",
    "shouldn't": "should not",
    "wouldn't": "would not",
    "let's": "let us"
    // Add more abbreviations as needed
};
export default function normalizeInput(input) {
    // Replace all occurrences of abbreviations in the input
    for (const [abbr, fullForm] of Object.entries(abbreviations)) {
        const regex = new RegExp(`\\b${abbr}\\b`, 'gi'); // Match whole word only, case insensitive
        input = input.replace(regex, fullForm);
    }
    // removed multiple spaces
    return input.replace(/\s+/g, ' ');
}
