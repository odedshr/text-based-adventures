const items = {
    'blue door': {
        type: 'passage',
        between: ['hallway', 'office'],
        allowedStates: ['closed', 'opened'],
        state: 'closed',
        synonyms: ['door']
    },
};
const actions = [];
const strings = {
    'modest oak': 'A discreet wooden door tucked in a corner of the foyer. Simple in design, it blends in with the walls, leading quietly to the small guest toilet.',
    'craft door': 'A light wooden door with a small window, often covered in paint splatters or craft supplies. It leads into a room of creative chaos where hobby are pursued.',
    'scholar\'s passage': 'A solid mahogany door with a brass handle, engraved with faint scholarly symbols.',
    'master\'s threshold': 'A grand double door, featuring polished wood and gold accents. It opens into the luxurious master bedroom, offering comfort and privacy.',
    'stone path arch': 'A simple wooden gate along the stone path, separating the lush backyard from the functional garage. Moss grows on its hinges, adding to its rustic charm.',
    'workshop hatch': 'A heavy trapdoor hidden beneath a workbench in the garage. When lifted, it reveals a ladder descending into the basement.',
};
export { actions, items, strings };
