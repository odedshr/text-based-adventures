import print from '../../../default/print.js';
const pantry = {
    variables: {
        'pantry': { type: 'room' },
        'larder hatch': {
            type: 'passage',
            in: 'pantry',
            out: 'kitchen',
            allowedStates: ['opened'],
            state: 'opened',
        },
        'dog food': {
            type: 'item',
            location: 'pantry',
            canBeHeld: true,
            synonyms: ['easy-mix pupcake mix', 'pupcake mix']
        },
        'batteries': {
            type: 'item',
            location: 'pantry',
            canBeHeld: true,
            state: 'full'
        },
        batteryPower: { type: "data", value: 300, state: 'decreasing' },
    },
    actions: [],
    strings: {
        pantry(variables) {
            const dogFood = variables['dog food'].location === 'pantry';
            const batteries = variables.batteries.location === 'pantry';
            return `A small room adjacent to the kitchen, lined with shelves stocked with dry goods, canned food, and kitchen supplies.${dogFood ? ' A box of dog food is on the floor.' : ''}${batteries ? ' A box of batteries is on the shelf.' : ''}`;
        },
        'larder hatch': `A small, creaky wooden door with iron hinges, leading to the pantry. It's worn from years of use, often left ajar as fresh ingredients are constantly fetched for the kitchen.`,
        'dog food': `Looking carefully, it's actually a easy-mix pupcake mix. You can't simply give it to the dog, you'll need to prepare it first.`,
        batteries: 'A box of normal AA batteries.',
        'batteries out': 'The batteries ran out of power.',
        batteryPower: `The battery power is finite, better not waste it.`,
    },
    handlers: [
        (gameDefinition, variableName, variable) => {
            if (variableName === 'batteryPower') {
                const { variables, stopTimer } = gameDefinition;
                if (+variable.value <= 0) {
                    const batteries = variables.batteries;
                    variables.batteries = Object.assign(Object.assign({}, batteries), { state: 'empty' });
                    const flashlight = variables.flashlight;
                    variables.flashlight = Object.assign(Object.assign({}, flashlight), { state: 'off' });
                    print(gameDefinition, 'batteries out');
                    stopTimer('batteryPower');
                }
            }
        }
    ]
};
export default pantry;
