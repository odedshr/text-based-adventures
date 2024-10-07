export type RoomState = "dark" | "lit";
export type RoomVariable =  { type: "room", visited: boolean, state?: RoomState };
export type PassageState = "locked" | "unlocked" | "hidden" | "open" | "close";
export type PassageVariable =  { type: "passage", between: string[], state?:PassageState, allowedStates?:PassageState[] };
export type PlayerVariable =  { type: "player", maxInventory: number, location: string };
export type ItemVariable =  { type: "item", canContain?: number | string, canBeHeld?: boolean, state?: string, location: string, touched: boolean };
export type NumberVariable =  { type: "number", value: number };
export type Variable = RoomVariable | PassageVariable | PlayerVariable | ItemVariable | NumberVariable;

export type Variables = {[key:string]:Variable};
export type VariableModifyUpdate = (variableName:string, value:Variable) => void;

export type Action = {
    verb: RegExp,
    target?: string,
    secondaryTarget?: string,
    execute: (input:string, variables:Variables, userId:string) => string
}

export type GameDefinition = {
    variables: Variables,
    handlers: VariableModifyUpdate[]
    timers: NodeJS.Timeout[],
    actions: Action[],
    strings: {[key:string]:string}
}