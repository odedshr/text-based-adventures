import { NumberVariable, VariableModifyUpdate } from "../../types";

const handlers:VariableModifyUpdate[] = [
    (property, variable) => {
        if (property === "countdown" && (variable as NumberVariable).value == 0) {
            return 
        }
    }
];