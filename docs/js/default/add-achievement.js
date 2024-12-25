export default function addAchievement(gameDefinition, userId, achievement) {
    const { variables } = gameDefinition;
    const achievementWithUserId = `${userId} ${achievement}`;
    const achievements = variables.achievements || { type: "data", value: [] };
    const value = achievements.value;
    if ((value.indexOf(achievementWithUserId) === -1)) {
        variables.achievements = { type: "data", value: [...value, achievementWithUserId] };
    }
}
