import { GameDefinition, NumberVariable, Variables, VariableModifyUpdate } from "../../types";

import variables from "./variables.js";
import strings from "./strings.js";

const handlers:VariableModifyUpdate[] = [];
const variablesProxy = getProxy(variables, handlers);

const gameDefinition: GameDefinition = {
    variables: variablesProxy,
    handlers,
    timers: [ setInterval(() => { variablesProxy.countdown = { type:"number",value: (variablesProxy.countdown as NumberVariable).value - 1 }; }, 1000) ],
    actions: [],
    strings
};

export default gameDefinition;

function getProxy(variables: Variables, handlers: VariableModifyUpdate[]) {
    return new Proxy(variables, {
        set: function (target: Variables, property: string, value: any) {
            target[property] = value;
            handlers.forEach(handle => handle(property, value));
            return true;
        }
    });
}