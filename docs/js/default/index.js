import inspectRoomActions from './inspect-room.js';
import { actions as inspectItemActions, strings as inspectItemStrings } from './inspect-item.js';
import { actions as genericQueries } from './generic-queries.js';
import { actions as pickGenericItem, strings as pickUpItemStrings } from './pick-up.js';
import { actions as passageActions, strings as passages } from './passages.js';
import { actions as errorLoggingActions } from './error-logging.js';
const generic = {
    variables: {
        achievements: { type: "data", value: [] },
        errors: { type: "data", value: [] }
    },
    actions: [
        ...pickGenericItem,
        ...inspectRoomActions,
        ...passageActions,
        ...inspectItemActions,
        ...genericQueries,
        ...errorLoggingActions
    ],
    strings: Object.assign(Object.assign(Object.assign({ exposition: `You wake up lying on the carpeted floor with a massive headache.
        You can't remember anything, not even your name.
        You can't remember how you got here, let alone where is here.
        Your watch shows a countdown with less than an hour to go, but you can't tell what it signifies.`, myself: 'You are standing here, ready for action.', 'unknown-item': `I don't know what that is.`, 'difficult question': `I'm afraid I don't know how to answer to that.`, 'what input means': `I don't understand what 'item' means.`, profanity: `It's understandable to get frustrated, but getting upset won't help.
                Take a deep breath, and maybe try exploring your surroundings or interacting with items.`, help: `No point in crying for help. You're own your own. Take a deep breath, and maybe try exploring your surroundings or interacting with items.`, 'game-instructions': 'This is how you play this game. By typing commands and seeing the results.', 'time\'s up': `You hear the main entrance door open. You were too late and it's time to face the consequences!\n   ---=== GAME OVER ===---\n\nRefresh the page to play again.`, 'location-fail:user': 'You are not in the right place to try that', 'location-fail:item': `It's nowhere near you`, 'not sure what is item': `I'm not sure what the item is.`, 'not sure where is item': `I'm not sure where the item is.`, 'the item is in the location': 'The item is in the location.', 'you have no items': `You're kind empty handed right now'`, 'you have items': 'so far you got item', 'available doors': 'item.', window: `There are bars on the windows. It's very dark outside. You can't see a thing. This place is probably very isolated.`, 'open-window': 'Alas! the window is bolted shut. You can\'t open it.', achievements: `You achieved quite a lot but you're not out of the woods yet.`, errors: `You made a few mistakes, but you're still alive. This list is used for debugging purposes.`, countdown: `Time is ticking, better hurry up!`, player1: `That's you! you're still alive, but you better hurry!`, lives: `You got 1 life left, better not waste it.`, 'no mess': `It's probably best to keep the place clean.` }, pickUpItemStrings), inspectItemStrings), passages)
};
export default generic;
