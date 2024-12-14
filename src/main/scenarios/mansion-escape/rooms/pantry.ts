import { Action, GameDefinition, ItemVariable, NumberVariable, PassageVariable, RoomVariable, Variable, VariableModifyUpdate } from '../../../types';
import print from '../../../default/print.js';

const items:{ [key:string]: ItemVariable|RoomVariable|PassageVariable|NumberVariable } = {
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

const actions:Action[] = [];

const strings = {
    pantry: 'A small room adjacent to the kitchen, lined with shelves stocked with dry goods, canned food, and kitchen supplies.',
    'larder hatch': 'A small, creaky wooden door with iron hinges, leading to the pantry. It’s worn from years of use, often left ajar as fresh ingredients are constantly fetched for the kitchen.',
    'dog food': 'You see a bag of dog food.',
    batteries: 'You see a box of normal AA batteries.',
    'batteries out': 'The batteries ran out of power.',
};

const handlers:VariableModifyUpdate[] = [
    (gameDefinition: GameDefinition, variableName:string, variable:Variable) => {
        if (variableName==='batteryPower') {
            const { variables, stopTimer } = gameDefinition;
            if ((variable as NumberVariable).value <= 0 ) {
                const batteries = variables.batteries;
                variables.batteries = { ...batteries, state: 'empty' } as ItemVariable;
                const flashlight = variables.flashlight;
                variables.flashlight = { ...flashlight, state: 'off' } as ItemVariable;
                print(gameDefinition, 'batteries out');
                stopTimer('batteryPower');
            }
        }
    }
];

export {
    actions,
    items,
    strings,
    handlers
}