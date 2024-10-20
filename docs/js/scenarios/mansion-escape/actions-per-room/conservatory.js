const conservatoryActions = [
    {
        input: /\b(?:read|examine|inspect|check|look\s*at|study|view|scan|peruse)\s*(?:the\s*)?(?:statue\s*plaque|plaque\s*on\s*the\s*statue|statue\s*inscription|plaque)\b/,
        execute: (input, gameDefinition, userId) => {
            //7 - read plaque from statue (the code for the safe)
            const { print } = gameDefinition;
            print('not-yet-implemented');
            return false;
        }
    }
];
export default conservatoryActions;
