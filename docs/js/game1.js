
const state = {
    maxDuration: 3600, // 1 hour
    userId: 'myself',
    inventoryKeyword: 'bag',
    elements: {
        // Player (user)
        'myself': {
            state: 'idle',
            parent: 'office',
            maxChildren: 1,
            description: {
                idle: 'You are standing here, ready for action.'
            }
        },
        // Rooms
        'attic': {
            type: 'room',
            description: 'A dusty, dimly lit space filled with old trunks, forgotten furniture, and cobwebs. The air smells of age and memories.'
        },
        'hallway': {
            type: 'room',
            description: 'A long corridor lined with portraits and elegant sconces. The soft carpet muffles footsteps, and several doors lead off into other rooms.'
        },
        'ensuite bathroom': {
            type: 'room',
            description: 'A private bathroom with marble countertops, a clawfoot tub, a separate shower, and elegant fixtures. Towels hang neatly on heated racks.'
        },
        'master bedroom': {
            type: 'room',
            description: 'A luxurious bedroom with a king-sized bed, ornate wooden furniture, a walk-in closet, and a grand view of the estate grounds.'
        },
        'hobbies room': {
            type: 'room',
            description: 'A room dedicated to various hobbies, including shelves of crafting supplies, a large table for working on projects, and musical instruments in one corner.'
        },
        'guest room': {
            type: 'room',
            description: 'A cozy room with a queen-sized bed, a small wardrobe, and a vanity. It is warmly decorated, with a welcoming atmosphere for visitors.'
        },
        'bathroom': {
            type: 'room',
            description: 'A shared bathroom with a tiled floor, a large mirror, and a simple but elegant bathtub and shower. Basic toiletries are neatly arranged on the countertop.'
        },
        'office': {
            type: 'room',
            description: 'The office has a sturdy oak desk at its center, papers neatly stacked on one side, and a leather journal lying open. There\'s large portrait behind the desk hanging on the on the wall. To the side of the desk is a small bin, inside of which is a crumpled newspaper. On the floor, near the window, a broken vase lies in pieces.'
        },
        'pantry': {
            type: 'room',
            description: 'A small room adjacent to the kitchen, lined with shelves stocked with dry goods, canned food, and kitchen supplies.'
        },
        'kitchen': {
            type: 'room',
            description: 'A modern kitchen with stainless steel appliances, marble countertops, and a large central island. The room smells of fresh herbs and baking bread.'
        },
        'dining room': {
            type: 'room',
            description: 'A formal dining room with a long table, elegant chandeliers, and a sideboard for serving. Fine china and silverware are neatly arranged for guests.'
        },
        'toilet': {
            type: 'room',
            description: 'A small, functional room with a simple toilet, a sink, and a mirror. The space is clean and brightly lit.'
        },
        'library': {
            type: 'room',
            description: 'A grand library filled with tall bookshelves, a rolling ladder, and comfortable reading chairs. The scent of old books fills the air.'
        },
        'living room': {
            type: 'room',
            description: 'A spacious room with plush sofas, a fireplace, and a large window offering a view of the garden. Family portraits decorate the walls.'
        },
        'conservatory': {
            type: 'room',
            description: 'A sunlit room filled with potted plants and wicker furniture. Glass walls offer a panoramic view of the surrounding garden and yard.'
        },
        'foyer': {
            type: 'room',
            description: 'The grand entrance to the mansion with a sweeping staircase, a chandelier, and a large rug. A coat stand and an umbrella holder are by the door.'
        },
        'back yard': {
            type: 'room',
            description: 'An open outdoor area with manicured lawns, flowerbeds, and a few benches. A stone path leads to the garden and the back entrance of the mansion.'
        },
        'garage': {
            type: 'room',
            description: 'A large space with room for several cars, tools hanging neatly on the walls, and shelves filled with spare parts and car cleaning supplies.'
        },
        'basement': {
            type: 'room',
            description: 'A dimly lit, musty room filled with old furniture, storage boxes, and tools. The air is cool, and the walls are lined with exposed brick.'
        },
        'secret room': {
            type: 'room',
            description: 'A hidden room, accessible only by a secret passage. It contains mysterious artifacts, old documents, and a single desk covered in dust.'
        },
        // doors
        'grand archway': {
            type: 'door',
            access: ['foyer', 'hallway'],
            description: 'A wide archway framed with ornate molding, allowing the sound of footsteps to echo faintly between the foyer and hallway. A fine runner rug extends into the corridor, welcoming guests deeper into the mansion.'
        },
        'parlor door': {
            type: 'door',
            access: ['foyer', 'living room'],
            description: 'A pair of heavy oak doors with intricate carvings of vines and flowers. They swing open easily, revealing the warm and inviting living room beyond.'
        },
        'modest oak': {
            type: 'door',
            access: ['foyer', 'toilet'],
            description: 'A discreet wooden door tucked in a corner of the foyer. Simple in design, it blends in with the walls, leading quietly to the small guest toilet.'
        },
        'dining entrance': {
            type: 'door',
            access: ['foyer', 'dining room'],
            description: 'Tall double doors with brass handles, polished to a shine. The scent of food often drifts from behind them when the dining room is in use, hinting at the feast beyond.'
        },
        'chef\'s swing': {
            type: 'door',
            access: ['kitchen', 'dining room'],
            description: 'A large, swinging door, padded to reduce noise. It swings silently back and forth, allowing the kitchen staff to easily transport dishes between the kitchen and dining room.'
        },
        'larder hatch': {
            type: 'door',
            access: ['kitchen', 'pantry'],
            description: 'A small, creaky wooden door with iron hinges, leading to the pantry. It’s worn from years of use, often left ajar as fresh ingredients are constantly fetched for the kitchen.'
        },
        'cellar stairs': {
            type: 'door',
            access: ['basement', 'pantry'],
            description: 'A narrow stone staircase spirals down from the pantry into the cool, dark basement. The walls are lined with shelves, holding jars and preserves.'
        },
        'attic ladder': {
            type: 'door',
            access: ['hallway', 'attic'],
            description: 'A retractable wooden ladder hidden in the ceiling. When pulled down, it creaks ominously, allowing access to the dusty attic above.'
        },
        'craft door': {
            type: 'door',
            access: ['hallway', 'hobbies room'],
            description: 'A light wooden door with a small window, often covered in paint splatters or craft supplies. It leads into a room of creative chaos where hobbies are pursued.'
        },
        'guest’s welcome': {
            type: 'door',
            access: ['hallway', 'guest room'],
            description: 'A simple yet elegant door with a brass knocker. It gives an inviting air, ushering visitors into the cozy guest room beyond.'
        },
        'washroom entry': {
            type: 'door',
            access: ['hallway', 'bathroom'],
            description: 'A frosted glass door, providing privacy while still letting light through. It swings gently, revealing the shared bathroom beyond.'
        },
        'scholar\'s passage': {
            type: 'door',
            access: ['hallway', 'office'],
            description: 'A solid mahogany door with a brass handle, engraved with faint scholarly symbols.'
        },
        'master\'s threshold': {
            type: 'door',
            access: ['hallway', 'master bedroom'],
            description: 'A grand double door, featuring polished wood and gold accents. It opens into the luxurious master bedroom, offering comfort and privacy.'
        },
        'bathing nook': {
            type: 'door',
            access: ['master bedroom', 'ensuite bathroom'],
            description: 'A sliding door with frosted glass panes, separating the bedroom from the ensuite bathroom. The sound of running water can often be heard behind it.'
        },
        'spiralling stairs': {
            type: 'door',
            access: ['office', 'library'],
            description: 'A magnificent spiral staircase crafted from polished oak, with ornate wrought-iron railings spiraling upward.'
        },
        'lounge arch': {
            type: 'door',
            access: ['living room', 'library'],
            description: 'A wide arch framed by elegant wooden beams. Bookshelves line the wall beyond, offering easy access from the cozy living room to the expansive library.'
        },
        'garden view': {
            type: 'door',
            access: ['living room', 'conservatory'],
            description: 'French doors framed with ivy lead to the conservatory. The sunlight filters through the glass panes, offering a glimpse of the garden beyond.'
        },
        'garden gate': {
            type: 'door',
            access: ['conservatory', 'back yard'],
            description: 'A wrought-iron gate adorned with climbing roses. It swings open with a soft creak, leading from the glass-walled conservatory into the open back yard.'
        },
        'stone path arch': {
            type: 'door',
            access: ['back yard', 'garage'],
            description: 'A simple wooden gate along the stone path, separating the lush back yard from the functional garage. Moss grows on its hinges, adding to its rustic charm.'
        },
        'workshop hatch': {
            type: 'door',
            access: ['garage', 'basement'],
            description: 'A heavy trapdoor hidden beneath a workbench in the garage. When lifted, it reveals a ladder descending into the basement.'
        },
        'hidden passage': {
            type: 'door',
            access: ['basement', 'secret room'],
            description: 'A concealed door behind a shelf of wine barrels. It leads to the mansion’s secret room, known only to a select few, hidden deep beneath the house.'
        },
        'entrance door': {
            type: 'door',
            access: ['foyer door','outside'],
            description: {
                locked: 'A grand double door made of rich mahogany, adorned with intricate carvings and a polished brass handle. It is locked.',
                unlocked: 'A grand double door made of rich mahogany, adorned with intricate carvings and a polished brass handle. It is unlocked, your freedom awaits!'
            }
        },
        'business card': {
            state: 'idle',
            parent: 'myself',
            description: {
                idle: 'a business card with a phone number 555-3532'
            }
        },
        // Bedroom (Room)
        'bedroom': {
            state: 'entered',
            parent: null, // Rooms don't have a parent
            description: {
                entered: 'A small bedroom with a bed, a nightstand, and a door leading to the kitchen.'
            }
        },
        // Kitchen (Room)
        'kitchen': {
            state: 'locked',
            parent: null, // Rooms don't have a parent
            description: {
                locked: 'A kitchen. The door is locked from the bedroom.',
                unlocked: 'A clean kitchen with a fridge and a dining table.'
            }
        },
        // Door between Bedroom and Kitchen
        'kitchen door': {
            state: 'locked',
            between: ['bedroom','kitchen'], // Parent is bedroom (connected to it)
            description: {
                locked: 'The door is locked. You need a key to open it.',
                unlocked: 'The door is unlocked. You can go through'
            }
        },
        // Key in Bedroom
        'small key': {
            state: 'onTable',
            parent: 'bedroom', // Inside bedroom, on nightstand
            movable: true,
            description: {
                onTable: 'A small key is lying on the nightstand.',
                held: 'You are holding the small key.'
            }
        },
        // Nightstand in Bedroom
        'nightstand': {
            state: 'closed',
            parent: 'bedroom', // Inside bedroom
            description: {
                closed: 'A small nightstand with a drawer that can be opened.',
                open: 'The drawer is open. There is nothing inside.'
            }
        }
    },

    actions: [
        // Pick up key action
        {
            verb: /^(pick up|take|get)\s+key$/i,
            subject: 'key1',
            object: null,
            result: {
                newState: [
                    { id: 'key1', state: 'held' } // Update key state to 'held'
                ],
                message: 'You pick up the small key from the nightstand.'
            }
        },
        // Unlock door with key
        {
            verb: /^(unlock|open)\s+door\s+with\s+key$/i,
            subject: 'door2',
            object: 'key1',
            result: {
                newState: [
                    { id: 'door2', state: 'unlocked' } // Unlock the door
                ],
                message: 'You use the key to unlock the door to the kitchen.'
            }
        },
        // Open nightstand action
        {
            verb: /^(open)\s+nightstand$/i,
            subject: 'nightstand1',
            object: null,
            result: {
                newState: [
                    { id: 'nightstand1', state: 'open' } // Update nightstand state to 'open'
                ],
                message: 'You open the nightstand drawer. It is empty.'
            }
        },
        // Move from bedroom to kitchen
        {
            verb: /^(enter|go into|move into)\s+kitchen$/i,
            subject: 'kitchen',
            object: null,
            result: {
                newState: [
                    { id: 'kitchen', state: 'entered' },
                    { id: 'user', state: 'inKitchen' }
                ],
                message: 'You enter the kitchen. The room is clean and tidy.'
            }
        }
    ],

    // Win condition function: Door to the kitchen must be unlocked
    isWin: function() {
        return this.elements.kitchenDoor.state === 'unlocked'; // Win when kitchen door is unlocked
    }
};

export default function initState() {
    return state;
};