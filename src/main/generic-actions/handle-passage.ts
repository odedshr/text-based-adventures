import { GameDefinition, PassageVariable, PlayerVariable, RoomVariable } from "../types";

const goCommands = /(go|walk|move|enter|step|pass|proceed)\s+(through|into|to|toward|towards|in)\s+(the\s)?(.*)/;
const openDoorCommands = /open (the)\s+?(.*)/;

function isGoCommand(input:string) {
    return goCommands.test(input);
}

export default function handlePassage(input:string, gameDefinition:GameDefinition, userId: string):string|undefined {
    const { variables } = gameDefinition;
    const userLocation = (variables[userId] as PlayerVariable).location;

    // is user asking to go somewhere?
    if (isGoCommand(input)) {
        const destination = input.match(goCommands)?.pop();

        if (!destination || !variables[destination]) {
            return `I don't know where the ${destination} is.`;
        }

        if ((variables[destination] as PassageVariable).type ==='passage') {
            return passThroughPassage(gameDefinition, destination, userId );
        } else if ((variables[destination] as RoomVariable).type ==='room') {
            const passageName = Object.keys(variables)
                .find(key => {
                    const passage = variables[key] as PassageVariable;
                    return (passage.type === 'passage') && 
                        passage.between.includes(userLocation) &&
                        passage.between.includes(destination)
                });

            if (!passageName) {
                return `I'm not sure how to get from the ${userLocation} to the ${destination}.`;
            }
            return passThroughPassage(gameDefinition, passageName, userId );
        }
    }

    if (openDoorCommands.test(input)) {
        const passageName = input.match(openDoorCommands)?.pop()
        return passageName && openPassage(gameDefinition, passageName, userId);
    }
}

function passThroughPassage(gameDefinition:GameDefinition, destination:string, userId:string) {
    const { variables, addAchievement } = gameDefinition;
    const passage = variables[destination] as PassageVariable;
    const userLocation = (variables[userId] as PlayerVariable).location;

    switch (passage.state) {
        case 'closed': return `The ${destination} is closed.`
        case 'locked': return `The ${destination} is locked.`;
        case 'hidden': return `Is there a ${destination} here?`;
        case undefined:
        case 'opened':         
            const user = variables[userId] as PlayerVariable;
            const location = passage.between.find(x => x !== userLocation) || userLocation;
            (variables[userId] as PlayerVariable) = { ...user, location };
            addAchievement(userId, `entered ${location}`);
            return `You entered the ${location}.`;
    }
}

function openPassage(gameDefinition:GameDefinition, passageName:string, userId:string) {
    const { variables, addAchievement } = gameDefinition;
    const passage = variables[passageName] as PassageVariable;

    switch (passage.state) {
        case undefined:
        case 'opened': return `The ${passageName} is already open.`;
        case 'locked': return `The ${passageName} is locked.`
        case 'hidden': return `Is there a ${passageName} here?`;
        case 'closed': 
            variables[passageName] = { ...passage, state: 'opened' };
            addAchievement(userId, `opened ${passageName}`);
            return `The ${passageName} is now open.`
    }
}