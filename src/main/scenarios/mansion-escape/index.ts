import { DataVariable, GameDefinition, PuzzlePiece, Variable, VariableModifyUpdate } from '../../types.js';
import { listErrors } from '../../default/error-logging.js';
import print from '../../default/print.js';

import generic from '../../default/index.js';

import attic from './rooms/attic.js';
import backyard from './rooms/backyard.js';
import basement from './rooms/basement.js';
import bathroom from './rooms/ensuite-bathroom.js';
import conservatory from './rooms/conservatory.js';
import diningRoom from './rooms/dining-room.js';
import ensuiteBathroom from './rooms/ensuite-bathroom.js';
import foyer from './rooms/foyer.js';
import garage from './rooms/garage.js';
import guestRoom from './rooms/guest-room.js';
import hallway from './rooms/hallway.js';
import hobbyRoom from './rooms/hobby-room.js';
import kitchen from './rooms/kitchen.js';
import library from './rooms/library.js';
import livingRoom from './rooms/living-room.js';
import masterBedroom from './rooms/master-bedroom.js';
import office from './rooms/office.js';
import outside from './rooms/outside.js';
import pantry from './rooms/pantry.js';
import secretRoom from './rooms/secret-room.js';
import securityRoom from './rooms/security-room.js';
import toilet from './rooms/toilet.js';

const puzzle:PuzzlePiece = {
    actions: [],
    strings: {},
    variables: {
        countdown: { type: "data", value: 3600, state: 'decreasing' },
        player1: { type: "player", location: "office", canContain: 1 },
        lives: { type:"data", value: 1 },
    },
    handlers:  [
        (gameDefinition: GameDefinition, variableName:string, variable:Variable) => {
            if (variableName==='countdown' && +(variable as DataVariable).value <= 0) {
                print(gameDefinition, 'time\'s up');
                finishGame(gameDefinition);
            }
        },
        (gameDefinition: GameDefinition, _:string, variable:Variable) => {
            if (variable.type==='player' && variable.location === 'outside') {
                finishGame(gameDefinition);
            }
        }
    ]
    
};

[
    attic,
    backyard,
    basement,
    bathroom,
    conservatory,
    diningRoom,
    ensuiteBathroom,
    foyer,
    garage,
    guestRoom,
    hallway,
    hobbyRoom,
    kitchen,
    library,
    livingRoom,
    masterBedroom,
    office,
    outside,
    pantry,
    secretRoom,
    securityRoom,
    toilet,
    generic
].reduce((acc:PuzzlePiece, piece:PuzzlePiece) => {
    acc.actions = [...(acc.actions || []), ...(piece.actions || [])];
    acc.variables = {...(acc.variables || {}), ...(piece.variables || {})};
    acc.strings = {...(acc.strings || {}), ...(piece.strings || {})};
    acc.handlers =[...(acc.handlers || []), ...(piece.handlers || [])];
    return acc;
}, puzzle);

function finishGame(gameDefinition: GameDefinition) {
    const { stopTimer } = gameDefinition;
    gameDefinition.variables.lives = {...gameDefinition.variables.lives, value: 0 } as DataVariable;
    listErrors(gameDefinition);
    stopTimer('countdown');
}

export default puzzle;