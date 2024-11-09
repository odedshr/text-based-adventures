import { strings as pickUpItemStrings } from './pick-up.js';

export default {
    exposition: `You wake up lying on the carpeted floor with a massive headache.
    You can't remember anything, not even your name.
    You can't remember how you got here, let alone where is here.
    Your watch shows a countdown with less than an hour to go, but you can't tell what it signifies.`,
    myself: 'You are standing here, ready for action.',
    'unknown-item': `I don't know what that is.`,
    'difficult question': `I'm afraid I don't know how to answer to that.`,
    'what input means': `I don't understand what 'item' means.`,
    profanity: `It's understandable to get frustrated, but getting upset won't help.
            Take a deep breath, and maybe try exploring your surroundings or interacting with items.`,
    help: `No point in crying for help. You're own your own. Take a deep breath, and maybe try exploring your surroundings or interacting with items.`,
    'game-instructions': 'This is how you play this game. By typing commands and seeing the results.',
    'time\'s up': `You hear the main entrance door open. You were too late and it's time to face the consequences!\n   ---=== GAME OVER ===---\n\nRefresh the page to play again.`,
    'location-fail:user': 'You are not in the right place to try that',
    'location-fail:item': `It's nowhere near you`,
    'not sure what is item': `I'm not sure what the item is.`,
    'not sure where is item': `I'm not sure where the item is.`,
    'the item is in the location': 'The item is in the location.',
    'you have no items': `You're kind empty handed right now'`,
    'you have items': 'so far you got item',
    'available doors': 'item.',
    window: `It's very dark outside. You can't see a thing. This place is probably very isolated.`,
    'open-window': 'Alas! the window is bolted shut. You can\'t open it.',
    'destination-unknown': `I don't know where the item is.`,
    'the item is already open': 'The item is already open.',
    'the item is locked': 'The item is locked.',
    'the item is closed': 'The item is closed.',
    'the item is hidden': 'is there a item here?',
    'the item is opened': 'The item is now opened.',
    'you entered the item': 'You entered the item.',
    'how-to-get-there': `I don't know where you can get there.`,
    ...pickUpItemStrings
};
      