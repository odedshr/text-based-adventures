import { Action, GameDefinition, PassageVariable, PlayerVariable, RoomVariable } from "../types";
import addAchievement from "./add-achievement.js";
import findByReference from "./find-by-reference.js";
import print from "./print.js";

const openDoorCommands = /open\s?(the\s+)?(.*)/;
const closeDoorCommands = /close (the)\s+?(.*)/;
const enterRoom = /enter (the\s+)?(.*)/;
const goCommands = /(climb|go|walk|move|enter|step|pass|proceed)\s+(through|into|to|toward|towards|in)\s+(the\s)?(.*)/;
const climbCommands = /climb\s(?:up\s|down\s)?(?:the\s)?(.*)/;

const actions:Action[] = [
    {
        input: openDoorCommands,
        execute: (input:string, gameDefinition:GameDefinition, userId:string) => {
            const passageName = findItem(gameDefinition, userId, input.match(openDoorCommands)?.pop());

            if (passageName) {
                openPassage(gameDefinition, passageName, userId);
            }
        }
    },
    {
        input: closeDoorCommands,
        execute: (input:string, gameDefinition:GameDefinition, userId:string) => {
            const passageName = findItem(gameDefinition, userId, input.match(closeDoorCommands)?.pop());

            if (passageName) {
                closePassage(gameDefinition, passageName, userId);
            }
        }
    },
    {
        input: goCommands,

        execute(input, gameDefinition, userId) {
            const destination = findItem(gameDefinition, userId, input.match(goCommands)?.pop());
            const { variables } = gameDefinition;

            if (!destination) {
                return;
            } else if ((variables[destination] as PassageVariable).type ==='passage') {
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
                    print(gameDefinition,'how-to-get-there',userLocation,destination);
                    return;
                }
                return passThroughPassage(gameDefinition, passageName, userId );
            }

            print(gameDefinition, 'destination-unknown', destination);
        },
    },
    {
        input: enterRoom,
        execute: (input:string, gameDefinition:GameDefinition, userId:string) => {
            const { variables } = gameDefinition;
            const destination = findItem(gameDefinition, userId, input.match(enterRoom)?.pop());

            if (destination && (variables[destination] as RoomVariable).type ==='room') {
                const userLocation = (variables[userId] as PlayerVariable).location;
                const passageName = Object.keys(variables)
                    .find(key => {
                        const passage = variables[key] as PassageVariable;
                        return (passage.type === 'passage') && 
                            passage.between.includes(userLocation) &&
                            passage.between.includes(destination)
                    });
                if (!passageName) {
                    print(gameDefinition,'how-to-get-there',userLocation,destination);
                    return;
                }
                return passThroughPassage(gameDefinition, passageName, userId );
            }

            print(gameDefinition, 'destination-unknown', destination);
        }
    },
    {
        input: climbCommands,
        execute: (input:string, gameDefinition:GameDefinition, userId:string) => {
            const reference = input.match(climbCommands)?.pop()
            if (!reference) { return false; }

            let passageName = findByReference(gameDefinition, userId, reference);           
            if (!passageName) { 
                const { variables } = gameDefinition;

                // sentence might have been 'climb up' without reference. we'll try to guess.
                if (['stairs', 'ladder'].includes(reference)) {
                    // sentence was very explicit about something that is not in this room
                    print(gameDefinition, 'no item in here', reference);
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

function findItem(gameDefinition:GameDefinition, userId:string, reference?:string):string | undefined {
    if (!reference) { 
        print(gameDefinition, 'destination-unknown');    
        return undefined;
    }

    const passageName = findByReference(gameDefinition, userId, reference);
    if (!passageName) {
        print(gameDefinition, 'destination-unknown');
        return undefined;
    }

    return passageName;
}

function passThroughPassage(gameDefinition:GameDefinition, destination:string, userId:string) {
    const { variables } = gameDefinition;
    const passage = variables[destination] as PassageVariable;
    const userLocation = (variables[userId] as PlayerVariable).location;

    switch (passage.state) {
        case 'closed': print(gameDefinition, 'the item is closed',destination); break;
        case 'locked': print(gameDefinition, 'the item is locked',destination); break;
        case 'hidden': print(gameDefinition, 'the item is hidden',destination); break;
        case undefined:
        case 'opened':         
            const user = variables[userId] as PlayerVariable;
            const location = passage.between.find(x => x !== userLocation) || userLocation;
            (variables[userId] as PlayerVariable) = { ...user, location };
            if (location !== 'outside') {
                addAchievement(gameDefinition, userId, `entered the ${location}`);
                print(gameDefinition, 'you entered the item',location);
            }
            break;
    }

    return true;
}

function openPassage(gameDefinition:GameDefinition, passageName:string, userId:string) {
    const { variables } = gameDefinition;
    const passage = variables[passageName] as PassageVariable;

    if (!passage.allowedStates?.includes('opened')) {
        print(gameDefinition, 'the item is not openable',passageName);
        return;
    }

    switch (passage.state) {
        case undefined:
        case 'opened': print(gameDefinition, 'the item is already open',passageName); return;
        case 'locked': print(gameDefinition, 'the item is locked',passageName); return;
        case 'hidden': print(gameDefinition, 'the item is hidden',passageName); return;
        case 'closed': 
            variables[passageName] = { ...passage, state: 'opened' };
            addAchievement(gameDefinition, userId, `opened ${passageName}`);
            print(gameDefinition,'the item is opened',passageName); return;
    }
}

function closePassage(gameDefinition:GameDefinition, passageName:string, userId:string) {
    const { variables } = gameDefinition;
    const passage = variables[passageName] as PassageVariable;

    if (!passage.allowedStates?.includes('closed')) {
        print(gameDefinition, 'the item is not closable',passageName);
        return;
    }

    switch (passage.state) {
        case undefined:
        case 'closed': print(gameDefinition, 'the item is already closed',passageName); return;
        case 'locked': print(gameDefinition, 'the item is locked',passageName); return;
        case 'hidden': print(gameDefinition, 'the item is hidden',passageName); return;
        case 'opened': 
            variables[passageName] = { ...passage, state: 'closed' };
            addAchievement(gameDefinition, userId, `closed ${passageName}`);
            print(gameDefinition, 'the item is closed',passageName); return;
    }
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
    'how-to-get-there': `I don't know how to get from item to location`,
    'no item in here': `No item here!`
}

export {
    actions,
    strings
};