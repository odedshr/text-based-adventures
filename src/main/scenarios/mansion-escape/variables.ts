import { Variables } from '../../types.js';
import rooms from './rooms.js';
import passages from './passages.js';
import items from './items.js';

const variables:Variables = {
    achivements:  { type: "list", value: [] },
    countdown: { type: "number", value: 3600 },
    player1: { type: "player", maxInventory: 1, location: "office" },
    ...rooms,
    ...passages,
    ...items
};

export default variables;