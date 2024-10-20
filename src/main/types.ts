export type RoomState = "dark" | "lit";
export type RoomVariable =  { type: "room", state?: RoomState };
export type PassageState = "locked" | "hidden" | "opened" | "closed";
export type PassageVariable =  { type: "passage", between: string[], state?:PassageState, allowedStates?:PassageState[], passed?: boolean, synonyms?: string[] };
export type PlayerVariable =  { type: "player", location: string, canContain?: number | string };
export type ItemVariable =  { type: "item", canContain?: number | string, canBeHeld?: boolean, state?: string, location: string, touched?: boolean, synonyms?: string[] };
export type NumberVariable =  { type: "number", value: number };
export type ConsoleVariable =  { type: "console", value: string };
export type ListVariable =  { type: "list", value: any[] };
export type Variable = RoomVariable | PassageVariable | PlayerVariable | ItemVariable | NumberVariable | ListVariable | ConsoleVariable;

export type Variables = {[key:string]:Variable};
export type VariableModifyUpdate = (variableName:string, value:Variable) => void;

export type Action = {
    input: RegExp,
    // returns true if no need for additional actions
    execute: (input:string, gameDefinition:GameDefinition, userId:string) => boolean
}

export type Condition = { item:string, property:'location'|'state', value:String, textId:string }

export type AddAchievement = (userId:string, achievement:string) => void;

export type GameDefinition = {
    variables: Variables,
    references: {[key:string]:string[]},
    handlers: VariableModifyUpdate[]
    actions: Action[],
    strings: {[key:string]:string},
    handle: (variableName:string, variable:Variable) => void
    print: (text:string, itemName?:string, locationName?: string) => void,
    startTimer: (name:string) => void,
    stopTimer: (name:string) => void,
    addAchievement:AddAchievement
}