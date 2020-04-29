import {StoryEngine} from './StoryEngine';
import {Room} from './World/Room';

describe('Story', () => {

  let engine;
  beforeEach(() => {
    engine = new StoryEngine();
    engine.state.isCrateOpen = false;
    engine.state.currentRoom = Room.InCrate;
  });

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
});
