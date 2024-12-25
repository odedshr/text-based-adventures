import { GameDefinition, DataVariable } from "../types";

export default function addAchievement(gameDefinition: GameDefinition, userId:string, achievement: string) {
    const { variables } = gameDefinition;

    const achievementWithUserId = `${userId} ${achievement}`;
    const achievements = (variables.achievements as DataVariable) || { type: "data", value: [] };
    const value = achievements.value as string[];
    if ((value.indexOf(achievementWithUserId) === -1)) {
        variables.achievements = { type: "data", value: [ ...value, achievementWithUserId] };
    }
}