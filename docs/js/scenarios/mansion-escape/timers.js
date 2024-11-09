import print from "../../default/print.js";
const timerHandlers = {
    countdown: (gameDefinition) => {
        print(gameDefinition, 'time\'s up');
        gameDefinition.variables.lives = { type: 'number', value: 0 };
    }
};
export default timerHandlers;
