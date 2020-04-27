import {StoryEngine} from '../../StoryEngine';
import {Room} from '../Room';

describe('Living Room', () => {

  let engine;
  beforeEach(() => {
    engine = new StoryEngine();
    engine.state.isCrateOpen = true;
    engine.state.currentRoom = Room.Living;
  });

  describe('navigation', () => {
    it('Should allow navigation to the dining room to the west', () => {
      const response = engine.getResponseState('go west');
      expect(response.state.currentRoom).toBe(Room.Dining);
    });
    it('Should allow navigation to under the couch', () => {
      const response = engine.getResponseState('go under couch');
      expect(response.state.currentRoom).toBe(Room.UnderCouch);
    });
  });

  describe('room', () => {
    it('Lists objects', () => {
      const response = engine.getResponse('look');
      expect(response).toContain('couch');
      expect(response).toContain('TV');
      expect(response).toContain('toys');
      expect(response).toContain('dining');
    });
  });

  describe ('couch', () => {
    const noun = 'couch';

    it(`responds to look`, () => {
      expect(engine.getResponse(`look at ${noun}`)).toContain('soft');
    });
    it(`responds to smell`, () => {
      expect(engine.getResponse(`smell ${noun}`)).toContain('mommy');
    });
    it(`responds to taste`, () => {
      expect(engine.getResponse(`lick ${noun}`)).toContain('regret');
    });
    it(`responds to chew`, () => {
      expect(engine.getResponse(`chew ${noun}`)).toContain('soft');
    });
    it(`responds to think about`, () => {
      expect(engine.getResponse(`think about ${noun}`)).toContain('daddy');
    });
    it(`responds to push / open`, () => {
      expect(engine.getResponse(`push ${noun}`)).toContain('under');
    });
  });

  describe ('toy box', () => {
    const noun = 'toy box';

    it(`responds to look`, () => {
      expect(engine.getResponse(`look at ${noun}`)).toContain('toys');
    });
    it(`responds to smell`, () => {
      expect(engine.getResponse(`smell ${noun}`)).toContain('plastic');
    });
    it(`responds to taste`, () => {
      expect(engine.getResponse(`lick ${noun}`)).toContain('canvas');
    });
    it(`responds to chew`, () => {
      expect(engine.getResponse(`chew ${noun}`)).toContain('tough');
    });
    it(`responds to think about`, () => {
      expect(engine.getResponse(`think about ${noun}`)).toContain('squeaker');
    });
    it(`responds to push / open`, () => {
      expect(engine.getResponse(`push ${noun}`)).toContain('old box');
    });
  });

  describe ('TV', () => {
    const noun = 'TV';

    it(`responds to look`, () => {
      expect(engine.getResponse(`look at ${noun}`)).toContain('off');
    });
    it(`responds to smell`, () => {
      expect(engine.getResponse(`smell ${noun}`)).toContain('plastic');
    });
    it(`responds to taste`, () => {
      expect(engine.getResponse(`lick ${noun}`)).toContain('can\'t');
    });
    it(`responds to chew`, () => {
      expect(engine.getResponse(`chew ${noun}`)).toContain('can\'t');
    });
    it(`responds to think about`, () => {
      expect(engine.getResponse(`think about ${noun}`)).toContain('dog');
    });
    it(`responds to push / open`, () => {
      expect(engine.getResponse(`push ${noun}`)).toContain('can\'t');
    });
  });

  describe ('dining room', () => {
    const noun = 'dining room';

    it(`responds to look`, () => {
      expect(engine.getResponse(`look at ${noun}`)).toContain(noun);
    });
    it(`responds to smell`, () => {
      expect(engine.getResponse(`smell ${noun}`)).toContain('closer');
    });
    it(`responds to taste`, () => {
      expect(engine.getResponse(`lick ${noun}`)).toContain(`can't`);
    });
    it(`responds to chew`, () => {
      expect(engine.getResponse(`chew ${noun}`)).toContain(`can't`);
    });
    it(`responds to think about`, () => {
      expect(engine.getResponse(`think about ${noun}`)).toContain('beg');
    });
    it(`responds to push / open`, () => {
      expect(engine.getResponse(`push ${noun}`)).toContain(`can't`);
    });
  });
});
