const backyardActions = [
    {
        input: /\b(?:feed|give|offer)\s*(?:the\s*)?(?:pupcake|cake|treat)\s*(?:to\s*(?:the\s*)?(?:dog|puppy)|with\s*(?:the\s*)?(?:dog|puppy))\b/,
        execute: (input, gameDefinition, userId) => {
            //8 - feed dog to gain access to the garage
            const { print } = gameDefinition;
            print('not-yet-implemented');
            return false;
        }
    },
    {
        input: /\b(?:pick\s*up|grab|retrieve|get|take|collect)\s*(?:the\s*)?(?:key|keys)\s*(?:from\s*(?:the\s*)?(?:bottom|depths|floor)\s*of\s*(?:the\s*)?(?:pool|swimming\s*pool|water))\b/,
        execute: (input, gameDefinition, userId) => {
            //9 - get key from pool drainage using the plunger
            // if pool not empty then refuse
            const { print } = gameDefinition;
            print('not-yet-implemented');
            return false;
        }
    }
];
export default backyardActions;
