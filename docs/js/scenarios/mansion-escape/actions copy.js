import { addToInventory } from '../../generic-actions/pick-up';
const actions = [
    {
        input: /^(pick up|grab|take|collect|retrieve|get|fetch)\s(the\s)?(crumpled\s|old\s|dirty\s|wrinkled\s|)\s?(newspaper|paper|magazine|flyer)$/,
        execute: (input, gameDefinition, userId) => {
            const { variables, addAchievement } = gameDefinition;
            const newspaperRoom = findRoom(variables, 'crumpled newspaper');
            const player = variables[userId];
            if (player.location !== newspaperRoom) {
                return `I'm not sure where the is it.`;
            }
            addToInventory(variables, userId, 'crumpled newspaper');
            addAchievement(userId, 'picked up newspaper');
            return 'You picked up the newspaper.';
        }
    },
    {
        input: /\b(remove|take)\s(the\s)?(portrait|picture|painting)\s(off|from)(\s(the\s)?wall)?\b/,
        execute: (input, gameDefinition, userId) => {
            var _a;
            const { variables, addAchievement } = gameDefinition;
            if (variables[userId].location !== 'office') {
                return `I rather not move things if I don't really need to.`;
            }
            const portrait = variables.portrait;
            if ((_a = portrait.state) === null || _a === void 0 ? void 0 : _a.includes('wall')) {
                portrait.state = (portrait.state || '').replace('wall', 'floor');
                addAchievement(userId, 'find secret safe');
                return `You removed the portrait from the wall. There's a safe hidden behind the portrait!`;
            }
            return `it's already off the wall`;
        }
    },
    {
        input: /\b(put|place|hang)\s(the\s)?(portrait|picture|painting)\s(back\s)?(on|onto)\s((the\s)?wall)?\b/,
        execute: (input, gameDefinition, userId) => {
            var _a;
            const { variables, addAchievement } = gameDefinition;
            if (variables[userId].location !== 'office') {
                return `I rather not move things if I don't really need to.`;
            }
            const portrait = variables.portrait;
            if ((_a = portrait.state) === null || _a === void 0 ? void 0 : _a.includes('on-the-floor')) {
                portrait.state = (portrait.state || '').replace(/floor/g, 'wall');
                addAchievement(userId, 'hide safe');
                portrait.touched = true;
                return `You put the portrait back on the wall. The safe is hidden again.`;
            }
            return `it's already on the wall`;
        }
    }
    //bathroom, pantry, kitchen, dining room, toilet, library, living room, conservatory, foyer, back yard, garage, basement, secret room
    // office
    //1 - read newspaper (learn who John Cartwright is)
    //2 - read diary (learn why the deadline in an hour)
    //3 - find safe
    //4 - unlock safe (find code?)
    //5 - steal ledger
    //6 - glue vase back (find glue?)
    //7 - put fingerprints on safe
    // attic:
    //8 - get forensic kit
    // basement:
    //9 - empty pool to get key to secret room
    // guest room:
    //0 - find light switch
    //1 - find bag (in guest room)
    // hobbies room:
    //2 - feed fish
    //3 - take key to drawer from treasure box
    //4 - get glue for vase
    // master bedroom
    //5 - unlock drawer
    //6 - get security badge for security room from drawer
    //7 - find passage to secret room
    // ensuite bathroom
    //8 - get sleeping pills
    // in security room:
    //9 - check video and see partner in the sex dungeon
    //0 - delete cctv recording
    //1 - get flashlight
    // library:
    //2 - find dog dishes recipe book
    //3 - find book how to use forensic kit
    // pantry
    //4 - get dog food
    // kitchen
    //5 - bake pup-cake with sleeping pills
    // dining room
    //6 - get dog food bowl
    // conservatory
    //7 - read plaque from statue (the code for the safe)
    // backyard
    //8 - feed dog to gain access to the garage
    //9 - get key from pool drainage using the plunger
    // garage
    //0 - get keys to the house
    // toilet
    //1 - get toilet plunger
];
function findRoom(variables, itemName) {
    const item = variables[itemName];
    if (item.type === 'room') {
        return itemName;
    }
    return findRoom(variables, item.location);
}
export default actions;
