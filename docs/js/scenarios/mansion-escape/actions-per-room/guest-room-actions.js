const guestRoomActions = [
    {
        input: /\b(?:look\s*for|search\s*for|find|locate|check\s*for|seek\s*out)\s*(?:the\s*)?(?:light\s*switch|switch|light\s*control|lighting\s*switch)\b/,
        execute: (input, gameDefinition, userId) => {
            //0 - find light switch
            const { print } = gameDefinition;
            print('not-yet-implemented');
            return false;
        }
    }
    // guest room:
    //1 - find bag (in guest room)
];
export default guestRoomActions;
