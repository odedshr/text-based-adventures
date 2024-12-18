const timers = {};
// const handlers:VariableModifyUpdate[] = [];
function handle(gameDefinition, variableName, variable) {
    gameDefinition.handlers.forEach(handle => handle(gameDefinition, variableName, variable));
}
function getProxy(gameDefinition, variables) {
    return new Proxy(variables, {
        set: function (target, variableName, variable) {
            target[variableName] = variable;
            handle(gameDefinition, variableName, variable);
            return true;
        }
    });
}
function startTimer(variables, name) {
    timers[name] = setInterval(() => {
        const value = variables[name].value - 1;
        variables[name] = { type: "number", value };
        if (value <= 0) {
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
function initGame(variables, actions, strings, handlers = []) {
    const gameDefinition = {
        variables, // will be replaced with variablesProxy
        references: {}, // will be filled later with variablesProxy
        handlers,
        actions,
        strings,
        startTimer: (name) => { }, // will be filled later with variablesProxy
        stopTimer,
    };
    gameDefinition.variables = getProxy(gameDefinition, gameDefinition.variables);
    gameDefinition.references = getReferences(gameDefinition.variables);
    gameDefinition.startTimer = (name) => startTimer(gameDefinition.variables, name);
    return gameDefinition;
}
export default initGame;
