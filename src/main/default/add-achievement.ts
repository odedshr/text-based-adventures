import { GameDefinition, ListVariable } from "../types";

export default function addAchievement(gameDefinition: GameDefinition, userId:string, achievement: string) {
    const { variables } = gameDefinition;

    const achievementWithUserId = `${userId} ${achievement}`;
    const achievements = (variables.achievements as ListVariable) || { type: "list", value: [] };
    if ((achievements.value.indexOf(achievementWithUserId) === -1)) {
        variables.achievements = { type: "list", value: [ ...achievements.value, achievementWithUserId] };
    }
}