import passages from "../scenarios/mansion-escape/passages.js";
import { PlayerVariable, PassageVariable, GameDefinition, Action } from "../types.js";
import getElementDescription from "./get-element-description.js";

const inspectRoomActions:Action[] = [
    {
        // inspect current room
        input: /(what is here\??|look around|where am i\??|what is (in )?this place\??|describe( the)? room|what is around me|show me the room|what do i see|tell me about my location|give me a description of the room)/,
        execute: (_:string, gameDefinition:GameDefinition, userId:string) => {
            const { print, variables } = gameDefinition;
            const currentRoomName = (variables[userId] as PlayerVariable).location;

            print(getElementDescription(gameDefinition, currentRoomName));
            return true;
        }
    },
    {
        // look for door
        input: /(are there any doors( in (here|(the|this) room))?\??)|(what doors are (there|available)\?)|(look|search|check|find|where|is\s+there|how)\s+(for\s+)?(a\s+)?(door|exit|way\s+out|escape|path|entrance|way)/,
        execute: (_:string, gameDefinition:GameDefinition, userId:string) => {
            const { print, variables } = gameDefinition;
            const currentRoomName = (variables[userId] as PlayerVariable).location;
            print('available doors', listRoomPassages(gameDefinition, currentRoomName));
            return true;
        }
    }
];

function listRoomPassages(gameDefinition:GameDefinition, roomName:string) {
    const { variables } = gameDefinition;
    const passages = Object.keys(variables).filter(key=>{
        const passage = variables[key] as PassageVariable;
        return passage.type === 'passage' && passage.between.includes(roomName) && passage.state !== 'hidden';
    }).map(doorName => {
        const passage = variables[doorName] as PassageVariable;
        const otherRoomName = passage.between.find(x => x !== roomName);

        return (!passage.state || passage.state === 'opened'|| passage.passed) ? `a ${doorName} leading to the ${otherRoomName}` : `a ${doorName}`;
    });

    return passages.length > 1 ? passages.slice(0, -1).join(', ') + ' and ' + passages.slice(-1) : passages[0]
}

export default inspectRoomActions;