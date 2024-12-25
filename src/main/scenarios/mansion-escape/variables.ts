import { Variables } from '../../types.js';

import { items as attic } from './rooms/attic.js';
import { items as backyard } from './rooms/backyard.js';
import { items as basement } from './rooms/basement.js';
import { items as bathroom } from './rooms/ensuite-bathroom.js';
import { items as conservatory } from './rooms/conservatory.js';
import { items as diningRoom } from './rooms/dining-room.js';
import { items as ensuiteBathroom } from './rooms/ensuite-bathroom.js';
import { items as foyer } from './rooms/foyer.js';
import { items as garage} from './rooms/garage.js';
import { items as guestRoom } from './rooms/guest-room.js';
import { items as hallway } from './rooms/hallway.js';
import { items as hobbyRoom } from './rooms/hobby-room.js';
import { items as kitchen } from './rooms/kitchen.js';
import { items as library } from './rooms/library.js';
import { items as livingRoom } from './rooms/living-room.js';
import { items as masterBedroom} from './rooms/master-bedroom.js';
import { items as office} from './rooms/office.js';
import { items as outside} from './rooms/outside.js';
import { items as pantry } from './rooms/pantry.js';
import { items as secretRoom } from './rooms/secret-room.js';
import { items as securityRoom } from './rooms/security-room.js';
import { items as toilet } from './rooms/toilet.js';

const variables:Variables = {
    countdown: { type: "data", value: 3600, state: 'decreasing' },
    player1: { type: "player", location: "office", canContain: 1 },
    lives: { type:"data", value: 1 },

    ...attic,
    ...backyard,
    ...basement,
    ...bathroom,
    ...conservatory,
    ...diningRoom,
    ...ensuiteBathroom,
    ...foyer,
    ...garage,
    ...guestRoom,
    ...hallway,
    ...hobbyRoom,
    ...kitchen,
    ...library,
    ...livingRoom,
    ...masterBedroom,
    ...office,
    ...outside,
    ...pantry,
    ...secretRoom,
    ...securityRoom,
    ...toilet
};

export default variables;