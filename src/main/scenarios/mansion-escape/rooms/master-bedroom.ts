import { Action, GameDefinition, ItemVariable, PassageVariable, RoomVariable } from '../../../types';
import addAchievement from '../../../default/add-achievement.js';
import print from "../../../default/print.js";

const items:{ [key:string]: ItemVariable|RoomVariable|PassageVariable } = {
    'master bedroom': { type: 'room' },
    'lavish door': {
        type: 'passage',
        between: ['hallway', 'master bedroom'],
        allowedStates: ['opened','closed'],
        state: 'closed',
        synonyms: ['door']
    },
    'secret door': {
        type: 'passage',
        between: ['master bedroom', 'secret room'],
        allowedStates: ['opened','hidden'],
        state: 'hidden',
        synonyms: ['door']
    },
    'nightstand drawer': {
        type: 'item',
        location: 'master bedroom',
        state: 'locked',
        synonyms: ['drawer', 'nightstand', 'bedside drawer'],
    },
    'security badge': {
        type: 'item',
        location: 'nightstand drawer',
        canBeHeld: true,
        synonyms: ['badge']
    }
};

const actions:Action[] = [
    {
        input: /\b(?:unlock|open|unfasten|access)\s*(?:the\s*)?((?:nightstand|bedside)\s*)?(?:drawer|compartment)$/,
        conditions(_:GameDefinition, userId:string) {
            return [
                {item: userId, property: 'location', value: 'master bedroom', textId:'location-fail:user'},
                {item: 'nightstand drawer', property: 'state', value: 'locked', textId:'drawer is not locked'},
                {item: 'key', property: 'location', value: userId, textId:'location-fail:item'},
            ];
        },
        execute(_:string, gameDefinition:GameDefinition, userId:string) {
            print(gameDefinition, 'how to unlock the nightstand drawer');
        }
    },
    {
        input: /\b(?:unlock|open|unfasten|access)\s*(?:the\s*)?(?:nightstand|bedside)?\s*(?:drawer|compartment)\s*(?:using|with|by\s*using)?\s*(?:the\s*)?(?:small|tiny|little)\s*key\b/,
        conditions(_:GameDefinition, userId:string) {
            return [
                {item: userId, property: 'location', value: 'master bedroom', textId:'location-fail:user'},
                {item: 'nightstand drawer', property: 'state', value: 'locked', textId:'drawer is not locked'},
                {item: 'small key', property: 'location', value: userId, textId:'location-fail:item'},
            ];
        },
        execute(_:string, gameDefinition:GameDefinition, userId:string) {
            const { variables } = gameDefinition;
            const drawer = variables['nightstand drawer'] as ItemVariable;
            variables['nightstand drawer'] = { ...drawer, state: 'opened' };
            addAchievement(gameDefinition, userId, 'unlocked nightstand drawer');
            print(gameDefinition, 'unlocked nightstand drawer');
        }
    },
    {
        input: /\b(?:find|locate|look\s*for|search\s*for|discover)\s*(?:the\s*)?(?:secret\s*(?:room|passage|doorway|entrance|path|way)(?:\s*to\s*(?:the\s*)?room)?)\b/,
        conditions(_:GameDefinition, userId:string) {
            return [
                {item: userId, property: 'location', value: 'master bedroom', textId:'location-fail:user'},
                {item: 'cctv monitor', property: 'state', value: 'watched', textId:'waste of time'},
                {item: 'secret door', property: 'state', value: 'hidden', textId:'you already know where the secret door is'},
            ];
        },
        execute(_:string, gameDefinition:GameDefinition, userId:string) {
            const { variables } = gameDefinition;
            const door = variables['secret door'] as PassageVariable;
            variables['secret door'] = { ...door, state: 'opened' };
            addAchievement(gameDefinition, userId, 'found secret room');
            print(gameDefinition, 'found secret room');
        }
    }
];

const strings = {
    'master bedroom': 'A luxurious bedroom with a king-sized bed, ornate wooden furniture, a walk-in closet, and a grand view of the estate grounds.',
    'drawer is not locked': 'The drawer is not locked',
    'unlocked nightstand drawer': `You unlocked the nightstand drawer. There's a security badge inside.`,
    'you already know where the secret door is': `You already know where the secret door is`,
    'found secret room': 'You found the secret room!',
    'waste of time': 'This feels like a waste of time',
    'how to unlock the nightstand drawer': 'You need a key to unlock the nightstand drawer'
};

export {
    actions,
    items,
    strings,
}