import { GameDefinition, NumberVariable } from '../../types.js';

export default function initTimers (gameDefinition: GameDefinition) {
    const { variables, handlers, print } = gameDefinition;
    
    handlers.push((variableName, variable) => {
        if (variableName === 'countdown' && (variable as NumberVariable).value === 0) {
            print('time\'s up');
            variables.lives = { type: 'number', value: 0 };
        }
    })
    gameDefinition.startTimer('countdown');
}