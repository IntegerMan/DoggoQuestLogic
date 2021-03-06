import {StoryEngine} from '../../StoryEngine';
import {Room} from '../Room';

describe('On Chair', () => {

  let engine;
  beforeEach(() => {
    engine = new StoryEngine();
    engine.state.isCrateOpen = true;
    engine.state.currentRoom = Room.OnChair;
  });

  describe('navigation', () => {
    it('Should allow navigation to the office', () => {
      const response = engine.getResponseState('go down');
      expect(response.state.currentRoom).toBe(Room.Office);
    });
  });

  describe('room', () => {
    it('Lists objects', () => {
      const response = engine.getResponse('look');
      expect(response).toContain('outside');
      expect(response).toContain('yard');
      expect(response).toContain('office');
      expect(response).toContain('window');
      expect(response).toContain('chair');
    });
  });

  describe('crate', () => {
    it('Looks unpleasant', () => {
      expect(engine.getResponse('look at crate')).toContain('don\'t like it');
    });
    it('Smells better from inside', () => {
      expect(engine.getResponse('smell crate')).toContain('you need to be inside');
    });
    it(`Shouldn\'t respond to 'open crate`, () => {
      expect(engine.getResponse('open crate')).toContain('fine where it is');
    });
  });

  describe('window', () => {
    it('Can\t see from here', () => {
      expect(engine.getResponse('look window')).toContain('outside');
    });
    it('Smells like outside', () => {
      expect(engine.getResponse('smell window')).toContain('outside');
    });
  });

  describe('Chair', () => {
    it('Smell suggests chew', () => {
      expect(engine.getResponse('smell chair')).toContain('chew');
    });
    it('Taste suggests chew', () => {
      expect(engine.getResponse('taste chair')).toContain('chew');
    });
    it('Looks should be descriptive', () => {
      expect(engine.getResponse('look at chair')).toContain('rocking chair');
    });
    it('Eat should work', () => {
      expect(engine.getResponse('eat chair')).toContain('rip');
    });
    it('Take should complain about weight', () => {
      expect(engine.getResponse('get chair')).toContain('heavy');
    });
  });
});
