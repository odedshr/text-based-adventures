import rooms from './rooms.js';
import passages from './passages.js';
import items from './items.js';
const variables = Object.assign(Object.assign(Object.assign({ achievements: { type: "list", value: [] }, countdown: { type: "number", value: 3600 }, player1: { type: "player", location: "office", canContain: 1 }, lives: { type: "number", value: 1 } }, rooms), passages), items);
export default variables;
