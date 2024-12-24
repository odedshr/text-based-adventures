import { Action, GameDefinition } from "../types";
import print from "./print.js";

const actions:Action[] = [
    {
        input: /^(who|what|where|when|why|how|is|are|was|were|can|could|will|would|should|do|does|did)\b|[?]\s*$/,
        execute: (gameDefinition:GameDefinition, userId:string,_:string) => {
            print(gameDefinition, 'difficult question', userId);
        }
    },
    {
        input: /\bhelp|(?:get|call|seek|find|need|ask\s+for|please\s+get|please\s+call|help\s+me|get\s+me|how\s+do\s+I|what\s+can\s+I|someone\s+help|anyone\s+help|could\s+someone|should\s+I)\s*(?:help|assistance|aid|support|rescue|someone|a\s+way)\b/,
        execute: (gameDefinition:GameDefinition, userId:string,_:string) => {
            print(gameDefinition, 'help', userId);
        }
    },
    {
        input: /\b(?:look|peek|glance|gaze|stare|check|peer|observe)\s*(?:out\s*(?:of)?|through)\s*(?:the|a)?\s*(?:window|windows|glass|pane)\b/,
        execute: (gameDefinition:GameDefinition, userId:string,_:string) => {
            print(gameDefinition, 'window', userId);
        }
    },
    {
        input: /\b(?:open|crack|push|slide|lift|unlock|unlatch|pull|pry)\s*(?:the|a)?\s*(?:window|windows|glass|pane)\b/,
        execute: (gameDefinition:GameDefinition, userId:string,_:string) => {
            print(gameDefinition, 'open-window', userId);
        }
    },
    {
        input: /\b(how\s+(do\s+(i|we)\s+)?(play|use|start|begin|do|operate)|instructions?|manual|guide|give\s+(me\s+)?(instructions|guide|manual|help)|show\s+(me\s+)?(how|instructions|guide|manual))\b/,
        execute: (gameDefinition:GameDefinition, userId:string,_:string) => {
            print(gameDefinition, 'game-instructions', userId);
        }
    }

];

export { actions };