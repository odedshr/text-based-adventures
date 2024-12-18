import { GameDefinition, NumberVariable, Variable, VariableModifyUpdate } from '../../types.js';
import print from "../../default/print.js";

import { handlers as pantryHandlers } from './rooms/pantry.js';
import addAchievement from '../../default/add-achievement.js';

const handlers:VariableModifyUpdate[] = [
    ...pantryHandlers,
    (gameDefinition: GameDefinition, variableName:string, variable:Variable) => {
        if (variableName==='countdown') {
            const { stopTimer } = gameDefinition;
            if ((variable as NumberVariable).value <= 0 ) {
                print(gameDefinition, 'time\'s up');
                gameDefinition.variables.lives = {...gameDefinition.variables.lives, value: 0 } as NumberVariable;
                stopTimer('countdown');
            }   
        }
    },
    (gameDefinition: GameDefinition, variableName:string, variable:Variable) => {
        if (variable.type==='player' && variable.location === 'outside') {
            addAchievement(gameDefinition, variableName, 'left the mansion');
            print(gameDefinition, 'left mansion');
            gameDefinition.variables.lives = {...gameDefinition.variables.lives, value: 0 } as NumberVariable;
        }
    }
];

export default handlers;