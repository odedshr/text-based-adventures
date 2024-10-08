import { addToInventory } from '../../../generic-actions/pick-up';
import { Action, GameDefinition, ItemVariable, Variables } from '../../../types';

const officeActions:Action[] = [
    {
        input: /^(pick up|grab|take|collect|retrieve|get|fetch)\s(the\s)?(crumpled\s|old\s|dirty\s|wrinkled\s|)\s?(newspaper|paper|magazine|flyer)$/,
        execute: (input:string, gameDefinition:GameDefinition, userId:string) => {
            const { variables, addAchievement } = gameDefinition;
            const newspaperRoom = findRoom(variables, 'crumpled newspaper');
            const player = variables[userId] as ItemVariable;
            if (player.location !== newspaperRoom) {
                return `I'm not sure where the is it.`
            }
            addToInventory(variables, userId, 'crumpled newspaper');
            addAchievement(userId, 'picked up newspaper');
            return 'You picked up the newspaper.'
        }
    },
    {
        input: /\b(remove|take)\s(the\s)?(portrait|picture|painting)\s(off|from)(\s(the\s)?wall)?\b/,
        execute: (input:string, gameDefinition:GameDefinition, userId:string) => {
            const { variables, addAchievement } = gameDefinition;

            if ((variables[userId] as ItemVariable).location !== 'office') {
                return `I rather not move things if I don't really need to.`
            }

            const portrait = variables.portrait as ItemVariable;
            if (portrait.state?.includes('wall')) {
                portrait.state = (portrait.state || '').replace('wall','floor');
                addAchievement(userId, 'find secret safe');

                return `You removed the portrait from the wall. There's a safe hidden behind the portrait!`;
            }
            
            return `it's already off the wall`;
        }
    },
    {
        input: /\b(put|place|hang)\s(the\s)?(portrait|picture|painting)\s(back\s)?(on|onto)\s((the\s)?wall)?\b/,
        execute: (input:string, gameDefinition:GameDefinition, userId:string) => {
            const { variables, addAchievement } = gameDefinition;
            
            if ((variables[userId] as ItemVariable).location !== 'office') {
                return `I rather not move things if I don't really need to.`
            }           

            const portrait = variables.portrait as ItemVariable;
            if (portrait.state?.includes('on-the-floor')) {
                portrait.state = (portrait.state || '').replace(/floor/g,'wall');
                
                addAchievement(userId, 'hide safe');
                
                portrait.touched = true;
                return `You put the portrait back on the wall. The safe is hidden again.`;
            }

            return `it's already on the wall`;
        }
    }
    //1 - read newspaper (learn who John Cartwright is)
    //2 - read diary (learn why the deadline in an hour)
    //3 - find safe
    //4 - unlock safe (find code?)
    //5 - steal ledger
    //6 - glue vase back (find glue?)
    //7 - put fingerprints on safe
];

function findRoom(variables:Variables, itemName:string) {
    const item = variables[itemName];
    if (item.type==='room') {
        return itemName;
    }

    return findRoom(variables, (item as ItemVariable).location);
}

export default officeActions;