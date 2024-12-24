import { Action, GameDefinition, ListVariable } from "../types";

function logError(gameDefinition: GameDefinition, error: string) {
    const { variables } = gameDefinition;

    const errors = (variables.errors as ListVariable) || { type: "list", value: [] };
    variables.errors = { type: "list", value: [ ...errors.value, error] };
}

function listErrors(gameDefinition: GameDefinition) {
    const { variables } = gameDefinition;
    const errors = (variables.errors as ListVariable) || { type: "list", value: [] };
    console.debug(errors.value);
}

const actions:Action[] = [
    {
        input: /list errors/,
        execute: (gameDefinition:GameDefinition, userId:string, input:string) => listErrors(gameDefinition)
    }
];

export {
    logError,
    listErrors,
    actions
}