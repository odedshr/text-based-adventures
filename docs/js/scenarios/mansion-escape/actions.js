const actions = [
    {
        verb: /\b(remove|take)\s(the\s)?(portrait|picture|painting)\s(off|from)(\s(the\s)?wall)?\b/,
        execute: (input, gameDefinition, userId) => {
            var _a;
            const { variables } = gameDefinition;
            const portrait = variables.portrait;
            if ((_a = portrait.state) === null || _a === void 0 ? void 0 : _a.includes('wall')) {
                portrait.state = (portrait.state || '').replace('wall', 'floor');
                addAchivements(variables, 'find vault');
                return `You removed the portrait from the wall. There's a vault hidden behind the portrait!`;
            }
            return `it's already off the wall`;
        }
    },
    {
        verb: /\b(put|place|hang)\s(the\s)?(portrait|picture|painting)\s(back\s)?(on|onto)\s((the\s)?wall)?\b/,
        execute: (input, gameDefinition, userId) => {
            var _a;
            const { variables } = gameDefinition;
            const portrait = variables.portrait;
            if ((_a = portrait.state) === null || _a === void 0 ? void 0 : _a.includes('on-the-floor')) {
                portrait.state = (portrait.state || '').replace(/floor/g, 'wall');
                addAchivements(variables, 'hide vault');
                portrait.touched = true;
                return `You put the portrait back on the wall. The vault is hidden again.`;
            }
            return `it's already on the wall`;
        }
    }
];
function addAchivements(variables, achievement) {
    const achivements = variables.achivements;
    if ((achivements.value.indexOf(achievement) === -1)) {
        variables.achivements = { type: "list", value: [...achivements.value, achievement] };
    }
}
export default actions;
