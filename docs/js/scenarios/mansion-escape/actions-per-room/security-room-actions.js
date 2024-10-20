const securityRoomActions = [
    {
        input: /\b(?:check|inspect|review|examine|look\s*at)\s*(?:the\s*)?(?:cctv\s*recording|cctv\s*footage|video\s*recording)\b/,
        execute: (input, gameDefinition, userId) => {
            //9 - check video and see partner in the sex dungeon
            const { print } = gameDefinition;
            print('not-yet-implemented');
            return false;
        }
    },
    {
        input: /\b(?:delete|remove|erase|discard|clear)\s*(?:the\s*)?(?:cctv\s*recording|cctv\s*footage|video\s*recording)\b/,
        execute: (input, gameDefinition, userId) => {
            //0 - delete cctv recording
            const { print } = gameDefinition;
            print('not-yet-implemented');
            return false;
        }
    }
    //1 - get flashlight
];
export default securityRoomActions;
