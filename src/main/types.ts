// Attributes are used when the state of an item is more complex than a simple string.
export type Attributes = { [key: string]: string };

export type RoomVariable =  { type: "room", state?: string | Attributes, synonyms?: string[], visited?: boolean };
export type PassageState = "locked" | "hidden" | "opened" | "closed";
export type PassageVariable =  { type: "passage", between: string[], state?:PassageState, allowedStates?:PassageState[], passed?: boolean, synonyms?: string[] };
export type PlayerVariable =  { type: "player", location: string, canContain?: number | string };
export type ItemVariable =  { type: "item", canContain?: number | string, canBeHeld?: boolean, state?: string | Attributes, location: string, touched?: boolean, synonyms?: string[] };
export type DataVariable =  { type: "data", value: string | number | any[], state?: 'decreasing' | 'increasing' | 'static' };
export type Variable = RoomVariable | PassageVariable | PlayerVariable | ItemVariable | DataVariable;

export type Variables = {[key:string]:Variable};
export type VariableModifyUpdate = (gameDefinition:GameDefinition, variableName: string, variable: Variable) => void;

export type GetStringMethod = (variables:Variables) => string;
export type Strings = {[key:string]:string | GetStringMethod};

export type ConditionalGenerator = (gameDefinition:GameDefinition, userId:string, input:string) => Condition[]

export type Action = {
    input: RegExp,
    conditions?:Condition[] | ConditionalGenerator,
    execute: (gameDefinition:GameDefinition, userId:string, input:string) => void
}

type Attribute = string;
export type Condition = { item:string, property: 'location' | 'state' | Attribute, value:string, textId:string }

export type GameDefinition = {
    actions: Action[],
    strings: { [key:string]: string | GetStringMethod },
    variables: Variables,
    references: { [key:string]:string[] },
    handlers: VariableModifyUpdate[],
    startTimer: (name:string) => void,
    stopTimer: (name:string) => void
}