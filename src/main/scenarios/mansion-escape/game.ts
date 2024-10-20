import { GameDefinition, Variables, VariableModifyUpdate, NumberVariable, ListVariable, ItemVariable, Variable } from '../../types.js';

import variables from './variables.js';
import strings from './strings.js';
import initTimers from './timers.js';
import actions from './actions.js';

const timers:{[key:string]:number} = {};
const handlers:VariableModifyUpdate[] = [];
const variablesProxy = getProxy(variables);

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

function startTimer(name:string) {
    timers[name] = setInterval(() => {
        const value = (variablesProxy[name] as NumberVariable).value - 1;
        variablesProxy[name] = { type:"number",value  };
        if (value===0) {
            stopTimer(name);
        }
    }, 1000) as unknown as number;
}

function stopTimer(name: string) {
    clearInterval(timers[name]);
    delete timers[name];
}

function addAchievement(userId:string, achievement: string) {
    const achievementWithUserId = `${userId} ${achievement}`;
    const achievements = (variablesProxy.achievements as ListVariable);
    if ((achievements.value.indexOf(achievementWithUserId) === -1)) {
        variablesProxy.achievements = { type: "list", value: [ ...achievements.value, achievementWithUserId] };
    }
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

function appendToConsole(textId:string, itemName?:string, locationName?: string) {
    //@ts-ignore
    let value:string = strings[textId];
    if (itemName) {
        value = value.replace(/item/g, itemName);
    }
    if (locationName) {
        value = value.replace(/location/g, locationName);
    }

    if (value) {
        variablesProxy.console = { type: 'console', value }    
    } else {
        console.error(`Unknown textId: ${textId} `);
    }
}

const gameDefinition: GameDefinition = {
    variables: variablesProxy,
    references: getReferences(variablesProxy),
    handlers,
    actions,
    strings,
    print: appendToConsole,
    handle,
    startTimer,
    stopTimer,
    addAchievement
};

initTimers(gameDefinition);

export default gameDefinition;