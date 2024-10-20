import { Action, GameDefinition, ItemVariable, PlayerVariable } from '../../../types';
import addToInventory from '../../../generic-actions/add-to-inventory.js';
import isValidAction from '../../../generic-actions/is-valid-action.js';

const officeActions:Action[] = [
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
                {item: 'portrait', property: 'state', value: portrait.state?.replace(/wall/g, 'wall') as string, textId:'portrait already on floor'},
            ])) {                
                return true;
            }
           

            variables.portrait = { ...portrait, state: portrait.state?.replace(/floor/g, 'wall') };
            addAchievement(userId, 'find secret safe');
            print('removed portrait from wall');

            return true;
        }
    },
    {
        input: /\b(put|place|hang)\s(the\s)?(portrait|picture|painting)\s(back\s)?(on|onto)\s((the\s)?wall)?\b/,
        execute: (_:string, gameDefinition:GameDefinition, userId:string) => {           
            const { variables, print, addAchievement } = gameDefinition;
            const portrait = variables.portrait as ItemVariable;
            
            if (!isValidAction(gameDefinition, [
                {item: userId, property: 'location', value: 'office', textId:'location-fail:user'},
                {item: 'portrait', property: 'state', value: portrait.state?.replace(/wall/g, 'floor') as string, textId:'portrait already on floor'},
            ])) {                
                return true;
            }

            variables.portrait = { ...portrait, state: portrait.state?.replace(/wall/g, 'floor') };
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
                {item: 'portrait', property: 'state', value: portrait.state?.replace(/floor/g, 'wall') as string, textId:'the portrait is blocking the safe'},
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

export default officeActions;