import { GameDefinition, TimerHandler } from '../../types.js';
import print from "../../default/print.js";

const timerHandlers:{ [key:string]:TimerHandler } = {
    countdown: (gameDefinition: GameDefinition) => {
        print(gameDefinition, 'time\'s up');
        gameDefinition.variables.lives = { type: 'number', value: 0 };
    }
};

export default timerHandlers