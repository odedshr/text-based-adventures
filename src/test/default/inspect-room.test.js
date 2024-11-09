import processMethod from '../../../docs/js/processor.js';
import inspectRoomActions from '../../../docs/js/default/inspect-room.js';

describe('inspect room', () => {
    ['attic',
    //  'backyard',
    //  'bathroom',
    //  'conservatory',
    //  'dining room',
    //  'ensuite bathroom',
    //  'foyer',
    //  'garage',
    //  'guest room',
    //  'hallway',
    //  'hobby room',
    //  'kitchen',
    //  'library',
    //  'living room',
    //  'master bedroom',
    //  'office',
    //  'pantry',
    //  'secret room',
    //  'security room',
     'toilet'].forEach(location => it(`should describe the ${location}`, async () => shouldDescribeTheRoom(location)));
});

async function shouldDescribeTheRoom(location) {
    const { actions, items, strings } = await import (`../../../docs/js/scenarios/mansion-escape/rooms/${location.replace(/ /g, '-')}.js`);
    const gameDefinition = {
        variables: { ...items, user: { location } },
        actions: [...inspectRoomActions, ...actions ],
        strings
    };
    await processMethod('look around', gameDefinition, 'user');

    const expected = gameDefinition.strings[location]
    expect(gameDefinition.variables.console.value).toBe((typeof expected === 'function') ? expected(gameDefinition.variables) : expected);
}