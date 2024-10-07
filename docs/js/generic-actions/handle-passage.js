const goCommands = /(go|walk|move|enter|step|pass|proceed)\s+(through|into|to|toward|towards|in)\s+(the\s)?(.*)/;
function isGoCommand(input, userLocation) {
    return goCommands.test(input);
}
export default function handlePassage(input, gameDefinition, userId) {
    const { variables } = gameDefinition;
    const userLocation = variables[userId].location;
    // is user asking to go somewhere?
    if (isGoCommand(input, userLocation)) {
        const destination = input.replace(goCommands, '');
        if (!variables[destination]) {
            return `I don't know where the ${destination} is.`;
        }
        if (variables[destination].type === 'passage') {
            return passThroughPassage(gameDefinition, destination, userId);
        }
        else if (variables[destination].type === 'room') {
            const passageName = Object.keys(variables)
                .find(key => {
                const passage = variables[key];
                (passage.type === 'passage') &&
                    passage.between.includes(userLocation) &&
                    passage.between.includes(destination);
            });
            if (!passageName) {
                return `I'm not sure how to get from the ${userLocation} to the ${destination}.`;
            }
            return passThroughPassage(gameDefinition, passageName, userId);
        }
    }
}
function passThroughPassage(gameDefinition, destination, userId) {
    const { variables, addAchievements } = gameDefinition;
    const passage = variables[destination];
    const userLocation = variables[userId].location;
    if (passage.state === 'closed') {
        return `The ${destination} is closed.`;
    }
    if (passage.state === 'locked') {
        return `The ${destination} is locked.`;
    }
    if (passage.state === 'opened') {
        const user = variables[userId];
        const location = passage.between.find(x => x !== userLocation) || userLocation;
        variables[userId] = Object.assign(Object.assign({}, user), { location });
        addAchievements(userId, `entered ${location}`);
    }
}
