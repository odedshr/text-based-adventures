function logError(gameDefinition, error) {
    const { variables } = gameDefinition;
    const errors = variables.errors || { type: "list", value: [] };
    variables.achievements = { type: "list", value: [...errors.value, error] };
}
const actions = [
    {
        input: /list errors/,
        execute: (gameDefinition, userId, input) => {
            const { variables } = gameDefinition;
            const errors = variables.errors || { type: "list", value: [] };
            console.log(errors.value);
        }
    }
];
export { logError, actions };
