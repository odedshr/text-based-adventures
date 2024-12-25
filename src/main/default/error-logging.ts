import { Action, GameDefinition, DataVariable } from "../types";

function logError(gameDefinition: GameDefinition, error: string) {
    const { variables } = gameDefinition;

    const errors = (variables.errors as DataVariable) || { type: "list", value: [] };
    variables.errors = { type: "data", value: [ ...errors.value as string[], error] };
}

function listErrors(gameDefinition: GameDefinition) {
    const { variables } = gameDefinition;
    if (variables.errors) {
        console.log((variables.errors as DataVariable).value);
    }
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