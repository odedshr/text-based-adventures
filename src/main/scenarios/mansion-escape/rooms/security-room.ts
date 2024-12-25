import { ItemVariable, GameDefinition, Variables, Attributes, PuzzlePiece } from '../../../types';
import print from '../../../default/print.js';
import addAchievement from '../../../default/add-achievement.js';

const securityRoom:PuzzlePiece = {
    actions: [
        {
            input: /\b(?:watch|view|check|see|look\s*at|access|examine|check)\s*(?:the\s*)?(?:cctv|security|camera)\s*(?:recording|footage|video|feed)\b/,
            conditions: (gameDefinition:GameDefinition, userId:string) => {
                const watched = (gameDefinition.variables.cctv as ItemVariable).state === 'watched';
                return [
                    {item: userId, property: 'location', value: 'security room', textId:'location-fail:user'},
                    {item: 'cctv', property: 'scrubbed', value: 'no', textId:'already scrubbed'},
                ];
            },
            execute: (gameDefinition:GameDefinition, userId:string,_:string) => {
                const { variables } = gameDefinition;
                const cctv = variables.cctv as ItemVariable;
                variables.cctv = { ...cctv, state: { ... cctv.state as Attributes, watched: 'yes' } };
                addAchievement(gameDefinition, userId, 'watched cctv');
                print(gameDefinition, 'watch cctv recording');
            }
        },
        {
            input: /\b(?:delete|remove|erase|discard|clear|scrub)\s*(?:the\s*)?(?:cctv\s*recording|cctv\s*footage|video\s*recording)\b/,
            conditions: (gameDefinition:GameDefinition, userId:string) => {
                const watched = (gameDefinition.variables.cctv as ItemVariable).state === 'watched';
                return [
                    {item: userId, property: 'location', value: 'security room', textId:'location-fail:user'},
                    {item: 'cctv', property: 'scrubbed', value: 'no', textId:'already scrubbed'},
                ];
            },
            execute: (gameDefinition:GameDefinition, userId:string,_:string) => {
                // TODO: DELETE CCTV AS THE LAST THING IN THE HOUSE
                const { variables } = gameDefinition;
                const cctv = variables.cctv as ItemVariable;
                variables.cctv = { ...cctv, state: { ... cctv.state as Attributes, scrubbed: 'yes' } };
                addAchievement(gameDefinition, userId, 'scrubbed cctv');
                print(gameDefinition, 'scrubbed cctv');
            }
        },
        {
            input: /\bput batteries in flashlight\b/,
            conditions: (gameDefinition:GameDefinition, userId:string) => [
                {item: 'flashlight', property: 'location', value: userId, textId:'location-fail:item'},
                {item: 'batteries', property: 'location', value: userId, textId:'location-fail:item'},
            ],
            execute: (gameDefinition:GameDefinition, userId:string,_:string) => {
                const { variables } = gameDefinition;
                const batteries = variables.batteries;
                variables.batteries = { ...batteries, location: 'flashlight'} as ItemVariable;
                print(gameDefinition,'batteries in flashlight');
                addAchievement(gameDefinition, userId, 'put batteries in flashlight');
            }
        },
        {
            input: /\bturn on flashlight\b/,
            conditions: (_:GameDefinition, userId:string) => [
                {item: 'flashlight', property: 'location', value: userId, textId:'location-fail:item'},
                {item: 'flashlight', property: 'state', value: 'off', textId:'flashlight not off'},
                {item: 'batteries', property: 'location', value: 'flashlight', textId:'need batteries'},
                {item: 'batteries', property: 'state', value: 'full', textId:'batteries empty'},
            ],
            execute: (gameDefinition:GameDefinition, userId:string,_:string) => {
                const { variables, startTimer } = gameDefinition;
                const flashlight = variables.flashlight;
                variables.flashlight = { ...flashlight, state: 'on'} as ItemVariable;
                print(gameDefinition, 'flashlight on');
                startTimer('batteryPower');
                addAchievement(gameDefinition, userId, 'used flashlight');
            },
        },
        {
            input: /\bturn off flashlight\b/,
            conditions: (gameDefinition:GameDefinition, userId:string) => [
                {item: 'flashlight', property: 'location', value: userId, textId:'location-fail:item'},
                {item: 'flashlight', property: 'state', value: 'on', textId:'flashlight not on'},
                {item: 'batteries', property: 'location', value: 'flashlight', textId:'need batteries'},
            ],
            execute: (gameDefinition:GameDefinition, userId:string,_:string) => {
                const { variables, stopTimer } = gameDefinition;
                const flashlight = variables.flashlight;
                variables.flashlight = { ...flashlight, state: 'off'} as ItemVariable;
                print(gameDefinition, 'flashlight off');
                stopTimer('batteryPower');
                addAchievement(gameDefinition, userId, 'used flashlight');
            },
        }
    ],
    variables: {
        'security room': { type: 'room' },
        'vault door': {
            type: 'passage',
            between: ['basement', 'security room'],
            allowedStates: ['locked', 'opened'],
            state: 'locked',
        },
        cctv: {
            type: 'item',
            location: 'security room',
            state: {
                watched: 'no',
                scrubbed: 'no',
            },
            synonyms: ['recording', 'surveillance tapes', 'footage', 'video']
        },
        flashlight: {
            type: 'item',
            location: 'security room',
            canBeHeld: true,
            state: 'off'
        },
    },
    strings: {
        'security room' (variables:Variables) {
            const flashlightPresent = (variables.flashlight as ItemVariable).location === 'security room';
            const scrubbed = ((variables.cctv as ItemVariable).state as Attributes).scrubbed === 'yes';
    
            return `The security room has a desk with multiple monitors showings different CCTV footages from every possible corner of the mansion.${
                scrubbed ? 'However, all the monitors shows still images as you paused the recording for a fixed time.' : `Dread fills you knowing that there's evidence of you breaking into the mansion.`
            }${
                flashlightPresent ? ` There's a flashlight on the desk.` : ''
            }`;
        },
        'vault door': 'The vault door is a large and well-constructed door, filled with security cameras and surveillance equipment. It is a must-see if you want to escape the mansion.',
        cctv: `4 monitors, showing various camera feeds from through the mansion.`,
        'watch cctv recording': `Checking out the security recording, you quickly find the recording of you and your partner breaking into the mansion and her knocking the vase on the back of your head.
        Seeing her face, you now recall her name - Lola. Rewinding the video further, you stumble on a video of Lola and Cartwright playing with a train set model in a room next to the master bedroom.
        They were a couple, and it seems she double-crossed you. Cartwright was probably growing suspicious of her so she just threw you under the bus to protect herself.`,
        'scrubbed cctv'(variables:Variables) {
            const partner = ((variables.cctv as ItemVariable).state as Attributes).watched==='yes' ? 'Lola' : 'your partner';
            return `You delete all the video footages of you and ${partner} breaking into the mansion.
            Wisely, you find a feature to pause the recording for the next hour as well, allowing you to move freely without creating further evidence.`},
            'already scrubbed': `You already scrubbed the cctv recording. Not much to see in it now`,
            'need batteries': 'You probably need to get batteries for this flashlight to work.',
            'batteries in flashlight': `You put the batteries in the flashlight, but you're wondering how much juice they actually have in them.`,
        flashlight: (variables:Variables) => `It's a handheld battery powered flashlight, ${(variables.batteries as ItemVariable).location==='flashlight' ? 'and it has batteries' : 'but it has no batteries'}.`,
        'flashlight on': `You turn on the flashlight. Let's see how long it would last.`,
        'flashlight off': `You turn off the flashlight. Smart thinking.`,
        'flashlight not on': 'The flashlight is already switched off.',
        'flashlight not off': 'The flashlight is already switched on.',
        'batteries empty': 'The batteries are dead.',
    }
}

export default securityRoom;