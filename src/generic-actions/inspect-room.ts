import { PlayerVariable, GameDefinition } from "../types.js";
import getElementDescription from "./get-element-description.js";

function isInspectCurrentRoomQuestion(input:string) {
    const relevantQuestions = /(where am i\?|what is this place\?|describe the room|what is around me|show me the room|what do i see|what is in this place|tell me about my location|give me a description of the room)/;
    
    return relevantQuestions.test(input);
}

export default function inspectRoom(input:string, gameDefinition:GameDefinition, userId: string) {
    const { variables } = gameDefinition;
    if (!isInspectCurrentRoomQuestion(input)) {
        return undefined;
    }
    
    const currentRoomName = (variables[userId] as PlayerVariable).location;
    return  getElementDescription(gameDefinition, currentRoomName);
};