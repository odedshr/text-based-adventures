import { GameDefinition } from '../../types.js';

export default function initTimers (gameDefinition: GameDefinition) {
    gameDefinition.startTimer('countdown');
}