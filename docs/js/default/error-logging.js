function logError(gameDefinition, error) {
    const { variables } = gameDefinition;
    const errors = variables.errors || { type: "list", value: [] };
    variables.errors = { type: "data", value: [...errors.value, error] };
}
function listErrors(gameDefinition) {
    const { variables } = gameDefinition;
    if (variables.errors) {
        console.log(variables.errors.value);
    }
}
const actions = [
    {
        input: /list errors/,
        execute: (gameDefinition, userId, input) => listErrors(gameDefinition)
    }
];
export { logError, listErrors, actions };
