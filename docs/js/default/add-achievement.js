export default function addAchievement(gameDefinition, userId, achievement) {
    const { variables } = gameDefinition;
    const achievementWithUserId = `${userId} ${achievement}`;
    const achievements = variables.achievements || { type: "list", value: [] };
    if ((achievements.value.indexOf(achievementWithUserId) === -1)) {
        variables.achievements = { type: "list", value: [...achievements.value, achievementWithUserId] };
    }
}
