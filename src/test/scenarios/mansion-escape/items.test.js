import { describe, expect } from "@jest/globals";

import { strings, variables } from '../../../../docs/js/scenarios/mansion-escape/index.js';

describe('Items', () => {
    it('should have a description for each item', async () => {
        Object.keys(variables).forEach(key => {
            if (!strings[key]) {
                console.error(`No description for ${key}`);
            }
            expect(strings[key]).not.toBeFalsy();
        });
    });
});