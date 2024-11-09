import strings from '../../default/strings.js';
import { strings as attic } from './rooms/attic.js';
import { strings as backyard } from './rooms/backyard.js';
import { strings as basement } from './rooms/basement.js';
import { strings as bathroom } from './rooms/ensuite-bathroom.js';
import { strings as conservatory } from './rooms/conservatory.js';
import { strings as diningRoom } from './rooms/dining-room.js';
import { strings as ensuiteBathroom } from './rooms/ensuite-bathroom.js';
import { strings as foyer } from './rooms/foyer.js';
import { strings as garage} from './rooms/garage.js';
import { strings as guestRoom } from './rooms/guest-room.js';
import { strings as hallway } from './rooms/hallway.js';
import { strings as hobbyRoom } from './rooms/hobby-room.js';
import { strings as kitchen } from './rooms/kitchen.js';
import { strings as library } from './rooms/library.js';
import { strings as livingRoom } from './rooms/living-room.js';
import { strings as masterBedroom} from './rooms/master-bedroom.js';
import { strings as office} from './rooms/office.js';
import { strings as pantry } from './rooms/pantry.js';
import { strings as secretRoom } from './rooms/secret-room.js';
import { strings as securityRoom } from './rooms/security-room.js';
import { strings as toilet } from './rooms/toilet.js';

export default {
    ...strings,

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
    ...pantry,
    ...secretRoom,
    ...securityRoom,
    ...toilet
};