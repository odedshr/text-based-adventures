const goCommands = /(go|walk|move|enter|step|pass|proceed)\s+(through|into|to|toward|towards|in)\s+(the\s)?(.*)/;
const openDoorCommands = /open (the)\s+?(.*)/;
function isGoCommand(input) {
    return goCommands.test(input);
}
export default function handlePassage(input, gameDefinition, userId) {
    var _a, _b;
    const { variables } = gameDefinition;
    const userLocation = variables[userId].location;
    // is user asking to go somewhere?
    if (isGoCommand(input)) {
        const destination = (_a = input.match(goCommands)) === null || _a === void 0 ? void 0 : _a.pop();
        if (!destination || !variables[destination]) {
            return `I don't know where the ${destination} is.`;
        }
        if (variables[destination].type === 'passage') {
            return passThroughPassage(gameDefinition, destination, userId);
        }
        else if (variables[destination].type === 'room') {
            const passageName = Object.keys(variables)
                .find(key => {
                const passage = variables[key];
                return (passage.type === 'passage') &&
                    passage.between.includes(userLocation) &&
                    passage.between.includes(destination);
            });
            if (!passageName) {
                return `I'm not sure how to get from the ${userLocation} to the ${destination}.`;
            }
            return passThroughPassage(gameDefinition, passageName, userId);
        }
    }
    if (openDoorCommands.test(input)) {
        const passageName = (_b = input.match(openDoorCommands)) === null || _b === void 0 ? void 0 : _b.pop();
        return passageName && openPassage(gameDefinition, passageName, userId);
    }
}
function passThroughPassage(gameDefinition, destination, userId) {
    const { variables, addAchievement } = gameDefinition;
    const passage = variables[destination];
    const userLocation = variables[userId].location;
    switch (passage.state) {
        case 'closed': return `The ${destination} is closed.`;
        case 'locked': return `The ${destination} is locked.`;
        case 'hidden': return `Is there a ${destination} here?`;
        case undefined:
        case 'opened':
            const user = variables[userId];
            const location = passage.between.find(x => x !== userLocation) || userLocation;
            variables[userId] = Object.assign(Object.assign({}, user), { location });
            addAchievement(userId, `entered ${location}`);
            return `You entered the ${location}.`;
    }
}
function openPassage(gameDefinition, passageName, userId) {
    const { variables, addAchievement } = gameDefinition;
    const passage = variables[passageName];
    switch (passage.state) {
        case undefined:
        case 'opened': return `The ${passageName} is already open.`;
        case 'locked': return `The ${passageName} is locked.`;
        case 'hidden': return `Is there a ${passageName} here?`;
        case 'closed':
            variables[passageName] = Object.assign(Object.assign({}, passage), { state: 'opened' });
            addAchievement(userId, `opened ${passageName}`);
            return `The ${passageName} is now open.`;
    }
}
