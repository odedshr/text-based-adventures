import getElementDescription from "./get-element-description.js";
function isInspectCurrentRoomQuestion(input) {
    const relevantQuestions = /(where am i\?|what is this place\?|describe the room|what is around me|show me the room|what do i see|what is in this place|tell me about my location|give me a description of the room)/;
    return relevantQuestions.test(input);
}
export default function inspectRoom(input, gameDefinition, userId) {
    const { variables } = gameDefinition;
    if (!isInspectCurrentRoomQuestion(input)) {
        return undefined;
    }
    const currentRoomName = variables[userId].location;
    return getElementDescription(gameDefinition, currentRoomName);
}
;
