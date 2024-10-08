import { jest, describe, expect } from '@jest/globals';

import handlePassage from '../../../docs/js/generic-actions/handle-passage.js';

describe('handlePassage', () => {
    it('should return "I don\'t know where the destination is." if the destination is not found', () => {
      const input = 'go to the unknown';
      const gameDefinition = { variables: { player1: { type: 'player', location: 'room1' }}, addAchievement: jest.fn() };
      const userId = 'player1';
  
      const result = handlePassage(input, gameDefinition, userId);
  
      expect(result).toBe('I don\'t know where the unknown is.');
    });

    it('should go from one room the other if the destination is a passage', () => {
      const input = 'go through the passage';
      const gameDefinition = {
        variables: {
            player1: { type: 'player', location: 'room1' },
            passage: { type: 'passage', between: ['room1', 'room2'] },
            room1: { type: 'room' },
            room2: { type: 'room' },
        },
        addAchievement: jest.fn()
      };
      const userId = 'player1';
  
      const result = handlePassage(input, gameDefinition, userId);
  
      expect(result).toBe('You entered the room2.');
    });

    it('should find the passage between the user location and the destination room', () => {
      const input = 'go to the room2';
      const gameDefinition = {
        variables: {
            player1: { type: 'player', location: 'room1' },
            passage1: { type: 'passage', between: ['room1', 'room2'] },
            passage2: { type: 'passage', between: ['room1', 'room3'] },
            room1: { type: 'room' },
            room2: { type: 'room' },
            room3: { type: 'room' },
        },
        addAchievement: jest.fn()
      };
      const userId = 'player1';
  
      const result = handlePassage(input, gameDefinition, userId);
  
      expect(result).toBe('You entered the room2.');
    });

    describe('open passages', () => {
        it('should find door already open if door has no state', () => {
            const input = 'open the door';
            const gameDefinition = {
              variables: {
                  player1: { type: 'player', location: 'room1' },
                  door: { type: 'passage', between: ['room1', 'room2'] },
                  room1: { type: 'room' },
                  room2: { type: 'room' },
              },
              addAchievement: jest.fn()
            };
            const userId = 'player1';
        
            const result = handlePassage(input, gameDefinition, userId);
        
            expect(result).toBe('The door is already open.');
          });

          it('should find door already open if door is already open', () => {
            const input = 'open the door';
            const gameDefinition = {
              variables: {
                  player1: { type: 'player', location: 'room1' },
                  door: { type: 'passage', state: 'opened', between: ['room1', 'room2'] },
                  room1: { type: 'room' },
                  room2: { type: 'room' },
              },
              addAchievement: jest.fn()
            };
            const userId = 'player1';
        
            const result = handlePassage(input, gameDefinition, userId);
        
            expect(result).toBe('The door is already open.');
          });

          it('should open door if door is closed', () => {
            const input = 'open the door';
            const gameDefinition = {
              variables: {
                  player1: { type: 'player', location: 'room1' },
                  door: { type: 'passage', state: 'closed', between: ['room1', 'room2'] },
                  room1: { type: 'room' },
                  room2: { type: 'room' },
              },
              addAchievement: jest.fn()
            };
            const userId = 'player1';
        
            const result = handlePassage(input, gameDefinition, userId);
        
            expect(result).toBe('The door is now open.');
          });
    });
  });