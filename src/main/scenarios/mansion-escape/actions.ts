import { Action, GameDefinition, ItemVariable, ListVariable, Variables } from '../../types';

const actions:Action[] = [
    {
        verb: /\b(remove|take)\s(the\s)?(portrait|picture|painting)\s(off|from)(\s(the\s)?wall)?\b/,
        execute: (input:string, gameDefinition:GameDefinition, userId:string) => {
            const { variables } = gameDefinition;
            const portrait = variables.portrait as ItemVariable;
            if (portrait.state?.includes('wall')) {
                portrait.state = (portrait.state || '').replace('wall','floor');
                addAchivements(variables, 'find vault');

                return `You removed the portrait from the wall. There's a vault hidden behind the portrait!`;
            }
            
            return `it's already off the wall`;
        }
    },
    {
        verb: /\b(put|place|hang)\s(the\s)?(portrait|picture|painting)\s(back\s)?(on|onto)\s((the\s)?wall)?\b/,
        execute: (input:string, gameDefinition:GameDefinition, userId:string) => {
            const { variables } = gameDefinition;
            const portrait = variables.portrait as ItemVariable;
            if (portrait.state?.includes('on-the-floor')) {
                portrait.state = (portrait.state || '').replace(/floor/g,'wall');
                
                addAchivements(variables, 'hide vault');
                
                portrait.touched = true;
                return `You put the portrait back on the wall. The vault is hidden again.`;
            }

            return `it's already on the wall`;
        }
    }
];

export default actions;