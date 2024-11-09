import timeHandlers from './scenarios/mansion-escape/timers.js';
const timers = {};
const handlers = [];
function handle(variableName, variable) {
    handlers.forEach(handle => handle(variableName, variable));
}
function getProxy(variables) {
    return new Proxy(variables, {
        set: function (target, variableName, variable) {
            target[variableName] = variable;
            handle(variableName, variable);
            return true;
        }
    });
}
function initTimers(gameDefinition) {
    const { variables, handlers } = gameDefinition;
    handlers.push((variableName, variable) => {
        if (variable.type === 'number' && variable.state === 'decreasing' && variable.value === 0) {
            gameDefinition.timeHandlers[variableName](gameDefinition);
        }
    });
    Object.keys(variables).filter(key => variables[key].type === 'number' && variables[key].state === 'decreasing')
        .forEach(variable => gameDefinition.startTimer(variable));
}
function startTimer(variables, name) {
    timers[name] = setInterval(() => {
        const value = variables[name].value - 1;
        variables[name] = { type: "number", value };
        if (value === 0) {
            stopTimer(name);
        }
    }, 1000);
}
function stopTimer(name) {
    clearInterval(timers[name]);
    delete timers[name];
}
function addKey(dict, key, value) {
    if (!dict[key]) {
        dict[key] = [];
    }
    dict[key].push(value);
}
function getReferences(variables) {
    return Object.keys(variables).reduce((dict, key) => {
        addKey(dict, key, key);
        if (variables[key].synonyms !== undefined) {
            const synonyms = variables[key].synonyms;
            for (const synonym of synonyms) {
                addKey(dict, synonym, key);
            }
        }
        return dict;
    }, {});
}
function initGame(variables, actions, strings) {
    const variablesProxy = getProxy(variables);
    const gameDefinition = {
        variables: variablesProxy,
        references: getReferences(variablesProxy),
        handlers,
        actions,
        strings,
        timeHandlers,
        handle,
        startTimer: (name) => startTimer(variablesProxy, name),
        stopTimer,
    };
    initTimers(gameDefinition);
    return gameDefinition;
}
export default initGame;
