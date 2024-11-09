import addAchievement from "./add-achievement.js";
import findByReference from "./find-by-reference.js";
import print from "./print.js";
const openDoorCommands = /open\s?(the\s+)?(.*)/;
const closeDoorCommands = /close (the)\s+?(.*)/;
const enterRoom = /enter (the\s+)?(.*)/;
const goCommands = /(climb|go|walk|move|enter|step|pass|proceed)\s+(through|into|to|toward|towards|in)\s+(the\s)?(.*)/;
const climbCommands = /climb\s(?:up\s|down\s)?(?:the\s)?(.*)/;
const actions = [
    {
        input: openDoorCommands,
        execute: (input, gameDefinition, userId) => {
            var _a;
            const passageName = findItem(gameDefinition, userId, (_a = input.match(openDoorCommands)) === null || _a === void 0 ? void 0 : _a.pop());
            if (passageName) {
                openPassage(gameDefinition, passageName, userId);
            }
        }
    },
    {
        input: closeDoorCommands,
        execute: (input, gameDefinition, userId) => {
            var _a;
            const passageName = findItem(gameDefinition, userId, (_a = input.match(closeDoorCommands)) === null || _a === void 0 ? void 0 : _a.pop());
            if (passageName) {
                closePassage(gameDefinition, passageName, userId);
            }
        }
    },
    {
        input: goCommands,
        execute(input, gameDefinition, userId) {
            var _a;
            const destination = findItem(gameDefinition, userId, (_a = input.match(goCommands)) === null || _a === void 0 ? void 0 : _a.pop());
            const { variables } = gameDefinition;
            if (!destination) {
                return;
            }
            else if (variables[destination].type === 'passage') {
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
                    print(gameDefinition, 'how-to-get-there', userLocation, destination);
                    return;
                }
                return passThroughPassage(gameDefinition, passageName, userId);
            }
            print(gameDefinition, 'destination-unknown', destination);
        },
    },
    {
        input: enterRoom,
        execute: (input, gameDefinition, userId) => {
            var _a;
            const { variables } = gameDefinition;
            const destination = findItem(gameDefinition, userId, (_a = input.match(enterRoom)) === null || _a === void 0 ? void 0 : _a.pop());
            if (destination && variables[destination].type === 'room') {
                const userLocation = variables[userId].location;
                const passageName = Object.keys(variables)
                    .find(key => {
                    const passage = variables[key];
                    return (passage.type === 'passage') &&
                        passage.between.includes(userLocation) &&
                        passage.between.includes(destination);
                });
                if (!passageName) {
                    print(gameDefinition, 'how-to-get-there', userLocation, destination);
                    return;
                }
                return passThroughPassage(gameDefinition, passageName, userId);
            }
            print(gameDefinition, 'destination-unknown', destination);
        }
    },
    {
        input: climbCommands,
        execute: (input, gameDefinition, userId) => {
            var _a;
            const reference = (_a = input.match(climbCommands)) === null || _a === void 0 ? void 0 : _a.pop();
            if (!reference) {
                return false;
            }
            let passageName = findByReference(gameDefinition, userId, reference);
            if (!passageName) {
                const { variables } = gameDefinition;
                // sentence might have been 'climb up' without reference. we'll try to guess.
                if (['stairs', 'ladder'].includes(reference)) {
                    // sentence was very explicit about something that is not in this room
                    print(gameDefinition, 'no item in here', reference);
                    return true;
                }
                const userLocation = variables[userId].location;
                passageName = Object.keys(variables).find(key => {
                    var _a, _b;
                    const passage = variables[key];
                    return passage.type === 'passage' && passage.between.includes(userLocation) &&
                        (((_a = passage.synonyms) === null || _a === void 0 ? void 0 : _a.includes('stairs')) || ((_b = passage.synonyms) === null || _b === void 0 ? void 0 : _b.includes('ladder')));
                });
                if (!passageName) {
                    return false;
                }
            }
            return passThroughPassage(gameDefinition, passageName, userId);
        }
    }
];
function findItem(gameDefinition, userId, reference) {
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
function passThroughPassage(gameDefinition, destination, userId) {
    const { variables } = gameDefinition;
    const passage = variables[destination];
    const userLocation = variables[userId].location;
    switch (passage.state) {
        case 'closed':
            print(gameDefinition, 'the item is closed', destination);
            break;
        case 'locked':
            print(gameDefinition, 'the item is locked', destination);
            break;
        case 'hidden':
            print(gameDefinition, 'the item is hidden', destination);
            break;
        case undefined:
        case 'opened':
            const user = variables[userId];
            const location = passage.between.find(x => x !== userLocation) || userLocation;
            variables[userId] = Object.assign(Object.assign({}, user), { location });
            addAchievement(gameDefinition, userId, `entered ${location}`);
            print(gameDefinition, 'you entered the item', location);
            break;
    }
    return true;
}
function openPassage(gameDefinition, passageName, userId) {
    var _a;
    const { variables } = gameDefinition;
    const passage = variables[passageName];
    if (!((_a = passage.allowedStates) === null || _a === void 0 ? void 0 : _a.includes('opened'))) {
        print(gameDefinition, 'the item is not openable', passageName);
        return;
    }
    switch (passage.state) {
        case undefined:
        case 'opened':
            print(gameDefinition, 'the item is already open', passageName);
            return;
        case 'locked':
            print(gameDefinition, 'the item is locked', passageName);
            return;
        case 'hidden':
            print(gameDefinition, 'the item is hidden', passageName);
            return;
        case 'closed':
            variables[passageName] = Object.assign(Object.assign({}, passage), { state: 'opened' });
            addAchievement(gameDefinition, userId, `opened ${passageName}`);
            print(gameDefinition, 'the item is opened', passageName);
            return;
    }
}
function closePassage(gameDefinition, passageName, userId) {
    var _a;
    const { variables } = gameDefinition;
    const passage = variables[passageName];
    if (!((_a = passage.allowedStates) === null || _a === void 0 ? void 0 : _a.includes('closed'))) {
        print(gameDefinition, 'the item is not closable', passageName);
        return;
    }
    switch (passage.state) {
        case undefined:
        case 'closed':
            print(gameDefinition, 'the item is already closed', passageName);
            return;
        case 'locked':
            print(gameDefinition, 'the item is locked', passageName);
            return;
        case 'hidden':
            print(gameDefinition, 'the item is hidden', passageName);
            return;
        case 'opened':
            variables[passageName] = Object.assign(Object.assign({}, passage), { state: 'closed' });
            addAchievement(gameDefinition, userId, `closed ${passageName}`);
            print(gameDefinition, 'the item is closed', passageName);
            return;
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
};
export { actions, strings };
