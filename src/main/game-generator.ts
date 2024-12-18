import { GameDefinition, Variables, VariableModifyUpdate, NumberVariable, ItemVariable, Variable, GetStringMethod, Action } from './types.js';

const timers:{[key:string]:number} = {};
// const handlers:VariableModifyUpdate[] = [];

function handle(gameDefinition: GameDefinition, variableName: string, variable: Variable) {
    gameDefinition.handlers.forEach(handle => handle(gameDefinition, variableName, variable));
}

function getProxy(gameDefinition: GameDefinition, variables: Variables) {
    return new Proxy(variables, {
        set: function (target: Variables, variableName: string, variable:Variable) {
            target[variableName] = variable;
            handle(gameDefinition,variableName, variable)
            return true;
        }
    });
}

function startTimer(variables:Variables, name:string) {
    timers[name] = setInterval(() => {
        const value = (variables[name] as NumberVariable).value - 1;
        variables[name] = { type:"number",value  };
        if (value <= 0) {
            stopTimer(name);
        }
    }, 1000) as unknown as number;
}

function stopTimer(name: string) {
    clearInterval(timers[name]);
    delete timers[name];
}

function addKey(dict:{[key:string]:string[]}, key:string, value:string) {
    if (!dict[key]) {
        dict[key] = [];
    }

    dict[key].push(value);
}

function getReferences(variables: Variables):{[key:string]:string[]} {
    return Object.keys(variables).reduce((dict, key) => {
        addKey(dict, key, key);

        if ((variables[key] as ItemVariable).synonyms !== undefined) {
            const synonyms = (variables[key] as ItemVariable).synonyms as string[];

            for (const synonym of synonyms) {
                addKey(dict, synonym, key);
            }
        }
        return dict;
    }, {} as {[key:string]:string[]})
}

function initGame(
        variables:Variables,
        actions: Action[],
        strings: {[key:string]:string | GetStringMethod },
        handlers: VariableModifyUpdate[] = []):GameDefinition {

    const gameDefinition:GameDefinition = {
        variables, // will be replaced with variablesProxy
        references: {}, // will be filled later with variablesProxy
        handlers,
        actions,
        strings,
        startTimer: (name) => {}, // will be filled later with variablesProxy
        stopTimer,
    };
    gameDefinition.variables = getProxy(gameDefinition, gameDefinition.variables);
    gameDefinition.references =  getReferences(gameDefinition.variables);
    gameDefinition.startTimer = (name) => startTimer(gameDefinition.variables, name)

    return gameDefinition;
}

export default initGame;