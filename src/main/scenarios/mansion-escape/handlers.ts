import { GameDefinition, NumberVariable } from '../../types.js';
import print from "../../default/print.js";

import { handlers } from './rooms/pantry.js';


export default {
    ...handlers,
    countdown: (gameDefinition: GameDefinition) => {
        const { variables, stopTimer } = gameDefinition;
        if ((variables.countdown as NumberVariable).value <= 0 ) {
            print(gameDefinition, 'time\'s up');
            gameDefinition.variables.lives = { type: 'number', value: 0 };
            stopTimer('countdown');
        }
    },
};