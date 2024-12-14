import print from '../../../default/print.js';
const items = {
    'pantry': { type: 'room' },
    'larder hatch': {
        type: 'passage',
        between: ['kitchen', 'pantry'],
        allowedStates: ['opened'],
        state: 'opened',
    },
    'dog food': {
        type: 'item',
        location: 'pantry',
        canBeHeld: true
    },
    'batteries': {
        type: 'item',
        location: 'pantry',
        canBeHeld: true,
        state: 'full'
    },
    batteryPower: { type: "number", value: 300, state: 'decreasing' },
};
const actions = [];
const strings = {
    pantry: 'A small room adjacent to the kitchen, lined with shelves stocked with dry goods, canned food, and kitchen supplies.',
    'larder hatch': 'A small, creaky wooden door with iron hinges, leading to the pantry. It’s worn from years of use, often left ajar as fresh ingredients are constantly fetched for the kitchen.',
    'dog food': 'You see a bag of dog food.',
    batteries: 'You see a box of normal AA batteries.',
    'batteries out': 'The batteries ran out of power.',
};
const handlers = [
    (gameDefinition, variableName, variable) => {
        if (variableName === 'batteryPower') {
            const { variables, stopTimer } = gameDefinition;
            if (variable.value <= 0) {
                const batteries = variables.batteries;
                variables.batteries = Object.assign(Object.assign({}, batteries), { state: 'empty' });
                const flashlight = variables.flashlight;
                variables.flashlight = Object.assign(Object.assign({}, flashlight), { state: 'off' });
                print(gameDefinition, 'batteries out');
                stopTimer('batteryPower');
            }
        }
    }
];
export { actions, items, strings, handlers };
