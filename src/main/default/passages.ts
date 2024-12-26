import { Action, GameDefinition, PassageVariable, PlayerVariable, RoomVariable, Variables } from "../types";
import addAchievement from "./add-achievement.js";
import findByReference from "./find-by-reference.js";
import print from "./print.js";
import { logError } from "./error-logging.js";

const openDoorCommands = /open\s?(the\s+)?(.*)/;
const closeDoorCommands = /close (the)\s+?(.*)/;
const enterRoom = /enter (the\s+)?(.*)/;
const goCommands = /(climb|go|walk|move|enter|step|pass|proceed)\s+(through|into|to|toward|towards|in)\s+(the\s)?(.*)/;
const climbCommands = /(climb|go)\s(?:up\s|down\s)?(?:the\s)?(.*)/;

const actions:Action[] = [
    {
        input: openDoorCommands,
        execute: (gameDefinition:GameDefinition, userId:string, input:string) => {
            const passageName = findItem(gameDefinition, userId, input.match(openDoorCommands)?.pop());

            if (passageName) {
                openPassage(gameDefinition, passageName, userId);
            }
        }
    },
    {
        input: closeDoorCommands,
        execute: (gameDefinition:GameDefinition, userId:string, input:string) => {
            const passageName = findItem(gameDefinition, userId, input.match(closeDoorCommands)?.pop());

            if (passageName) {
                closePassage(gameDefinition, passageName, userId);
            }
        }
    },
    {
        input: goCommands,

        execute(gameDefinition:GameDefinition, userId:string, input:string) {
            const destination = findItem(gameDefinition, userId, input.match(goCommands)?.pop());
            const { variables } = gameDefinition;

            if (!destination) {
                return;
            } else if ((variables[destination] as PassageVariable).type ==='passage') {
                return passThroughPassage(gameDefinition, destination, userId );
            } else if ((variables[destination] as RoomVariable).type ==='room') {
                const userLocation = (variables[userId] as PlayerVariable).location;
                const passageName = getPassageName(variables, userLocation, destination);
    
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
        execute: (gameDefinition:GameDefinition, userId:string, input:string) => {
            const { variables } = gameDefinition;
            const destination = findItem(gameDefinition, userId, input.match(enterRoom)?.pop());

            if (destination && (variables[destination] as RoomVariable).type ==='room') {
                const userLocation = (variables[userId] as PlayerVariable).location;
                const passageName = getPassageName(variables, userLocation, destination);

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
        execute: (gameDefinition:GameDefinition, userId:string, input:string) => {
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
                passageName = Object.keys(variables)
                    .filter(key => variables[key].type === 'passage')
                    .find(key => {
                    const passage = variables[key] as PassageVariable;
                    return [passage.in, passage.out].includes(userLocation) &&
                        (passage.synonyms?.includes('stairs') || passage.synonyms?.includes('ladder'));
                });

                if (!passageName) {
                    return false; 
                }
            }

            return passThroughPassage(gameDefinition, passageName, userId );
        }
    },
    {
        input: /(exit|leave|walk out of|get out( of)?|step outside( of)?)((\s+the)?\s+(room|mansion))?/,
        execute: (gameDefinition:GameDefinition, userId:string, _:string) => {
            const { variables } = gameDefinition;
            const userLocation = (variables[userId] as PlayerVariable).location;
            const outside = Object
                .keys(variables)
                .find(key => variables[key].type === 'passage' && variables[key].in === userLocation);
            
            if (!outside) {
                logError(gameDefinition, `Room with no exit: ${userLocation}`);
                print(gameDefinition, 'no item in here', 'exit');
                return;
            }
            
            passThroughPassage(gameDefinition, outside, userId);
        }
    }
];

function getPassageName(variables:Variables, from:string, to:string):string | undefined {
    return Object
        .keys(variables)
        .filter(key => variables[key].type === 'passage')
        .find(key => {
            const passage = variables[key] as PassageVariable;
            const between = [ passage.in, passage.out ];
            return between.includes(from) &&
                    between.includes(to)
        });
}

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

function passThroughPassage(gameDefinition:GameDefinition, passageName:string, userId:string) {
    const { variables } = gameDefinition;
    const passage = variables[passageName] as PassageVariable;
    const userLocation = (variables[userId] as PlayerVariable).location;

    switch (passage.state) {
        case 'closed': print(gameDefinition, 'the item is closed',passageName); break;
        case 'locked': print(gameDefinition, 'the item is locked',passageName); break;
        case 'hidden': print(gameDefinition, 'the item is hidden',passageName); break;
        case undefined:
        case 'opened':         
            const user = variables[userId] as PlayerVariable;
            const destination = passage.in === userLocation ? passage.out : passage.in;
            const location = variables[destination] as RoomVariable;

            (variables[userId] as PlayerVariable) = { ...user, location: destination };
            if (destination !== 'outside') {
                print(gameDefinition, 'you entered the item',destination);
            } else {
                addAchievement(gameDefinition, userId, 'left the mansion');
            }

            if (!location.visited) {
                variables[destination] = { ...location, visited: true };
                print(gameDefinition, destination);
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
    'no item in here': `No item here!`,
    'door is locked': 'The door is locked.',
    'door is not locked': 'The door is not locked.'
}

export {
    actions,
    strings
};