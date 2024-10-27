import strings from '../../default/strings.js';
import { strings as atticStrings } from './rooms/attic.js';
import { strings as guestRoomStrings } from './rooms/guest-room.js';
import { strings as hobbyRoomStrings } from './rooms/hobbies-room.js';
import { strings as officeStrings } from './rooms/office.js';
import { strings as passageStrings } from '../../default/passages.js';


export default {
    ...strings,
    ...atticStrings,
    ...guestRoomStrings,
    ...hobbyRoomStrings,
    ...officeStrings,
    ...passageStrings
};