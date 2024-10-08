import officeActions from './actions-per-room/office-actions';
const actions = [
    ...officeActions
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
