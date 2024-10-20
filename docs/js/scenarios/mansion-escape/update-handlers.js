const handlers = [
    (property, variable) => {
        if (property === "countdown" && variable.value == 0) {
            return;
        }
    }
];
export {};
