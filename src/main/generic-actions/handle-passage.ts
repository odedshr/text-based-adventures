import { GameDefinition, PassageVariable, PlayerVariable, RoomVariable, Variables } from "../types";

const goCommands = /(go|walk|move|enter|step|pass|proceed)\s+(through|into|to|toward|towards|in)\s+(the\s)?(.*)/;

function isGoCommand(input:string, userLocation:string) {
    return goCommands.test(input);
}

export default function handlePassage(input:string, gameDefinition:GameDefinition, userId: string) {
    const { variables } = gameDefinition;
    const userLocation = (variables[userId] as PlayerVariable).location;

    // is user asking to go somewhere?
    if (isGoCommand(input, userLocation)) {
        const destination = input.match(goCommands)![5].trim();
        if (!variables[destination]) {
            return `I don't know where the ${destination} is.`;
        }
        if ((variables[destination] as PassageVariable).type ==='passage') {
            return passThroughPassage(gameDefinition, destination, userId );
        } else if ((variables[destination] as RoomVariable).type ==='room') {
            const passageName = Object.keys(variables)
                .find(key => {
                    const passage = variables[key] as PassageVariable;
                    (passage.type === 'passage') && 
                    passage.between.includes(userLocation) &&
                    passage.between.includes(destination)
                });

            if (!passageName) {
                return `I'm not sure how to get from the ${userLocation} to the ${destination}.`;
            }
            return passThroughPassage(gameDefinition, passageName, userId );
        }

    }
}

function passThroughPassage(gameDefinition:GameDefinition, destination:string, userId:string) {
    const { variables, addAchievements } = gameDefinition;
    const passage = variables[destination] as PassageVariable;
    const userLocation = (variables[userId] as PlayerVariable).location;

    if (passage.state === 'closed') {
        return `The ${destination} is closed.`
    }
    if (passage.state === 'locked') {
        return `The ${destination} is locked.`
    }
    if (passage.state === 'opened') {
        const user = variables[userId] as PlayerVariable;
        const location = passage.between.find(x => x !== userLocation) || userLocation;
        (variables[userId] as PlayerVariable) = { ...user, location };
        addAchievements(userId, `entered ${location}`);
    }
}