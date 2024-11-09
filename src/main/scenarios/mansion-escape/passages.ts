import { PassageVariable } from '../../types.js';

const items:{[key:string]:PassageVariable} = {
    'grand archway': {
        type: 'passage',
        between: ['foyer', 'hallway'],
        allowedStates: ['opened'],
        state: 'opened',
    },
    'parlor door': {
        type: 'passage',
        between: ['foyer', 'living room'],
        allowedStates: ['opened'],
        state: 'opened',
    },
    'toilet door': {
        type: 'passage',
        between: ['foyer', 'toilet'],
        allowedStates: ['opened'],
        state: 'opened',
    },
    'dining entrance': {
        type: 'passage',
        between: ['foyer', 'dining room'],
        allowedStates: ['opened'],
        state: 'opened',
    },
    'chef\'s swing': {
        type: 'passage',
        between: ['kitchen', 'dining room'],
        allowedStates: ['opened'],
        state: 'opened',
    },
    'larder hatch': {
        type: 'passage',
        between: ['kitchen', 'pantry'],
        allowedStates: ['opened'],
        state: 'opened',
    },
    'cellar stairs': {
        type: 'passage',
        between: ['basement', 'pantry'],
        allowedStates: ['opened'],
        state: 'opened',
    },
    'attic ladder': {
        type: 'passage',
        between: ['hallway', 'attic'],
        synonyms: ['ladder'],
    },
    'bedroom door': {
        type: 'passage',
        between: ['hallway', 'guest room'],
        allowedStates: ['closed', 'opened'],
        state: 'closed',
    },
    'washroom entry': {
        type: 'passage',
        between: ['hallway', 'bathroom'],
        allowedStates: ['opened'],
        state: 'opened',
    },
    'blue door': {
        type: 'passage',
        between: ['hallway', 'office'],
        allowedStates: ['closed', 'opened'],
        state: 'closed',
        synonyms: ['door']
    },
    'bathing nook': {
        type: 'passage',
        between: ['master bedroom', 'ensuite bathroom'],
        allowedStates: ['opened','closed'],
        state: 'closed',
    },
    'secret door': {
        type: 'passage',
        between: ['master bedroom', 'secret room'],
        allowedStates: ['opened','hidden'],
        state: 'hidden',
        synonyms: ['door']
    },
    'spiralling stairs': {
        type: 'passage',
        between: ['office', 'library'],
        synonyms: ['stairs']
    },
    'lounge arch': {
        type: 'passage',
        between: ['living room', 'library'],
        allowedStates: ['opened'],
        state: 'opened',
    },
    'garden view': {
        type: 'passage',
        between: ['living room', 'conservatory'],
        allowedStates: ['opened'],
        state: 'opened',
    },
    'garden gate': {
        type: 'passage',
        between: ['conservatory', 'backyard'],
        allowedStates: ['opened'],
        state: 'opened',
    },
    'stone path arch': {
        type: 'passage',
        between: ['backyard', 'garage'],
        allowedStates: ['opened'],
        state: 'opened',
    },
    'workshop hatch': {
        type: 'passage',
        between: ['garage', 'basement'],
        allowedStates: ['opened'],
        state: 'opened',
    },
    'vault door': {
        type: 'passage',
        between: ['basement', 'security room'],
        allowedStates: ['hidden', 'opened'],
        state: 'hidden',
    },
    'entrance door': {
        state: 'locked',
        allowedStates: ['locked', 'closed', 'opened'],
        type: 'passage',
        between: ['foyer door','outside'],
    }
};

const actions = [];

const strings = {
    'guest room': 'A cozy room with a queen-sized bed, a small wardrobe, and a vanity. It is warmly decorated, with a welcoming atmosphere for visitors.',
    'grand archway': 'A wide archway framed with ornate molding, allowing the sound of footsteps to echo faintly between the foyer and hallway. A fine runner rug extends into the corridor, welcoming guests deeper into the mansion.',
    'parlor door': 'A pair of heavy oak doors with intricate carvings of vines and flowers. They swing open easily, revealing the warm and inviting living room beyond.',
    'modest oak': 'A discreet wooden door tucked in a corner of the foyer. Simple in design, it blends in with the walls, leading quietly to the small guest toilet.',
    'dining entrance': 'Tall double doors with brass handles, polished to a shine. The scent of food often drifts from behind them when the dining room is in use, hinting at the feast beyond.',
    'chef\'s swing': 'A large, swinging door, padded to reduce noise. It swings silently back and forth, allowing the kitchen staff to easily transport dishes between the kitchen and dining room.',
    'larder hatch': 'A small, creaky wooden door with iron hinges, leading to the pantry. It’s worn from years of use, often left ajar as fresh ingredients are constantly fetched for the kitchen.',
    'cellar stairs': 'A narrow stone staircase spirals down from the pantry into the cool, dark basement. The walls are lined with shelves, holding jars and preserves.',
    'attic ladder': 'A retractable wooden ladder hidden in the ceiling. When pulled down, it creaks ominously, allowing access to the dusty attic above.',
    'craft door': 'A light wooden door with a small window, often covered in paint splatters or craft supplies. It leads into a room of creative chaos where hobby are pursued.',
    'guest\'s welcome': 'A simple yet elegant door with a brass knocker. It gives an inviting air, ushering visitors into the cozy guest room beyond.',
    'washroom entry': 'A frosted glass door, providing privacy while still letting light through. It swings gently, revealing the shared bathroom beyond.',
    'scholar\'s passage': 'A solid mahogany door with a brass handle, engraved with faint scholarly symbols.',
    'master\'s threshold': 'A grand double door, featuring polished wood and gold accents. It opens into the luxurious master bedroom, offering comfort and privacy.',
    'bathing nook': 'A sliding door with frosted glass panes, separating the bedroom from the ensuite bathroom. The sound of running water can often be heard behind it.',
    'spiralling stairs': 'A magnificent spiral staircase crafted from polished oak, with ornate wrought-iron railings spiraling upward.',
    'lounge arch': 'A wide arch framed by elegant wooden beams. Bookshelves line the wall beyond, offering easy access from the cozy living room to the expansive library.',
    'garden view': 'French doors framed with ivy lead to the conservatory. The sunlight filters through the glass panes, offering a glimpse of the garden beyond.',
    'garden gate': 'A wrought-iron gate adorned with climbing roses. It swings open with a soft creak, leading from the glass-walled conservatory into the open backyard.',
    'stone path arch': 'A simple wooden gate along the stone path, separating the lush backyard from the functional garage. Moss grows on its hinges, adding to its rustic charm.',
    'workshop hatch': 'A heavy trapdoor hidden beneath a workbench in the garage. When lifted, it reveals a ladder descending into the basement.',
    'hidden passage': 'A concealed door behind a shelf of wine barrels. It leads to the mansion’s secret room, known only to a select few, hidden deep beneath the house.',
};

export {
    actions,
    items,
    strings
};