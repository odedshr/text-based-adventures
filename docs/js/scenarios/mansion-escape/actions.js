import { actions as attic } from './rooms/attic.js';
import { actions as backyard } from './rooms/backyard.js';
import { actions as basement } from './rooms/basement.js';
import { actions as bathroom } from './rooms/ensuite-bathroom.js';
import { actions as conservatory } from './rooms/conservatory.js';
import { actions as diningRoom } from './rooms/dining-room.js';
import { actions as ensuiteBathroom } from './rooms/ensuite-bathroom.js';
import { actions as foyer } from './rooms/foyer.js';
import { actions as garage } from './rooms/garage.js';
import { actions as guestRoom } from './rooms/guest-room.js';
import { actions as hallway } from './rooms/hallway.js';
import { actions as hobbyRoom } from './rooms/hobby-room.js';
import { actions as kitchen } from './rooms/kitchen.js';
import { actions as library } from './rooms/library.js';
import { actions as livingRoom } from './rooms/living-room.js';
import { actions as masterBedroom } from './rooms/master-bedroom.js';
import { actions as office } from './rooms/office.js';
import { actions as outside } from './rooms/outside.js';
import { actions as pantry } from './rooms/pantry.js';
import { actions as secretRoom } from './rooms/secret-room.js';
import { actions as securityRoom } from './rooms/security-room.js';
import { actions as toilet } from './rooms/toilet.js';
import { actions as defaultActions } from '../../default/index.js';
const actions = [
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
    ...toilet,
    ...defaultActions
];
export default actions;
