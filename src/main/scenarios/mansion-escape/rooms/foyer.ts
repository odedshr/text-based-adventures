import { ItemVariable, Action, RoomVariable, PassageVariable, GameDefinition, Variable, Variables, PlayerVariable, Attributes } from '../../../types.js';
import addAchievement from '../../../default/add-achievement.js';
import isInRootLocation from '../../../default/is-in-root-location.js';
import print from '../../../default/print.js';

const items:{[key:string]:ItemVariable|RoomVariable|PassageVariable } = {
    'foyer': { type: 'room' },
    'grand archway': {
        type: 'passage',
        between: ['foyer', 'hallway'],
        allowedStates: ['opened'],
        state: 'opened',
    },
    'entrance door': {
        state: 'locked',
        allowedStates: ['locked', 'closed', 'opened'],
        type: 'passage',
        synonyms: ['front door','main door', 'mansion door'],
        between: ['foyer','outside'],
    },
};

const actions:Action[] = [
    {
        input: /\bunlock main door using master key\b/,
        conditions: (_, userId) => [
            { item: userId, property: 'location', value: 'foyer', textId:'location-fail:user'},
            { item: 'key', property: 'location', value: userId, textId:'location-fail:item'},
            { item: 'entrance door', property: 'state', value: 'locked', textId:'door is not locked'},
        ],
        execute: (_:string, gameDefinition:GameDefinition, userId:string) => {
            const { variables } = gameDefinition;
            const entranceDoor = variables['entrance door'];
            variables['entrance door'] = { ...entranceDoor, state: 'opened' } as PassageVariable;
            addAchievement(gameDefinition, userId, 'unlocked main door');
            print(gameDefinition, 'unlocked main door');
        },
    },
    {
        input: /\b(exit|step outside|leave mansion)\b/,
        conditions: (_, userId) => [
            { item: userId, property: 'location', value: 'foyer', textId:'location-fail:user'},
            { item: 'entrance door', property: 'state', value: 'opened', textId:'door is locked'},
        ],
        execute: (_:string, gameDefinition:GameDefinition, userId:string) => {
            const { variables } = gameDefinition;
            const entranceDoor = variables['entrance door'];
            variables['entrance door'] = { ...entranceDoor, state: 'opened' } as PassageVariable;
            variables[userId] = { ...variables[userId], location: 'outside' } as PlayerVariable;
        },
    } 
];

const finishedStrings:{[key:string]:string} = {
    'finished': `You flee the mansion.
        Shortly after, Cartwright returns home and, noticing the tempered safe, he checks the surveillance tapes and sees you.
        You are arrested and sent to prison.`,
    'finished cctv': `You flee the mansion.
        Shortly after, Cartwright returns home and, noticing the tempered safe, raises the alarm.
        The surveillance tapes are scrubbed off and Cartwright checks the safe for fingerprints and soon after he's on your tail.
        You are arrested and sent to prison.`,
    'finished safe': `You flee the mansion.
        Shortly after, Cartwright returns home and, noticing the broken safe, he checks the surveillance tapes and sees you.
        You are arrested and sent to prison.`,
    'finished cctv safe': `You flee the mansion.
        Shortly after, Cartwright returns home and, noticing the broken vase, raises the alarm.
        The surveillance tapes are scrubbed off and Cartwright checks the safe for fingerprints and soon after he's on your tail.
        You are arrested and sent to prison.`,
    'finished ledger cctv': `You flee the mansion.
        Shortly after, Cartwright returns home and, noticing the broken vase, he checks the surveillance tapes which were scrubbed of.
        He checks the safe for fingerprints and soon after he's on your tail.
        He hunts you down and your body is now rests in an unmarked grave. You haven't been able to use the ledger to incriminate Cartwright`,
    'finished cctv fingerprints': `You flee the mansion.
        Shortly after, Cartwright returns home and, noticing the tempered safe, raises the alarm.
        Soon enough you are apprehended by a police blockade.
        Since the surveillance tapes were scrubbed of, Cartwright checked the safe for fingerprints and soon after Lola is arrested as well.`,
    'finished cctv fingerprints safe': `You flee the mansion.
        Shortly after, Cartwright returns home and, noticing the broken vase, raises the alarm.
        Soon enough you are apprehended by a police blockade.
        Since the surveillance tapes were scrubbed of, Cartwright checked the safe for fingerprints and soon after Lola is arrested as well.`,
    'finished cctv fingerprints safe vase': `You flee the mansion.
        After some time Cartwright notices the missing ledger. He checks the surveillance tapes which were scrubbed of.
        He checks the safe for fingerprints and find Lola, who is shortly after apprehended.
        Shame though, you haven't achieved what you came for.`,
    'finished ledger cctv fingerprints': `You flee the mansion.
        Shortly after, Cartwright returns home and, noticing the tempered safe, raises the alarm.
        Soon enough you are apprehended by a police blockade.
        Since the surveillance tapes were scrubbed of, Cartwright checked the safe for fingerprints and soon after Lola is arrested as well.`,
    'finished ledger cctv safe vase': `You flee the mansion.
        After some time Cartwright notices the missing ledger. He checks the surveillance tapes which were scrubbed of.
        He checks the safe for fingerprints and soon after he's on your tail.
        He hunts you down and your body is now rests in an unmarked grave. You haven't been able to use the ledger to incriminate Cartwright`,
    'finished ledger safe vase': `You flee the mansion.
        After some time Cartwright notices the missing ledger. He checks the surveillance tapes and sees you.
        He hunts you down and your body is now rests in an unmarked grave. You haven't been able to use the ledger to incriminate Cartwright`,
    'finished cctv safe vase': `You flee the mansion.
        Hopefully, Cartwright will never suspect of your intrusion.
        Shame though, you haven't achieved what you came for.`,
    'finished ledger cctv fingerprints safe vase': `You flee the mansion.
        After some time Cartwright notices the missing ledger. He checks the surveillance tapes which were scrubbed of.
        He checks the safe for fingerprints and find Lola, who is shortly after apprehended.
        You manage to use the ledger to incriminate Cartwright. Good Job!`,
        
    // 'ledger': => finished,
    // 'vase': => finished,
    // 'cctv fingerprints vase => cctv fingerprints',
    // 'cctv vase => cctv',
    // 'safe vase': => finished
    // 'fingerprints safe => safe',
    // 'fingerprints safe vase => safe vase',
    // 'fingerprints => finished',
    // 'fingerprints vase => finished',
    // 'ledger vase => ledger': ``,
    // 'ledger safe': => 'safe',
    // 'ledger cctv fingerprints vase => ledger cctv fingerprints',
    // 'ledger cctv vase => ledger cctv',
    // 'ledger cctv safe': => cctv safe
    // 'ledger fingerprints safe => ledger safe',
    // 'ledger fingerprints safe vase => ledger safe vase',
    // 'ledger fingerprints => ledger',
    // 'ledger fingerprints vase => ledger',  
    // 'ledger cctv fingerprints safe vase': => 'ledger cctv fingerprints safe',
};

function getFinaleString(variables:Variables) {
    const cctv = ((variables.cctv as ItemVariable).state as Attributes).scrubbed === 'yes';
    const fingerprints = cctv && ((variables.safe as ItemVariable).state as Attributes).fingerprints === 'yes';
    const safe = ((variables.portrait as ItemVariable).state as Attributes).placement === 'wall';
    const vase = safe && (variables.vase as ItemVariable).state === 'glued';
    const ledger = (cctv && fingerprints) && (safe && vase) && isInRootLocation(variables, 'ledger', 'outside');
    const sum = `finished${ledger? ' ledger': ''}${cctv? ' cctv': ''}${fingerprints? ' fingerprints': ''}${safe? ' safe': ''}${vase? ' vase': ''}`;

    return finishedStrings[sum];
}

const strings = {
    foyer: (variables:Variables) => `The grand entrance to the mansion with a sweeping staircase, a chandelier, and a large rug.
     A coat stand and an empty umbrella holder are by the door.`,
    'grand archway': 'A wide archway framed with ornate molding, allowing the sound of footsteps to echo faintly between the foyer and hallway.',
    'entrance door': (variables:Variables) =>  `A pair of heavy oak doors with intricate carvings of vines and flowers. 
    ${ (variables['entrance door'] as ItemVariable).state === 'locked' ? 'Alas, the door is locked.' : 'The door is not locked. Your freedom awaits.' }`,
    'door is locked': 'The door is locked.',
    'door is not locked': 'The door is not locked.',
    'unlocked main door': 'You unlock the main door.',
    'left mansion': getFinaleString,
    ...finishedStrings
}

export {
    actions,
    items,
    strings,
}