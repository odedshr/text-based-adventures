import findByReference from "./find-by-reference.js";
const openDoorCommands = /open (the)\s+?(.*)/;
const goCommands = /(climb|go|walk|move|enter|step|pass|proceed)\s+(through|into|to|toward|towards|in)\s+(the\s)?(.*)/;
const passageActions = [
    {
        input: openDoorCommands,
        execute: (input, gameDefinition, userId) => {
            var _a;
            const reference = (_a = input.match(openDoorCommands)) === null || _a === void 0 ? void 0 : _a.pop();
            if (!reference) {
                return false;
            }
            const passageName = findByReference(gameDefinition, userId, reference);
            if (!passageName) {
                return false;
            }
            return openPassage(gameDefinition, passageName, userId);
        }
    },
    {
        input: goCommands,
        execute(input, gameDefinition, userId) {
            var _a;
            const { variables, print } = gameDefinition;
            const reference = (_a = input.match(goCommands)) === null || _a === void 0 ? void 0 : _a.pop();
            if (!reference) {
                return false;
            }
            const destination = findByReference(gameDefinition, userId, reference);
            if (!destination) {
                print('destination-unknown', destination);
                return true;
            }
            if (variables[destination].type === 'passage') {
                return passThroughPassage(gameDefinition, destination, userId);
            }
            else if (variables[destination].type === 'room') {
                const userLocation = variables[userId].location;
                const passageName = Object.keys(variables)
                    .find(key => {
                    const passage = variables[key];
                    return (passage.type === 'passage') &&
                        passage.between.includes(userLocation) &&
                        passage.between.includes(destination);
                });
                if (!passageName) {
                    print('how-to-get-there');
                    return true;
                }
                return passThroughPassage(gameDefinition, passageName, userId);
            }
            return true;
        },
    }
];
function passThroughPassage(gameDefinition, destination, userId) {
    const { variables, print, addAchievement } = gameDefinition;
    const passage = variables[destination];
    const userLocation = variables[userId].location;
    switch (passage.state) {
        case 'closed':
            print('the item is closed', destination);
            break;
        case 'locked':
            print('the item is locked', destination);
            break;
        case 'hidden':
            print('the item is hidden', destination);
            break;
        case undefined:
        case 'opened':
            const user = variables[userId];
            const location = passage.between.find(x => x !== userLocation) || userLocation;
            variables[userId] = Object.assign(Object.assign({}, user), { location });
            addAchievement(userId, `entered ${location}`);
            print('you entered the item', location);
            break;
    }
    return true;
}
function openPassage(gameDefinition, passageName, userId) {
    const { print, variables, addAchievement } = gameDefinition;
    const passage = variables[passageName];
    switch (passage.state) {
        case undefined:
        case 'opened':
            print('the item is already open', passageName);
            break;
        case 'locked':
            print('the item is locked', passageName);
            break;
        case 'hidden':
            print('the item is hidden', passageName);
            break;
        case 'closed':
            variables[passageName] = Object.assign(Object.assign({}, passage), { state: 'opened' });
            addAchievement(userId, `opened ${passageName}`);
            print('the item is opened', passageName);
            break;
    }
    return true;
}
export default passageActions;
