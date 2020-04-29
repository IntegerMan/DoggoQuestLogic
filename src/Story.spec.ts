import {StoryEngine} from './StoryEngine';
import {Room} from './World/Room';

describe('Story', () => {

  let engine;
  beforeEach(() => {
    engine = new StoryEngine();
    engine.state.isCrateOpen = false;
    engine.state.currentRoom = Room.InCrate;
  });

  describe('Time', () => {
    it('Should not advance time before dog leaves crate', () => {
      const response = engine.handleCommands([
        'go north',
        'look at blanket',
        'smell blanket'
      ]);

      expect(response.timeAdvanced).toBe(0);
    });

    it('Should advance time after dog leaves crate', () => {
      const response = engine.handleCommands([
        'open door',
        'go north',
        'go east'
      ]);

      expect(response.timeAdvanced).toBe(1);
    });

    it('Should restart the timer after running the restart verb', () => {
      const response = engine.handleCommands([
        'open door',
        'go north',
        'go east',
        'restart'
      ]);

      expect(response.timeAdvanced).toBe(0);
      expect(response.isCrateOpen).toBe(false);
      expect(response.score).toBe(0);
      expect(response.currentRoom).toBe(Room.InCrate);
    });

    it('Should run out of time after enough moves', () => {
      const response = engine.handleCommands([
        'open door',
        'go north',
        'go east',
        'look stairs',
        'look gate',
        'push gate',
        'smell gate',
        'go south',
        'look table',
        'go east',
        'smell',
        'smell crumb',
        'look at crumb',
        'eat crumb',
        'drink from bowl',
        'west',
        'w',
        'look toy box',
        'smell TV',
        'go under couch',
        'look at couch',
        'look at darkness',
        'smell darkness',
        'look at squeaker',
        'squeak squeaker'
      ]);

      // TODO: expect(response.timeAdvanced).toBe(20);
      // TODO: expect(response.isGameOver).toBe(true);
    });
  });


});
