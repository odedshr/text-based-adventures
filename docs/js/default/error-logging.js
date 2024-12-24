function logError(gameDefinition, error) {
    const { variables } = gameDefinition;
    const errors = variables.errors || { type: "list", value: [] };
    variables.errors = { type: "list", value: [...errors.value, error] };
}
function listErrors(gameDefinition) {
    const { variables } = gameDefinition;
    const errors = variables.errors || { type: "list", value: [] };
    console.debug(errors.value);
}
const actions = [
    {
        input: /list errors/,
        execute: (gameDefinition, userId, input) => listErrors(gameDefinition)
    }
];
export { logError, listErrors, actions };
