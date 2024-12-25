const timers = {};
// const handlers:VariableModifyUpdate[] = [];
function handle(gameDefinition, variableName, variable) {
    var _a;
    (_a = gameDefinition.handlers) === null || _a === void 0 ? void 0 : _a.forEach(handle => handle(gameDefinition, variableName, variable));
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
        const variable = variables[name];
        let value = variable.value;
        if (!isNaN(value)) {
            switch (variable.state) {
                case 'decreasing':
                    value--;
                    break;
                case 'increasing':
                    value++;
                    break;
            }
        }
        variables[name] = Object.assign(Object.assign({}, variable), { value });
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
function initGame(puzzle) {
    const gameDefinition = Object.assign(Object.assign({}, puzzle), { references: {}, startTimer: (name) => { }, // will be filled later with variablesProxy
        stopTimer });
    gameDefinition.variables = getProxy(gameDefinition, gameDefinition.variables);
    gameDefinition.references = getReferences(gameDefinition.variables);
    gameDefinition.startTimer = (name) => startTimer(gameDefinition.variables, name);
    return gameDefinition;
}
export default initGame;
