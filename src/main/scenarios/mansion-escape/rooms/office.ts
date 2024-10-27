import { Action, Attributes, GameDefinition, ItemVariable, PlayerVariable, Variables } from '../../../types';
import addToInventory from '../../../default/add-to-inventory.js';
import isValidAction from '../../../default/is-valid-action.js';
import variables from '../variables';

const items:{[key:string]:ItemVariable} = {
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
    },
    ledger: {
        type: 'item',
        location: 'vault',
        canBeHeld: true,
    },
    journal: {
        type: 'item',
        location: 'office',
        synonyms: ['diary', 'calendar', 'leather journal']
    }
};

const actions:Action[] = [
    {
        input: /^(pick up|grab|take|collect|retrieve|get|fetch)\s(the\s)?(crumpled\s|old\s|dirty\s|wrinkled\s|)\s?(newspaper|paper|magazine|flyer)$/,
        execute: (_:string, gameDefinition:GameDefinition, userId:string) => {
            const { addAchievement } = gameDefinition;

            addToInventory(gameDefinition, userId, 'crumpled newspaper');
            addAchievement(userId, 'picked up newspaper');
            return true;
        }
    },
    {
        input: /\b(?:read|examine|inspect|check|look\s*at|scan|study|peruse|glance\s*at)\s*(?:the\s*)?(?:crumpled|old|wrinkled|torn|folded|discarded|rumpled)?\s*(?:newspaper|paper|news\s*sheet)\b/,
        execute: (_:string, gameDefinition:GameDefinition, userId:string) => {
            const { variables, print, addAchievement } = gameDefinition;

            const userLocation = (variables[userId] as PlayerVariable).location;
            if (!isValidAction(gameDefinition, [{item: 'crumpled newspaper', property: 'location', value: userLocation, textId:'location-fail:item'}])) {
                return true;
            }
            
            addAchievement(userId, 'read newspaper');           
            print('read newspaper');

            return true;
        }
    },
    {
        input: /\b(?:read|examine|inspect|check|look\s*at|browse|scan|study|peruse|glance\s*at)\s*(?:the\s*)?(?:diary|journal|notebook|log|memoir)\b/,
        execute: (_:string, gameDefinition:GameDefinition, userId:string) => {
            const { variables, print, addAchievement } = gameDefinition;

            const userLocation = (variables[userId] as PlayerVariable).location;
            if (!isValidAction(gameDefinition, [{item: 'journal', property: 'location', value: userLocation, textId:'location-fail:item'}])) {
                return true;
            }

            addAchievement(userId, 'read journal');           
            print('read journal');

            return true;
        }
    },
    {
        input: /\b(remove|take)\s(the\s)?(portrait|picture|painting)\s(off|from)(\s(the\s)?wall)?\b/,
        execute: (_:string, gameDefinition:GameDefinition, userId:string) => {
            const { variables, print, addAchievement } = gameDefinition;
            const portrait = variables.portrait as ItemVariable;
            
            if (!isValidAction(gameDefinition, [
                {item: userId, property: 'location', value: 'office', textId:'location-fail:user'},
                {item: 'portrait', property: 'placement', value: 'wall', textId:'portrait already on floor'},
            ])) {                
                return true;
            }
           

            variables.portrait = { ...portrait, state: { ...portrait.state as Attributes, placement: 'floor' } };
            addAchievement(userId, 'find secret safe');
            print('removed portrait from wall');

            return true;
        }
    },
    {
        input: /\b(put|place|hang)\s(the\s)?(portrait|picture|painting)\s(back\s)?((on|onto)\s)?((the\s)?wall)?\b/,
        execute: (_:string, gameDefinition:GameDefinition, userId:string) => {           
            const { variables, print, addAchievement } = gameDefinition;
            const portrait = variables.portrait as ItemVariable;
            
            if (!isValidAction(gameDefinition, [
                {item: userId, property: 'location', value: 'office', textId:'location-fail:user'},
                {item: 'portrait', property: 'placement', value: 'floor' as string, textId:'portrait already on wall'},
            ])) {                
                return true;
            }

            variables.portrait = { ...portrait, state: { ...portrait.state as Attributes, placement: 'wall' } };
            addAchievement(userId, 'hid safe');
            print('put portrait back on wall');
            
            return true;
        }
    },
    {
        input: /\b(?:steal|take|grab|snatch|retrieve|get|remove|extract|pick\s*up)\s*(?:the\s*)?(?:ledger|record|book|document|log)\s*(?:from\s*(?:the\s*)?(?:safe|vault|lockbox|strongbox|security\s*box))\b/,
        execute: (_:string, gameDefinition:GameDefinition, userId:string) => {
            const { variables, addAchievement, print } = gameDefinition;
            const portrait = variables.portrait as ItemVariable;

            if (!isValidAction(gameDefinition, [
                {item: userId, property: 'location', value: 'office', textId:'location-fail:user'},
                {item: 'portrait', property: 'placement', value: 'wall' as string, textId:'the portrait is blocking the safe'},
                {item: 'safe', property: 'state', value: 'opened', textId:'the item is not opened'},
                {item: 'ledger', property: 'location', value: 'safe', textId:'the ledger is not in the safe'},
            ])) {                
                return true;
            }

            addToInventory(gameDefinition, userId, 'ledger');
            addAchievement(userId, 'stole ledger');
            print('stole ledger')
            
            return true;
        }
    },
    {
        input: /\b(?:glue|fix|repair|mend|stick|reassemble|piece\s*together)\s*(?:the\s*)?(?:broken|shattered|cracked|damaged)?\s*(?:vase|pot|ceramic|container)\s*(?:pieces\s*)?(?:back|together|in\s*place)\b/,
        execute: (input:string, gameDefinition:GameDefinition, userId:string) => {
            //6 - glue vase back (find glue?)
            const { print } = gameDefinition;
            print('not yet implemented');
            return false;
        }
    },
    {
        input: /\b(?:put|place|apply|smudge|leave|transfer)\s*(?:Lena's\s*)?(?:fingerprints|prints|finger\s*marks)\s*(?:on\s*(?:the\s*)?(?:safe|vault|lockbox|strongbox|security\s*box))\b/,
        execute: (input:string, gameDefinition:GameDefinition, userId:string) => {
            //7 - put fingerprints on safe
            const { print } = gameDefinition;
            print('not-yet-implemented');
            return false;
        }
    }
];

const strings = {
    office: (variables:Variables) => {
        const portrait = variables.portrait as ItemVariable;
        const portraitIdentity = (portrait.state as Attributes).identity==='cartwright' ? 'of John Cartwright ' : 'of someone '
        const portraitPlacement = (portrait.state as Attributes).placement ==='wall' ? 'behind the desk hanging on the wall': 'on the floor behind the desk';
        const newspaper = (variables['crumpled newspaper'] as ItemVariable).location === 'office' ? ', inside of which is a crumpled newspaper' : '';
        const trashBin = (variables['trash bin'] as ItemVariable).location === 'office' ? `To the side of the desk is a small bin${newspaper}.` : '';
        return `The room looks like a home-office.
    It has a sturdy oak desk at its center, papers neatly stacked on one side, and a leather journal lying open.
    There's large portrait ${portraitIdentity}${portraitPlacement}. There's a closed blue door on the opposite wall. ${trashBin}
    A spiral staircase leads down to what looks like a library.
    On the floor, near the window, a broken vase lies in pieces.`
    },
    'portrait:{"placement":"wall","identity":"unknown"}': `It's quite a big painting. The name of the person is on the tip of your tongue.`,
    'portrait:{"placement":"wall","identity":"cartwright"}': `It's a big painting of John Cartwright, the mansion's owner.`,
    'portrait:{"placement":"floor","identity":"unknown"}': `It's quite a big painting, placed neatly beside the safe it used to hide`,
    'portrait:{"placement":"floor","identity":"cartwright"}': `It's a big painting of John Cartwright, the mansion's owner. It's placed neatly next to the safe it used to hide.`,
    'removed portrait from wall': `You removed the portrait from the wall. There's a safe hidden behind the portrait!`, 
    'put portrait back on wall': `You put the portrait back on the wall. The safe is hidden again.`,
    'stole ledger': 'You got the ledger!',
    'read newspaper': `You skim through the newspaper.
    The main headline says that John Cartwright, a police inspector that was charged with corruption allegation was found not guilty due to lack of evidence.
    The photo matches the portrait on the wall. You are in Cartwright's mansion!
    The rest of the newspaper is rather boring. Could it be that you're here to find incriminating evidence?`,
    'read journal': `Well, according to this, the owner of the diary should be back in less than an hour. At least now you know what's the countdown on your watch!`,
};

export {
    actions,
    items,
    strings,
};