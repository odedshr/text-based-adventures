export type RoomState = "dark" | "lit";
export type RoomVariable =  { type: "room", state?: RoomState };
export type PassageState = "locked" | "hidden" | "opened" | "closed";
export type PassageVariable =  { type: "passage", between: string[], state?:PassageState, allowedStates?:PassageState[], passed?: boolean };
export type PlayerVariable =  { type: "player", maxInventory: number, location: string };
export type ItemVariable =  { type: "item", canContain?: number | string, canBeHeld?: boolean, state?: string, location: string, touched?: boolean };
export type NumberVariable =  { type: "number", value: number };
export type ListVariable =  { type: "list", value: any[] };
export type Variable = RoomVariable | PassageVariable | PlayerVariable | ItemVariable | NumberVariable | ListVariable;

export type Variables = {[key:string]:Variable};
export type VariableModifyUpdate = (variableName:string, value:Variable) => void;

export type Action = {
    input: RegExp,
    execute: (input:string, gameDefinition:GameDefinition, userId:string) => string
}

export type GameDefinition = {
    variables: Variables,
    handlers: VariableModifyUpdate[]
    actions: Action[],
    strings: {[key:string]:string},
    startTimer: (name:string) => void,
    stopTimer: (name:string) => void,
    addAchievement: (userId:string, achievement:string) => void
}