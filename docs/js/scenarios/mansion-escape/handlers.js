import print from "../../default/print.js";
import { handlers as pantryHandlers } from './rooms/pantry.js';
import { listErrors } from '../../default/error-logging.js';
function finishGame(gameDefinition) {
    const { stopTimer } = gameDefinition;
    gameDefinition.variables.lives = Object.assign(Object.assign({}, gameDefinition.variables.lives), { value: 0 });
    listErrors(gameDefinition);
    stopTimer('countdown');
}
const handlers = [
    ...pantryHandlers,
    (gameDefinition, variableName, variable) => {
        if (variableName === 'countdown' && +variable.value <= 0) {
            print(gameDefinition, 'time\'s up');
            finishGame(gameDefinition);
        }
    },
    (gameDefinition, _, variable) => {
        if (variable.type === 'player' && variable.location === 'outside') {
            finishGame(gameDefinition);
        }
    }
];
export default handlers;
