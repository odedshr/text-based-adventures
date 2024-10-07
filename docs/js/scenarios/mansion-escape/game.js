import variables from './variables.js';
import strings from './strings.js';
import initTimers from './timers.js';
import actions from './actions.js';
const timers = {};
const handlers = [];
const variablesProxy = getProxy(variables, handlers);
function getProxy(variables, handlers) {
    return new Proxy(variables, {
        set: function (target, property, value) {
            target[property] = value;
            handlers.forEach(handle => handle(property, value));
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
    const achivements = variablesProxy.achivements;
    if ((achivements.value.indexOf(achievementWithUserId) === -1)) {
        variablesProxy.achivements = { type: "list", value: [...achivements.value, achievementWithUserId] };
    }
}
const gameDefinition = {
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
