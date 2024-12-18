export type Attributes = { [key: string]: string };
export type RoomVariable =  { type: "room", state?: string | Attributes, synonyms?: string[] };
export type PassageState = "locked" | "hidden" | "opened" | "closed";
export type PassageVariable =  { type: "passage", between: string[], state?:PassageState, allowedStates?:PassageState[], passed?: boolean, synonyms?: string[] };
export type PlayerVariable =  { type: "player", location: string, canContain?: number | string };
export type ItemVariable =  { type: "item", canContain?: number | string, canBeHeld?: boolean, state?: string | Attributes, location: string, touched?: boolean, synonyms?: string[] };
export type NumberVariable =  { type: "number", value: number, state?: 'decreasing' | 'static' };
export type ConsoleVariable =  { type: "console", value: string };
export type ListVariable =  { type: "list", value: any[] };
export type Variable = RoomVariable | PassageVariable | PlayerVariable | ItemVariable | NumberVariable | ListVariable | ConsoleVariable;

export type Variables = {[key:string]:Variable};
export type VariableModifyUpdate = (gameDefinition:GameDefinition, variableName: string, variable: Variable) => void;

export type GetStringMethod = (variables:Variables) => string;
export type Strings = {[key:string]:string | GetStringMethod};

export type Location = {
    actions: Action[],
    strings: {[key:string]:string | GetStringMethod },
}
export type ConditionalGenerator = (gameDefinition:GameDefinition, userId:string) => Condition[]

export type Action = {
    input: RegExp,
    conditions?:Condition[] | ConditionalGenerator,
    // returns true if no need for additional actions
    execute: (input:string, gameDefinition:GameDefinition, userId:string) => void
}

type Attribute = string;
export type Condition = { item:string, property: 'location' | 'state' | Attribute, value:string, textId:string }


export type TimerHandler = (gameDefinition:GameDefinition) => void;

export type GameDefinition = Location & {
    variables: Variables,
    references: {[key:string]:string[]},
    handlers: VariableModifyUpdate[],
    startTimer: (name:string) => void,
    stopTimer: (name:string) => void
}