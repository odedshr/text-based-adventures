import { ItemVariable } from '../../types.js';
import { items as atticItems } from './rooms/attic.js';
import { items as guestRoomItems } from './rooms/guest-room.js';
import { items as hobbyRoomItems } from './rooms/hobbies-room.js';
import { items as officeItems } from './rooms/office.js';

const items:{[key:string]:ItemVariable} = {
    ...hobbyRoomItems,
    ...guestRoomItems,
    ...officeItems,
    ...atticItems
};

export default items;