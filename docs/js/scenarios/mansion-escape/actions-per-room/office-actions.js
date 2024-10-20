import addToInventory from '../../../generic-actions/add-to-inventory.js';
import isValidAction from '../../../generic-actions/is-valid-action.js';
const officeActions = [
    {
        input: /^(pick up|grab|take|collect|retrieve|get|fetch)\s(the\s)?(crumpled\s|old\s|dirty\s|wrinkled\s|)\s?(newspaper|paper|magazine|flyer)$/,
        execute: (_, gameDefinition, userId) => {
            const { addAchievement } = gameDefinition;
            addToInventory(gameDefinition, userId, 'crumpled newspaper');
            addAchievement(userId, 'picked up newspaper');
            return true;
        }
    },
    {
        input: /\b(?:read|examine|inspect|check|look\s*at|scan|study|peruse|glance\s*at)\s*(?:the\s*)?(?:crumpled|old|wrinkled|torn|folded|discarded|rumpled)?\s*(?:newspaper|paper|news\s*sheet)\b/,
        execute: (_, gameDefinition, userId) => {
            const { variables, print, addAchievement } = gameDefinition;
            const userLocation = variables[userId].location;
            if (!isValidAction(gameDefinition, [{ item: 'crumpled newspaper', property: 'location', value: userLocation, textId: 'location-fail:item' }])) {
                return true;
            }
            addAchievement(userId, 'read newspaper');
            print('read newspaper');
            return true;
        }
    },
    {
        input: /\b(?:read|examine|inspect|check|look\s*at|browse|scan|study|peruse|glance\s*at)\s*(?:the\s*)?(?:diary|journal|notebook|log|memoir)\b/,
        execute: (_, gameDefinition, userId) => {
            const { variables, print, addAchievement } = gameDefinition;
            const userLocation = variables[userId].location;
            if (!isValidAction(gameDefinition, [{ item: 'journal', property: 'location', value: userLocation, textId: 'location-fail:item' }])) {
                return true;
            }
            addAchievement(userId, 'read journal');
            print('read journal');
            return true;
        }
    },
    {
        input: /\b(remove|take)\s(the\s)?(portrait|picture|painting)\s(off|from)(\s(the\s)?wall)?\b/,
        execute: (_, gameDefinition, userId) => {
            var _a, _b;
            const { variables, print, addAchievement } = gameDefinition;
            const portrait = variables.portrait;
            if (!isValidAction(gameDefinition, [
                { item: userId, property: 'location', value: 'office', textId: 'location-fail:user' },
                { item: 'portrait', property: 'state', value: (_a = portrait.state) === null || _a === void 0 ? void 0 : _a.replace(/wall/g, 'wall'), textId: 'portrait already on floor' },
            ])) {
                return true;
            }
            variables.portrait = Object.assign(Object.assign({}, portrait), { state: (_b = portrait.state) === null || _b === void 0 ? void 0 : _b.replace(/floor/g, 'wall') });
            addAchievement(userId, 'find secret safe');
            print('removed portrait from wall');
            return true;
        }
    },
    {
        input: /\b(put|place|hang)\s(the\s)?(portrait|picture|painting)\s(back\s)?(on|onto)\s((the\s)?wall)?\b/,
        execute: (_, gameDefinition, userId) => {
            var _a, _b;
            const { variables, print, addAchievement } = gameDefinition;
            const portrait = variables.portrait;
            if (!isValidAction(gameDefinition, [
                { item: userId, property: 'location', value: 'office', textId: 'location-fail:user' },
                { item: 'portrait', property: 'state', value: (_a = portrait.state) === null || _a === void 0 ? void 0 : _a.replace(/wall/g, 'floor'), textId: 'portrait already on floor' },
            ])) {
                return true;
            }
            variables.portrait = Object.assign(Object.assign({}, portrait), { state: (_b = portrait.state) === null || _b === void 0 ? void 0 : _b.replace(/wall/g, 'floor') });
            addAchievement(userId, 'hid safe');
            print('put portrait back on wall');
            return true;
        }
    },
    {
        input: /\b(?:steal|take|grab|snatch|retrieve|get|remove|extract|pick\s*up)\s*(?:the\s*)?(?:ledger|record|book|document|log)\s*(?:from\s*(?:the\s*)?(?:safe|vault|lockbox|strongbox|security\s*box))\b/,
        execute: (_, gameDefinition, userId) => {
            var _a;
            const { variables, addAchievement, print } = gameDefinition;
            const portrait = variables.portrait;
            if (!isValidAction(gameDefinition, [
                { item: userId, property: 'location', value: 'office', textId: 'location-fail:user' },
                { item: 'portrait', property: 'state', value: (_a = portrait.state) === null || _a === void 0 ? void 0 : _a.replace(/floor/g, 'wall'), textId: 'the portrait is blocking the safe' },
                { item: 'safe', property: 'state', value: 'opened', textId: 'the item is not opened' },
                { item: 'ledger', property: 'location', value: 'safe', textId: 'the ledger is not in the safe' },
            ])) {
                return true;
            }
            addToInventory(gameDefinition, userId, 'ledger');
            addAchievement(userId, 'stole ledger');
            print('stole ledger');
            return true;
        }
    },
    {
        input: /\b(?:glue|fix|repair|mend|stick|reassemble|piece\s*together)\s*(?:the\s*)?(?:broken|shattered|cracked|damaged)?\s*(?:vase|pot|ceramic|container)\s*(?:pieces\s*)?(?:back|together|in\s*place)\b/,
        execute: (input, gameDefinition, userId) => {
            //6 - glue vase back (find glue?)
            const { print } = gameDefinition;
            print('not yet implemented');
            return false;
        }
    },
    {
        input: /\b(?:put|place|apply|smudge|leave|transfer)\s*(?:Lena's\s*)?(?:fingerprints|prints|finger\s*marks)\s*(?:on\s*(?:the\s*)?(?:safe|vault|lockbox|strongbox|security\s*box))\b/,
        execute: (input, gameDefinition, userId) => {
            //7 - put fingerprints on safe
            const { print } = gameDefinition;
            print('not-yet-implemented');
            return false;
        }
    }
];
export default officeActions;
