import { GameDefinition, NumberVariable, Variable, VariableModifyUpdate } from '../../types.js';
import print from "../../default/print.js";

import { handlers as pantryHandlers } from './rooms/pantry.js';
import { listErrors } from '../../default/error-logging.js';

function finishGame(gameDefinition: GameDefinition) {
    const { stopTimer } = gameDefinition;
    gameDefinition.variables.lives = {...gameDefinition.variables.lives, value: 0 } as NumberVariable;
    listErrors(gameDefinition);
    stopTimer('countdown');
}

const handlers:VariableModifyUpdate[] = [
    ...pantryHandlers,
    (gameDefinition: GameDefinition, variableName:string, variable:Variable) => {
        if (variableName==='countdown' && (variable as NumberVariable).value <= 0) {
            print(gameDefinition, 'time\'s up');
            finishGame(gameDefinition);
        }
    },
    (gameDefinition: GameDefinition, _:string, variable:Variable) => {
        if (variable.type==='player' && variable.location === 'outside') {
            finishGame(gameDefinition);
        }
    }
];

export default handlers;