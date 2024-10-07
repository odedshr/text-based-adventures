import variables from "./variables.js";
import strings from "./strings.js";
const handlers = [];
const variablesProxy = getProxy(variables, handlers);
const gameDefinition = {
    variables: variablesProxy,
    handlers,
    timers: [setInterval(() => { variablesProxy.countdown = { type: "number", value: variablesProxy.countdown.value - 1 }; }, 1000)],
    actions: [],
    strings
};
export default gameDefinition;
function getProxy(variables, handlers) {
    return new Proxy(variables, {
        set: function (target, property, value) {
            target[property] = value;
            handlers.forEach(handle => handle(property, value));
            return true;
        }
    });
}
