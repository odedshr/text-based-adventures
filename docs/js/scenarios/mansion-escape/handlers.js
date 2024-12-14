import print from "../../default/print.js";
import { handlers } from './rooms/pantry.js';
export default Object.assign(Object.assign({}, handlers), { countdown: (gameDefinition) => {
        const { variables, stopTimer } = gameDefinition;
        if (variables.countdown.value <= 0) {
            print(gameDefinition, 'time\'s up');
            gameDefinition.variables.lives = { type: 'number', value: 0 };
            stopTimer('countdown');
        }
    } });
