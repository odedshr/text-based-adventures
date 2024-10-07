import atticActions from './actions-per-room/attic-actions.js';
import backyardActions from './actions-per-room/backyard-actions.js';
import basementActions from './actions-per-room/basement-actions.js';
import conservatoryActions from './actions-per-room/conservatory.js';
import diningRoomActions from './actions-per-room/dining-room-actions.js';
import garageActions from './actions-per-room/garage-actions.js';
import guestRoomActions from './actions-per-room/guest-room-actions.js';
import masterBedroomActions from './actions-per-room/master-bedroom-actions.js';
import officeActions from './actions-per-room/office-actions.js';
import pantryActions from './actions-per-room/pantry-actions.js';
import securityRoomActions from './actions-per-room/security-room-actions.js';
import toiletActions from './actions-per-room/toilet-actions.js';
const actions = [
    ...atticActions,
    ...backyardActions,
    ...basementActions,
    ...conservatoryActions,
    ...diningRoomActions,
    ...garageActions,
    ...guestRoomActions,
    ...masterBedroomActions,
    ...officeActions,
    ...pantryActions,
    ...securityRoomActions,
    ...toiletActions
];
export default actions;
