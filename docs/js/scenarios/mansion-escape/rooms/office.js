import addToInventory from '../../../default/add-to-inventory.js';
import isValidAction from '../../../default/is-valid-action.js';
import addAchievement from '../../../default/add-achievement.js';
import print from "../../../default/print.js";
const items = {
    'office': { type: 'room' },
    'blue door': {
        type: 'passage',
        between: ['hallway', 'office'],
        allowedStates: ['closed', 'opened'],
        state: 'closed',
        synonyms: ['door']
    },
    portrait: {
        type: 'item',
        state: {
            'placement': 'wall', // wall/floor
            'identity': 'unknown', // unknown/cartwright
        },
        location: 'office',
        synonyms: ['portrait', 'picture', 'painting', 'paintings']
    },
    'trash bin': {
        type: 'item',
        location: 'office',
        canBeHeld: true,
        canContain: 10,
        synonyms: ['bin', 'trash', 'paper bin']
    },
    'crumpled newspaper': {
        type: 'item',
        location: 'trash bin',
        canBeHeld: true,
        synonyms: [
            'newspaper',
            'wrinkled newspaper',
            'folded newspaper',
            'crumpled paper'
        ]
    },
    'broken vase pieces': {
        type: 'item',
        location: 'office',
        canBeHeld: true,
        synonyms: [
            'pieces of vase', 'pieces', 'vase', 'vase pieces', 'broken vase', 'shattered vase'
        ]
    },
    safe: {
        type: 'item',
        location: 'office',
        state: 'locked',
        canContain: 'ledger',
        synonyms: ['vault']
    },
    ledger: {
        type: 'item',
        location: 'safe',
        canBeHeld: true,
    },
    journal: {
        type: 'item',
        location: 'office',
        synonyms: ['diary', 'calendar', 'leather journal']
    }
};
const actions = [
    {
        input: /^(pick up|grab|take|collect|retrieve|get|fetch)\s(the\s)?(crumpled\s|old\s|dirty\s|wrinkled\s|)\s?(newspaper|paper|magazine|flyer)$/,
        conditions(gameDefinition, userId) {
            const userLocation = gameDefinition.variables[userId].location;
            return [{ item: 'crumpled newspaper', property: 'location', value: userLocation, textId: 'location-fail:item' }];
        },
        execute(_, gameDefinition, userId) {
            addToInventory(gameDefinition, userId, 'crumpled newspaper');
            addAchievement(gameDefinition, userId, 'picked up newspaper');
            return true;
        }
    },
    {
        input: /\b(?:read|examine|inspect|check|look\s*at|scan|study|peruse|glance\s*at)\s*(?:the\s*)?(?:crumpled|old|wrinkled|torn|folded|discarded|rumpled)?\s*(?:newspaper|paper|news\s*sheet)\b/,
        execute(_, gameDefinition, userId) {
            const { variables } = gameDefinition;
            const userLocation = variables[userId].location;
            if (!isValidAction(gameDefinition, [{ item: 'crumpled newspaper', property: 'location', value: userLocation, textId: 'location-fail:item' }])) {
                return true;
            }
            addAchievement(gameDefinition, userId, 'read newspaper');
            print(gameDefinition, 'read newspaper');
            return true;
        }
    },
    {
        input: /\b(?:read|examine|inspect|check|look\s*at|browse|scan|study|peruse|glance\s*at)\s*(?:the\s*)?(?:diary|journal|notebook|log|memoir)\b/,
        execute(_, gameDefinition, userId) {
            const { variables } = gameDefinition;
            const userLocation = variables[userId].location;
            if (!isValidAction(gameDefinition, [{ item: 'journal', property: 'location', value: userLocation, textId: 'location-fail:item' }])) {
                return true;
            }
            addAchievement(gameDefinition, userId, 'read journal');
            print(gameDefinition, 'read journal');
            return true;
        }
    },
    {
        input: /\b(remove|take)\s(the\s)?(portrait|picture|painting)\s(off|from)(\s(the\s)?wall)?\b/,
        conditions: (_, userId) => [
            { item: userId, property: 'location', value: 'office', textId: 'location-fail:user' },
            { item: 'portrait', property: 'placement', value: 'wall', textId: 'portrait already on floor' },
        ],
        execute(_, gameDefinition, userId) {
            const { variables } = gameDefinition;
            const portrait = variables.portrait;
            variables.portrait = Object.assign(Object.assign({}, portrait), { state: Object.assign(Object.assign({}, portrait.state), { placement: 'floor' }) });
            addAchievement(gameDefinition, userId, 'find secret safe');
            print(gameDefinition, 'removed portrait from wall');
            return true;
        }
    },
    {
        input: /\b(put|place|hang)\s(the\s)?(portrait|picture|painting)\s(back\s)?((on|onto)\s)?((the\s)?wall)?\b/,
        execute(_, gameDefinition, userId) {
            const { variables } = gameDefinition;
            const portrait = variables.portrait;
            if (!isValidAction(gameDefinition, [
                { item: userId, property: 'location', value: 'office', textId: 'location-fail:user' },
                { item: 'portrait', property: 'placement', value: 'floor', textId: 'portrait already on wall' },
            ])) {
                return true;
            }
            variables.portrait = Object.assign(Object.assign({}, portrait), { state: Object.assign(Object.assign({}, portrait.state), { placement: 'wall' }) });
            addAchievement(gameDefinition, userId, 'hid safe');
            print(gameDefinition, 'put portrait back on wall');
            return true;
        }
    },
    {
        input: /\b(?:steal|take|grab|snatch|retrieve|get|remove|extract|pick\s*up)\s*(?:the\s*)?(?:ledger|record|book|document|log)\s*(?:from\s*(?:the\s*)?(?:safe|vault|lockbox|strongbox|security\s*box))\b/,
        conditions(_, userId) {
            return [
                { item: userId, property: 'location', value: 'office', textId: 'location-fail:user' },
                { item: 'portrait', property: 'placement', value: 'wall', textId: 'the portrait is blocking the safe' },
                { item: 'safe', property: 'state', value: 'opened', textId: 'the item is not opened' },
                { item: 'ledger', property: 'location', value: 'safe', textId: 'the ledger is not in the safe' },
            ];
        },
        execute(_, gameDefinition, userId) {
            const { variables } = gameDefinition;
            addToInventory(gameDefinition, userId, 'ledger');
            addAchievement(gameDefinition, userId, 'stole ledger');
            print(gameDefinition, 'stole ledger');
            return true;
        }
    },
    {
        input: /\b(?:glue|fix|repair|mend|stick|reassemble|piece\s*together)\s*(?:the\s*)?(?:broken|shattered|cracked|damaged)?\s*(?:vase|pot|ceramic|container)\s*(?:pieces\s*)?(?:back|together|in\s*place)\b/,
        execute(input, gameDefinition, userId) {
            //6 - glue vase back (find glue?)
            const { variables } = gameDefinition;
            print(gameDefinition, 'not yet implemented');
            return false;
        }
    },
    {
        input: /\b(?:put|place|apply|smudge|leave|transfer)\s*(?:Lena's\s*)?(?:fingerprints|prints|finger\s*marks)\s*(?:on\s*(?:the\s*)?(?:safe|vault|lockbox|strongbox|security\s*box))\b/,
        execute(input, gameDefinition, userId) {
            //7 - put fingerprints on safe
            const { variables } = gameDefinition;
            print(gameDefinition, 'not-yet-implemented');
            return false;
        }
    },
    {
        input: /\b(?:use|type)\s+(?:code\s+)?30(?:[.\s/-]?02)(?:[.\s/-]?19)(?:[.\s/-]?85)\s+(?:in\s+keypad\s+)?to\s+(?:unlock|open)\s+(?:safe|vault)\b/,
        conditions(_, userId) {
            return [
                { item: userId, property: 'location', value: 'office', textId: 'location-fail:user' },
                { item: 'portrait', property: 'placement', value: 'floor', textId: 'the portrait is blocking the safe' },
                { item: 'safe', property: 'state', value: 'locked', textId: 'the safe is not closed' },
            ];
        },
        execute(_, gameDefinition, userId) {
            const { variables } = gameDefinition;
            variables.safe = Object.assign(Object.assign({}, variables.safe), { state: 'unlocked' });
            print(gameDefinition, 'safe unlocked');
            addAchievement(gameDefinition, userId, 'unlocked safe');
            return false;
        }
    },
    {
        input: /^(?:use\s+(?:code\s+)?(?:\d{1,2}(?:[.\s/-]?\d{1,2}){3}|code\s+in\s+keypad)|(?:unlock|open))\s+(?:safe|vault)$/,
        conditions(_, userId) {
            return [
                { item: userId, property: 'location', value: 'office', textId: 'location-fail:user' },
                { item: 'portrait', property: 'placement', value: 'floor', textId: 'the portrait is blocking the safe' },
                { item: 'safe', property: 'state', value: 'locked', textId: 'the safe is not closed' },
            ];
        },
        execute(_, gameDefinition, userId) {
            print(gameDefinition, 'cant unlock safe');
            return false;
        },
    },
    {
        input: /\b(?:pick\s+up|steal|take|grab|snatch|retrieve|get)\s+ledger(?:\s+from\s+(?:the\s+)?(?:safe|vault))?\b/,
        conditions: (_, userId) => [
            { item: userId, property: 'location', value: 'office', textId: 'location-fail:user' },
            { item: 'portrait', property: 'placement', value: 'floor', textId: 'the portrait is blocking the safe' },
            { item: 'safe', property: 'state', value: 'unlocked', textId: 'the safe is locked' },
            { item: 'ledger', property: 'location', value: 'safe', textId: 'location-fail:item' },
        ],
        execute(_, gameDefinition, userId) {
            addToInventory(gameDefinition, userId, 'ledger');
            addAchievement(gameDefinition, userId, 'obtained ledger');
            print(gameDefinition, 'you pick up the ledger');
            return false;
        }
    },
    {
        input: /\b(?:lock|secure|close|shut)\s+(?:the\s+)?(?:safe|vault)\b/,
        conditions(_, userId) {
            return [
                { item: userId, property: 'location', value: 'office', textId: 'location-fail:user' },
                { item: 'portrait', property: 'placement', value: 'floor', textId: 'the portrait is blocking the safe' },
                { item: 'safe', property: 'state', value: 'unlocked', textId: 'safe already locked' },
            ];
        },
        execute(_, gameDefinition, userId) {
            const { variables } = gameDefinition;
            variables.safe = Object.assign(Object.assign({}, variables.safe), { state: 'locked' });
            print(gameDefinition, 'safe locked');
            addAchievement(gameDefinition, userId, 'locked safe');
            return false;
        }
    },
    {
        input: /\b(?:use|apply|place|put|attach|set|stick|utilize)\s+(?:the\s+)?fingerprints\s+on\s+(?:the\s+)?(?:safe|vault)\b/,
        conditions(_, userId) {
            return [
                { item: userId, property: 'location', value: 'office', textId: 'location-fail:user' },
                { item: 'portrait', property: 'placement', value: 'floor', textId: 'the portrait is blocking the safe' },
                { item: 'forensic kit', property: 'state', value: 'with fingerprints', textId: 'no fingerprints in forensic kit' },
            ];
        },
        execute(_, gameDefinition, userId) {
            const { variables } = gameDefinition;
            variables.safe = Object.assign(Object.assign({}, variables.safe), { state: 'unlocked' });
            variables['forensic kit'] = Object.assign(Object.assign({}, variables['forensic kit']), { state: 'no fingerprints' });
            print(gameDefinition, 'planted fingerprints');
            addAchievement(gameDefinition, userId, 'planted fingerprints');
            return false;
        }
    }
];
const strings = {
    office(variables) {
        const portrait = variables.portrait;
        const portraitIdentity = portrait.state.identity === 'cartwright' ? 'of John Cartwright ' : 'of someone ';
        const portraitPlacement = portrait.state.placement === 'wall' ? 'behind the desk hanging on the wall' : 'on the floor behind the desk';
        const newspaper = variables['crumpled newspaper'].location === 'office' ? ', inside of which is a crumpled newspaper' : '';
        const trashBin = variables['trash bin'].location === 'office' ? `To the side of the desk is a small bin${newspaper}.` : '';
        return `The room looks like a home-office.
    It has a sturdy oak desk at its center, papers neatly stacked on one side, and a leather journal lying open.
    There's large portrait ${portraitIdentity}${portraitPlacement}. There's a closed blue door on the opposite wall. ${trashBin}
    A spiral staircase leads down to what looks like a library.
    On the floor, near the window, a broken vase lies in pieces.`;
    },
    'blue door': 'A solid mahogany door with a brass handle, engraved with faint scholarly symbols.',
    portrait(variables) {
        const { identity, placement } = variables.portrait.state;
        if (placement === 'wall') {
            if (identity === 'unknown') {
                return `It's quite a big painting. The name of the person is on the tip of your tongue.`;
            }
            else if (identity === 'cartwright') {
                return `It's a big painting of John Cartwright, the mansion's owner.`;
            }
        }
        else if (identity === 'unknown') {
            return `It's quite a big painting, placed neatly beside the safe it used to hide`;
        }
        return `It's a big painting of John Cartwright, the mansion's owner. It's placed neatly next to the safe it used to hide.`;
    },
    'removed portrait from wall': `You removed the portrait from the wall. There's a safe hidden behind the portrait!`,
    'put portrait back on wall': `You put the portrait back on the wall. The safe is hidden again.`,
    'stole ledger': 'You got the ledger!',
    'read newspaper': `You skim through the newspaper.
    The main headline says that John Cartwright, a police inspector that was charged with corruption allegation was found not guilty due to lack of evidence.
    The photo matches the portrait on the wall. You are in Cartwright's mansion!
    The rest of the newspaper is rather boring. Could it be that you're here to find incriminating evidence?`,
    'read journal': `Well, according to this, the owner of the diary should be back in less than an hour. At least now you know what's the countdown on your watch!`,
    'the safe is not closed': 'The safe is not closed',
    'the portrait is blocking the safe': 'The portrait is blocking the safe',
    'cant unlock safe': `The safe requires a particular key combination to be unlocked.`,
    'the safe is locked': 'The safe is locked',
    'safe unlocked'(variables) {
        const safeContent = variables.ledger.location === 'safe' ? `There's a ledge inside` : `It's empty`;
        return `The safe is unlocked. ${safeContent}.`;
    },
    'safe locked': 'You carefully locked the safe.',
    'safe already locked': 'The safe is already locked',
    'you pick up the ledger': 'You pick up the ledger. You got the incriminating evidence you came for.',
    'no fingerprints in forensic kit': 'There are no fingerprints in the forensic kit',
    'planted fingerprints': 'You carefully planted the fingerprints on the safe.',
};
export { actions, items, strings, };
