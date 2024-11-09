import { GameDefinition, Variables, VariableModifyUpdate, NumberVariable, ItemVariable, Variable, GetStringMethod, Action } from './types.js';

import timeHandlers from './scenarios/mansion-escape/timers.js';

const timers:{[key:string]:number} = {};
const handlers:VariableModifyUpdate[] = [];

function handle(variableName: string, variable: Variable) {
    handlers.forEach(handle => handle(variableName, variable));
}

function getProxy(variables: Variables) {
    return new Proxy(variables, {
        set: function (target: Variables, variableName: string, variable:Variable) {
            target[variableName] = variable;
            handle(variableName, variable)
            return true;
        }
    });
}

function initTimers (gameDefinition: GameDefinition) {
    const { variables, handlers } = gameDefinition;
    
    handlers.push((variableName, variable) => {
        if (variable.type === 'number' && variable.state === 'decreasing' && variable.value === 0) {
            gameDefinition.timeHandlers[variableName](gameDefinition);    
        }
    });

    Object.keys(variables).filter(key => variables[key].type === 'number' && variables[key].state === 'decreasing')
        .forEach(variable => gameDefinition.startTimer(variable));
}

function startTimer(variables:Variables, name:string) {
    timers[name] = setInterval(() => {
        const value = (variables[name] as NumberVariable).value - 1;
        variables[name] = { type:"number",value  };
        if (value===0) {
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




function initGame(variables:Variables, actions: Action[], strings: {[key:string]:string | GetStringMethod }):GameDefinition {
    const variablesProxy = getProxy(variables);

    const gameDefinition:GameDefinition = {
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