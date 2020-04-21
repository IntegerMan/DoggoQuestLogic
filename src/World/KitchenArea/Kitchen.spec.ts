import {StoryEngine} from '../../StoryEngine';
import {Room} from '../Room';

describe('Kitchen', () => {

  let engine: StoryEngine;
  beforeEach(() => {
    engine = new StoryEngine();
    engine.state.isCrateOpen = true;
    engine.state.currentRoom = Room.Kitchen;
  });

  describe('navigation', () => {
    it('Should allow navigation to the dining room to the east', () => {
      const response = engine.getResponseState('go east');
      expect(response.state.currentRoom).toBe(Room.Dining);
    });
  });

  describe('room', () => {
    it('Lists objects', () => {
      const response = engine.getResponse('look');
      expect(response).toContain('crumb');
      expect(response).toContain('trash');
      expect(response).toContain('counter');
      expect(response).toContain('dining');
    });
  });


  describe ('food', () => {
    const noun = 'food';

    it(`responds to look`, () => {
      expect(engine.getResponse(`look at ${noun}`)).toContain('daddy');
    });
    it(`responds to smell`, () => {
      expect(engine.getResponse(`smell ${noun}`)).toContain('appetizing');
    });
    it(`responds to taste`, () => {
      expect(engine.getResponse(`lick ${noun}`)).toContain('tastes like');
    });
    it(`responds to chew`, () => {
      expect(engine.getResponse(`chew ${noun}`)).toContain('could be better');
    });
    it(`responds to think about`, () => {
      expect(engine.getResponse(`think about ${noun}`)).toContain('wish');
    });
    it(`responds to push / open`, () => {
      expect(engine.getResponse(`push ${noun}`)).toContain('paw');
    });
  });

  describe ('crumb', () => {
    const noun = 'crumb';

    it(`responds to look`, () => {
      expect(engine.getResponse(`look at ${noun}`)).toContain('find');
    });
    it(`responds to smell`, () => {
      expect(engine.getResponse(`smell ${noun}`)).toContain('find');
    });
    it(`responds to taste`, () => {
      expect(engine.getResponse(`smell ${noun}`)).toContain('find');
    });
    it(`responds to chew`, () => {
      expect(engine.getResponse(`chew ${noun}`)).toContain('find');
    });
    it(`responds to think about`, () => {
      expect(engine.getResponse(`think about ${noun}`)).toContain('best');
    });
    it(`responds to push / open`, () => {
      expect(engine.getResponse(`push ${noun}`)).toContain('find');
    });
  });

  describe ('trash can', () => {
    const noun = 'trash can';

    it(`responds to look`, () => {
      expect(engine.getResponse(`look at ${noun}`)).toContain('trash');
    });
    it(`responds to smell`, () => {
      expect(engine.getResponse(`smell ${noun}`)).toContain('food');
    });
    it(`responds to taste`, () => {
      expect(engine.getResponse(`smell ${noun}`)).toContain('boring');
    });
    it(`responds to chew`, () => {
      expect(engine.getResponse(`chew ${noun}`)).toContain('not the way');
    });
    it(`responds to think about`, () => {
      expect(engine.getResponse(`think about ${noun}`)).toContain('food');
    });
    it(`responds to push / open`, () => {
      expect(engine.getResponse(`push ${noun}`)).toContain('knocked over');
    });
  });

  describe ('counter', () => {
    const noun = 'counter';

    it(`responds to look`, () => {
      expect(engine.getResponse(`look at ${noun}`)).toContain('counter');
    });
    it(`responds to smell`, () => {
      expect(engine.getResponse(`smell ${noun}`)).toContain('crumb');
    });
    it(`responds to taste`, () => {
      expect(engine.getResponse(`smell ${noun}`)).toContain('crumb');
    });
    it(`responds to chew`, () => {
      expect(engine.getResponse(`chew ${noun}`)).toContain('can\'t');
    });
    it(`responds to think about`, () => {
      expect(engine.getResponse(`think about ${noun}`)).toContain('food');
    });
    it(`responds to push / open`, () => {
      expect(engine.getResponse(`push ${noun}`)).toContain('heavy');
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
      expect(engine.getResponse(`smell ${noun}`)).toContain(`can't`);
    });
    it(`responds to chew`, () => {
      expect(engine.getResponse(`chew ${noun}`)).toContain(`can't`);
    });
    it(`responds to think about`, () => {
      expect(engine.getResponse(`think about ${noun}`)).toContain('bowl');
    });
    it(`responds to push / open`, () => {
      expect(engine.getResponse(`push ${noun}`)).toContain(`can't`);
    });
  });
});
