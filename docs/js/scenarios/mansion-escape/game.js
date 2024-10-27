import variables from './variables.js';
import strings from './strings.js';
import initTimers from './timers.js';
import actions from './actions.js';
const timers = {};
const handlers = [];
const variablesProxy = getProxy(variables);
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
function startTimer(name) {
    timers[name] = setInterval(() => {
        const value = variablesProxy[name].value - 1;
        variablesProxy[name] = { type: "number", value };
        if (value === 0) {
            stopTimer(name);
        }
    }, 1000);
}
function stopTimer(name) {
    clearInterval(timers[name]);
    delete timers[name];
}
function addAchievement(userId, achievement) {
    const achievementWithUserId = `${userId} ${achievement}`;
    const achievements = variablesProxy.achievements;
    if ((achievements.value.indexOf(achievementWithUserId) === -1)) {
        variablesProxy.achievements = { type: "list", value: [...achievements.value, achievementWithUserId] };
    }
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
function appendToConsole(textId, itemName, locationName) {
    //@ts-ignore
    let value = strings[textId];
    if (typeof value === "function") {
        value = value(variablesProxy);
    }
    if (itemName) {
        value = value.replace(/item/g, itemName);
    }
    if (locationName) {
        value = value.replace(/location/g, locationName);
    }
    if (value) {
        variablesProxy.console = { type: 'console', value };
    }
    else {
        console.error(`Unknown textId: ${textId} `);
    }
}
const gameDefinition = {
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
