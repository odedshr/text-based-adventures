import backyardActions from './actions-per-room/backyard-actions.js';
import basementActions from './actions-per-room/basement-actions.js';
import conservatoryActions from './actions-per-room/conservatory.js';
import diningRoomActions from './actions-per-room/dining-room-actions.js';
import garageActions from './actions-per-room/garage-actions.js';
import masterBedroomActions from './actions-per-room/master-bedroom-actions.js';
import { actions as atticActions } from './rooms/attic.js';
import { actions as officeActions } from './rooms/office.js';
import { actions as guestRoomActions } from './rooms/guest-room.js';
import { actions as hobbyRoomActions } from './rooms/hobbies-room.js';
import pantryActions from './actions-per-room/pantry-actions.js';
import securityRoomActions from './actions-per-room/security-room-actions.js';
import toiletActions from './actions-per-room/toilet-actions.js';
import pickGenericItem from '../../default/pick-up.js';
import pickGenericItemOutOfContainer from '../../default/take-out.js';
import inspectRoomActions from '../../default/inspect-room.js';
import { actions as passageActions } from '../../default/passages.js';
import inspectItemActions from '../../default/inspect-item.js';
const actions = [
    ...atticActions,
    ...backyardActions,
    ...basementActions,
    ...conservatoryActions,
    ...diningRoomActions,
    ...garageActions,
    ...guestRoomActions,
    ...hobbyRoomActions,
    ...masterBedroomActions,
    ...officeActions,
    ...pantryActions,
    ...securityRoomActions,
    ...toiletActions,
    pickGenericItem,
    pickGenericItemOutOfContainer,
    ...inspectRoomActions,
    ...passageActions,
    ...inspectItemActions
];
export default actions;
