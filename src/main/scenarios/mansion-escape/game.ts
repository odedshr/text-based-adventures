import { GameDefinition, Variables, VariableModifyUpdate, NumberVariable, ListVariable } from '../../types.js';

import variables from './variables.js';
import strings from './strings.js';
import initTimers from './timers.js';
import actions from './actions.js';

const timers:{[key:string]:number} = {};
const handlers:VariableModifyUpdate[] = [];
const variablesProxy = getProxy(variables, handlers);

function getProxy(variables: Variables, handlers: VariableModifyUpdate[]) {
    return new Proxy(variables, {
        set: function (target: Variables, property: string, value: any) {
            target[property] = value;
            handlers.forEach(handle => handle(property, value));
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
    const achivements = (variablesProxy.achivements as ListVariable);
    if ((achivements.value.indexOf(achievementWithUserId) === -1)) {
        variablesProxy.achivements = { type: "list", value: [ ...achivements.value, achievementWithUserId] };
    }
}

const gameDefinition: GameDefinition = {
    variables: variablesProxy,
    handlers,
    actions,
    strings,
    startTimer,
    stopTimer,
    addAchievement
};

initTimers(gameDefinition);

export default gameDefinition;