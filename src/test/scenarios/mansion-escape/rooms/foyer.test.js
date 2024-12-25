import { describe } from "@jest/globals";
import processMethod from '../../../../../docs/js/processor.js';
import initGame from '../../../../../docs/js/game-generator.js';

const finaleTextId = {
    //`${cctv}-${safe}-${portrait}-${vase}-${ledger}`
    'yes-yes-floor-yes-user': 'finished ledger cctv fingerprints',
    'yes-yes-floor-yes-safe': 'finished ledger cctv fingerprints',
    'yes-yes-floor-no-user': 'finished ledger cctv fingerprints',
    'yes-yes-floor-no-safe': 'finished ledger cctv fingerprints',
    'yes-yes-wall-yes-user': 'finished ledger cctv fingerprints safe',
    'yes-yes-wall-yes-safe': 'finished ledger cctv fingerprints safe',
    'yes-yes-wall-no-user': 'finished ledger cctv fingerprints safe',
    'yes-yes-wall-no-safe': 'finished ledger cctv fingerprints safe',
    'yes-no-floor-yes-user': 'finished cctv',
    'yes-no-floor-yes-safe': 'finished cctv',
    'yes-no-floor-no-user': 'finished cctv',
    'yes-no-floor-no-safe': 'finished cctv',
    'yes-no-wall-yes-user': 'finished cctv safe',
    'yes-no-wall-yes-safe': 'finished cctv safe',
    'yes-no-wall-no-user': 'finished cctv safe',
    'yes-no-wall-no-safe': 'finished cctv safe',
    'no-yes-floor-yes-user': 'finished',
    'no-yes-floor-yes-safe': 'finished',
    'no-yes-floor-no-user': 'finished',
    'no-yes-floor-no-safe': 'finished',
    'no-yes-wall-yes-user': 'finished safe',
    'no-yes-wall-yes-safe': 'finished safe',
    'no-yes-wall-no-user': 'finished safe',
    'no-yes-wall-no-safe': 'finished safe',
    'no-no-floor-yes-user': 'finished',
    'no-no-floor-yes-safe': 'finished',
    'no-no-floor-no-user': 'finished',
    'no-no-floor-no-safe': 'finished',
    'no-no-wall-yes-user': 'finished safe',
    'no-no-wall-yes-safe': 'finished safe',
    'no-no-wall-no-user': 'finished safe',
    'no-no-wall-no-safe': 'finished safe'
};

describe('foyer', () => {
    it('should describe the room', async () => {
        const puzzle = await import('../../../../../docs/js/scenarios/mansion-escape/index.js');
        const gameDefinition = puzzle.default;

        gameDefinition.variables.user = { location: 'foyer' };

        await processMethod('look around', gameDefinition, 'user');
        expect(gameDefinition.variables.console.value).toBe(gameDefinition.strings.foyer(gameDefinition.variables));
    });

    it('should handle all finale scenarios', async () => {
        const scenarios = [];

        ['yes','no'].forEach(scrubbed=>
            ['yes','no'].forEach(fingerprints=>
                ['floor','wall'].forEach(placement=>
                    ['yes','no'].forEach(glued=>
                        ['user','safe'].forEach(async location => {
                            const puzzle = await import('../../../../../docs/js/scenarios/mansion-escape/index.js');
                            const gameDefinition = initGame(puzzle.default);
                            gameDefinition.variables['user'] = { location: 'foyer' };
                    
                            // timer isn't being used and leaving it running will prevent to finish if there's an error
                            gameDefinition.stopTimer('countdown');
                            gameDefinition.variables['entrance door'].state = 'opened';
                    
                            scenarios.push({
                                gameDefinition, cctv: scrubbed, safe: fingerprints, portrait: placement, vase: glued, ledger: location
                            });
                        })
                    )
                )
            )
        );
        
        scenarios.forEach(async ({gameDefinition, cctv, safe, portrait, vase, ledger}) => {
            const { strings } = gameDefinition;
            let expectedTextId = finaleTextId[`${cctv}-${safe}-${portrait}-${vase}-${ledger}`];
            if (expectedTextId==='finished ledger cctv fingerprints safe') {
                // if any element is missing then there's no point to check ledger
                expectedTextId = 'finished cctv fingerprints safe';
            }
            if (!strings[expectedTextId]) {
                console.log(expectedTextId);
            }

            await processMethod('leave mansion', gameDefinition, 'user');
            expect(gameDefinition.variables.console.value).toBe(strings[expectedTextId]);
        });
    });
})