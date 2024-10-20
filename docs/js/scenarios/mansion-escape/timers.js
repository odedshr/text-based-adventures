export default function initTimers(gameDefinition) {
    const { variables, handlers, print } = gameDefinition;
    handlers.push((variableName, variable) => {
        if (variableName === 'countdown' && variable.value === 0) {
            print('time\'s up');
            variables.lives = { type: 'number', value: 0 };
        }
    });
    gameDefinition.startTimer('countdown');
}
