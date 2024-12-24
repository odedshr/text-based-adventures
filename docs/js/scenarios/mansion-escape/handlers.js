import print from "../../default/print.js";
import { handlers as pantryHandlers } from './rooms/pantry.js';
import addAchievement from '../../default/add-achievement.js';
const handlers = [
    ...pantryHandlers,
    (gameDefinition, variableName, variable) => {
        if (variableName === 'countdown') {
            const { stopTimer } = gameDefinition;
            if (variable.value <= 0) {
                print(gameDefinition, 'time\'s up');
                gameDefinition.variables.lives = Object.assign(Object.assign({}, gameDefinition.variables.lives), { value: 0 });
                stopTimer('countdown');
            }
        }
    },
    (gameDefinition, variableName, variable) => {
        if (variable.type === 'player' && variable.location === 'outside') {
            addAchievement(gameDefinition, variableName, 'left the mansion');
            gameDefinition.variables.lives = Object.assign(Object.assign({}, gameDefinition.variables.lives), { value: 0 });
        }
    }
];
export default handlers;
