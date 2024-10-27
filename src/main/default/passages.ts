import { Action, GameDefinition, PassageVariable, PlayerVariable, RoomVariable } from "../types";
import findByReference from "./find-by-reference.js";

const openDoorCommands = /open\s?(the\s+)?(.*)/;
const closeDoorCommands = /close (the)\s+?(.*)/;
const goCommands = /(climb|go|walk|move|enter|step|pass|proceed)\s+(through|into|to|toward|towards|in)\s+(the\s)?(.*)/;
const climbCommands = /climb\s(?:up\s|down\s)?(?:the\s)?(.*)/;

const actions:Action[] = [
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
        input: closeDoorCommands,
        execute: (input:string, gameDefinition:GameDefinition, userId:string) => {
            const reference = input.match(closeDoorCommands)?.pop()
            if (!reference) { return false; }
            const passageName = findByReference(gameDefinition, userId, reference);
            if (!passageName) { return false; }

            return closePassage(gameDefinition, passageName, userId);
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
    },
    {
        input: climbCommands,
        execute: (input:string, gameDefinition:GameDefinition, userId:string) => {
            const reference = input.match(climbCommands)?.pop()
            if (!reference) { return false; }

            let passageName = findByReference(gameDefinition, userId, reference);           
            if (!passageName) { 
                const { variables, print} = gameDefinition;

                // sentence might have been 'climb up' without reference. we'll try to guess.
                if (['stairs', 'ladder'].includes(reference)) {
                    // sentence was very explicit about something that is not in this room
                    print('no item in here', reference);
                    return true;
                }
                
                const userLocation = (variables[userId] as PlayerVariable).location;
                passageName = Object.keys(variables).find(key => {
                    const passage = variables[key] as PassageVariable;
                    return passage.type === 'passage' && passage.between.includes(userLocation) &&
                        (passage.synonyms?.includes('stairs') || passage.synonyms?.includes('ladder'));
                });

                if (!passageName) {
                    return false; 
                }
            }

            return passThroughPassage(gameDefinition, passageName, userId );
        }
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

    if (!passage.allowedStates?.includes('opened')) {
        print('the item is not openable',passageName);
        return true;
    }

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

function closePassage(gameDefinition:GameDefinition, passageName:string, userId:string) {
    const { print, variables, addAchievement } = gameDefinition;
    const passage = variables[passageName] as PassageVariable;

    if (!passage.allowedStates?.includes('closed')) {
        print('the item is not closable',passageName);
    }

    switch (passage.state) {
        case undefined:
        case 'closed': print('the item is already closed',passageName); break;
        case 'locked': print('the item is locked',passageName); break;
        case 'hidden': print('the item is hidden',passageName); break;
        case 'opened': 
            variables[passageName] = { ...passage, state: 'closed' };
            addAchievement(userId, `closed ${passageName}`);
            print('the item is closed',passageName); break;
    }

    return true;
}


const strings = {
    'destination-unknown': `I don't know where the item is.`,
    'the item is not openable': 'The item is not something you can open.',
    'the item is not closable': 'The item is not something you can close.',
    'the item is already open': 'The item is already open.',
    'the item is locked': 'The item is locked.',
    'the item is closed': 'The item is closed.',
    'the item is hidden': 'is there a item here?',
    'the item is opened': 'The item is now opened.',
    'you entered the item': 'You entered the item.',
    'how-to-get-there': `I don't know where you can get there.`,
    'no item in here': `No item here!`
};

export {
    actions,
    strings
};