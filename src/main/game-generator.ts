import { GameDefinition, Variables, VariableModifyUpdate, ItemVariable, Variable, GetStringMethod, Action, DataVariable, PuzzlePiece } from './types.js';

const timers:{[key:string]:number} = {};
// const handlers:VariableModifyUpdate[] = [];

function handle(gameDefinition: GameDefinition, variableName: string, variable: Variable) {
    gameDefinition.handlers?.forEach(handle => handle(gameDefinition, variableName, variable));
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
        const variable = (variables[name] as DataVariable);
        let value = variable.value as number;
        if (!isNaN(value)) {
            switch(variable.state) {
                case 'decreasing': value--; break;
                case 'increasing': value++; break;
            }
        }

        variables[name] = { ... variable ,value }
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

function initGame(puzzle:PuzzlePiece):GameDefinition {

    const gameDefinition:GameDefinition = {
        ...puzzle,
        references: {}, // will be filled later with variablesProxy
        startTimer: (name:string) => {}, // will be filled later with variablesProxy
        stopTimer,
    };
    gameDefinition.variables = getProxy(gameDefinition, gameDefinition.variables);
    gameDefinition.references =  getReferences(gameDefinition.variables);
    gameDefinition.startTimer = (name) => startTimer(gameDefinition.variables, name)

    return gameDefinition;
}

export default initGame;