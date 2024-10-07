import getElementDescription from "./get-element-description.js";
function isInspectCurrentRoomQuestion(input) {
    const relevantQuestions = /(where am i\?|what is this place\?|describe the room|what is around me|show me the room|what do i see|what is in this place|tell me about my location|give me a description of the room)/;
    return relevantQuestions.test(input);
}
function isLookForDoorQuestion(input) {
    const relevantQuestions = /(are there any doors( in (here|(the|this) room))?\??)|(look|search|check|find|where|is\s+there|how)\s+(for\s+)?(a\s+)?(door|exit|way\s+out|escape|path|entrance|way)/;
    return relevantQuestions.test(input);
}
function listRoomPassages(gameDefinition, roomName) {
    const { variables } = gameDefinition;
    return Object.keys(variables).filter(key => {
        const passage = variables[key];
        return passage.type === 'passage' && passage.between.includes(roomName) && passage.state !== 'hidden';
    }).map(doorName => {
        const passage = variables[doorName];
        const otherRoomName = passage.between.find(x => x !== roomName);
        return (!passage.state || passage.state === 'opened' || passage.passed) ? `a ${doorName} leading to the ${otherRoomName}` : `a ${doorName}`;
    }).join(', ');
}
export default function inspectRoom(input, gameDefinition, userId) {
    const { variables } = gameDefinition;
    const currentRoomName = variables[userId].location;
    if (isInspectCurrentRoomQuestion(input)) {
        return getElementDescription(gameDefinition, currentRoomName);
    }
    if (isLookForDoorQuestion(input)) {
        return `Doors that I can see: ${listRoomPassages(gameDefinition, currentRoomName)}`;
    }
    return undefined;
}
;