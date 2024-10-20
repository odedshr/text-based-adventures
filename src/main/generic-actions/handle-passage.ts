import { Action, GameDefinition, PassageVariable, PlayerVariable, RoomVariable } from "../types";
import findByReference from "./find-by-reference.js";

const openDoorCommands = /open (the)\s+?(.*)/;
const goCommands = /(climb|go|walk|move|enter|step|pass|proceed)\s+(through|into|to|toward|towards|in)\s+(the\s)?(.*)/;

const passageActions:Action[] = [
    {
        input: openDoorCommands,
        execute: (input:string, gameDefinition:GameDefinition, userId:string) => {
            const reference = input.match(openDoorCommands)?.pop()
            if (!reference) { return false; }
            const passageName = findByReference(gameDefinition, userId, reference);
            if (!passageName) { return false; }

            return openPassage(gameDefinition, passageName, userId);
        }
    },
    {
        input: goCommands,

        execute(input, gameDefinition, userId) {
            const { variables, print } = gameDefinition;

            const reference = input.match(goCommands)?.pop()

            if (!reference) { return false; }
            const destination = findByReference(gameDefinition, userId, reference);

            if (!destination) {
                print('destination-unknown', destination);
                return true;
            }
    
            if ((variables[destination] as PassageVariable).type ==='passage') {
                return passThroughPassage(gameDefinition, destination, userId );
            } else if ((variables[destination] as RoomVariable).type ==='room') {
                const userLocation = (variables[userId] as PlayerVariable).location;
                const passageName = Object.keys(variables)
                    .find(key => {
                        const passage = variables[key] as PassageVariable;
                        return (passage.type === 'passage') && 
                            passage.between.includes(userLocation) &&
                            passage.between.includes(destination)
                    });
    
                if (!passageName) {
                    print('how-to-get-there');
                    return true;
                }
                return passThroughPassage(gameDefinition, passageName, userId );
            }

            return true;
        },
    }

];

function passThroughPassage(gameDefinition:GameDefinition, destination:string, userId:string) {
    const { variables, print, addAchievement } = gameDefinition;
    const passage = variables[destination] as PassageVariable;
    const userLocation = (variables[userId] as PlayerVariable).location;

    switch (passage.state) {
        case 'closed': print('the item is closed',destination); break;
        case 'locked': print('the item is locked',destination); break;
        case 'hidden': print('the item is hidden',destination); break;
        case undefined:
        case 'opened':         
            const user = variables[userId] as PlayerVariable;
            const location = passage.between.find(x => x !== userLocation) || userLocation;
            (variables[userId] as PlayerVariable) = { ...user, location };
            addAchievement(userId, `entered ${location}`);
            print('you entered the item',location);
            break;
    }

    return true;
}

function openPassage(gameDefinition:GameDefinition, passageName:string, userId:string) {
    const { print, variables, addAchievement } = gameDefinition;
    const passage = variables[passageName] as PassageVariable;

    switch (passage.state) {
        case undefined:
        case 'opened': print('the item is already open',passageName); break;
        case 'locked': print('the item is locked',passageName); break;
        case 'hidden': print('the item is hidden',passageName); break;
        case 'closed': 
            variables[passageName] = { ...passage, state: 'opened' };
            addAchievement(userId, `opened ${passageName}`);
            print('the item is opened',passageName); break;
    }

    return true;
}

export default passageActions;