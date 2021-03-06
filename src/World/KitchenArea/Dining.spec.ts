import {StoryEngine} from '../../StoryEngine';
import {Room} from '../Room';

describe('Dining', () => {

  let engine: StoryEngine;
  beforeEach(() => {
    engine = new StoryEngine();
    engine.state.isCrateOpen = true;
    engine.state.currentRoom = Room.Dining;
  });

  describe('navigation', () => {
    it('Should allow navigation to the kitchen to the west', () => {
      const response = engine.getResponseState('go west');
      expect(response.state.currentRoom).toBe(Room.Kitchen);
    });
    it('Should allow navigation to the entryway to the north', () => {
      const response = engine.getResponseState('go north');
      expect(response.state.currentRoom).toBe(Room.Entryway);
    });
    it('Should allow navigation to the living room to the east', () => {
      const response = engine.getResponseState('go east');
      expect(response.state.currentRoom).toBe(Room.Living);
    });
    it('Should not allow navigation to the south', () => {
      const response = engine.getResponseState('go south');
      expect(response.state.currentRoom).toBe(Room.Dining);
      expect(response.responseText).toContain('shut');
    });
    it('Should not allow navigation onto the table', () => {
      const response = engine.getResponseState('jump up');
      expect(response.state.currentRoom).toBe(Room.Dining);
      expect(response.responseText).toContain('too tall');
    });
  });

  describe('room', () => {
    it('Lists objects', () => {
      const response = engine.getResponse('look');
      expect(response).toContain('door');
      expect(response).toContain('outside');
      expect(response).toContain('food');
      expect(response).toContain('table');
      expect(response).toContain('kitchen');
      expect(response).toContain('living');
      expect(response).toContain('entry');
    });
  });

  describe ('door', () => {
    const noun = 'door';

    it(`responds to look`, () => {
      expect(engine.getResponse(`look at ${noun}`)).toContain('outside');
    });
    it(`responds to smell`, () => {
      expect(engine.getResponse(`smell ${noun}`)).toContain('outside');
    });
    it(`responds to taste`, () => {
      expect(engine.getResponse(`lick ${noun}`)).toContain('tasty');
    });
    it(`responds to chew`, () => {
      expect(engine.getResponse(`chew ${noun}`)).toContain('tasty');
    });
    it(`responds to think about`, () => {
      expect(engine.getResponse(`think about ${noun}`)).toContain('go potty');
    });
    it(`responds to push / open`, () => {
      expect(engine.getResponse(`push ${noun}`)).toContain('daddy');
    });
  });

  describe ('water', () => {
    const noun = 'water';

    it(`responds to look`, () => {
      expect(engine.getResponse(`look at ${noun}`)).toContain('water');
    });
    it(`responds to smell`, () => {
      expect(engine.getResponse(`smell ${noun}`)).toContain('water');
    });
    it(`responds to taste`, () => {
      expect(engine.getResponse(`lick ${noun}`)).toContain('wet');
    });
    it(`responds to chew`, () => {
      expect(engine.getResponse(`chew ${noun}`)).toContain('drink');
    });
    it(`responds to think about`, () => {
      expect(engine.getResponse(`think about ${noun}`)).toContain('run');
    });
    it(`responds to push / open`, () => {
      expect(engine.getResponse(`push ${noun}`)).toContain('paw');
    });
  });

  describe ('table', () => {
    const noun = 'table';

    it(`responds to look`, () => {
      expect(engine.getResponse(`look at ${noun}`)).toContain('wood');
    });
    it(`responds to smell`, () => {
      expect(engine.getResponse(`smell ${noun}`)).toContain('wood');
    });
    it(`responds to taste`, () => {
      expect(engine.getResponse(`lick ${noun}`)).toContain('yucky');
    });
    it(`responds to chew`, () => {
      expect(engine.getResponse(`chew ${noun}`)).toContain('puppy');
    });
    it(`responds to think about`, () => {
      expect(engine.getResponse(`think about ${noun}`)).toContain('dinner');
    });
    it(`responds to push / open`, () => {
      expect(engine.getResponse(`push ${noun}`)).toContain('heavy');
    });
  });

  describe ('chair', () => {
    const noun = 'chair';

    it(`responds to look`, () => {
      expect(engine.getResponse(`look at ${noun}`)).toContain('wood');
    });
    it(`responds to smell`, () => {
      expect(engine.getResponse(`smell ${noun}`)).toContain('wood');
    });
    it(`responds to taste`, () => {
      expect(engine.getResponse(`lick ${noun}`)).toContain('yucky');
    });
    it(`responds to chew`, () => {
      expect(engine.getResponse(`chew ${noun}`)).toContain('coat');
    });
    it(`responds to think about`, () => {
      expect(engine.getResponse(`think about ${noun}`)).toContain('push');
    });
    it(`responds to push / open`, () => {
      expect(engine.getResponse(`push ${noun}`)).toContain('already');
    });
  });

  describe ('kitchen', () => {
    const noun = 'kitchen';

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
      expect(engine.getResponse(`think about ${noun}`)).toContain('crumb');
    });
    it(`responds to push / open`, () => {
      expect(engine.getResponse(`push ${noun}`)).toContain(`can't`);
    });
  });

  describe ('entryway', () => {
    const noun = 'entryway';

    it(`responds to look`, () => {
      expect(engine.getResponse(`look at ${noun}`)).toContain(noun);
    });
    it(`responds to smell`, () => {
      expect(engine.getResponse(`smell ${noun}`)).toContain('can\'t');
    });
    it(`responds to taste`, () => {
      expect(engine.getResponse(`lick ${noun}`)).toContain(`can't`);
    });
    it(`responds to chew`, () => {
      expect(engine.getResponse(`chew ${noun}`)).toContain(`can't`);
    });
    it(`responds to think about`, () => {
      expect(engine.getResponse(`think about ${noun}`)).toContain('place to be');
    });
    it(`responds to push / open`, () => {
      expect(engine.getResponse(`push ${noun}`)).toContain(`can't`);
    });
  });

  describe ('living room', () => {
    const noun = 'living room';

    it(`responds to look`, () => {
      expect(engine.getResponse(`look at ${noun}`)).toContain(noun);
    });
    it(`responds to smell`, () => {
      expect(engine.getResponse(`smell ${noun}`)).toContain('can\'t');
    });
    it(`responds to taste`, () => {
      expect(engine.getResponse(`lick ${noun}`)).toContain(`can't`);
    });
    it(`responds to chew`, () => {
      expect(engine.getResponse(`chew ${noun}`)).toContain(`can't`);
    });
    it(`responds to think about`, () => {
      expect(engine.getResponse(`think about ${noun}`)).toContain('TV');
    });
    it(`responds to push / open`, () => {
      expect(engine.getResponse(`push ${noun}`)).toContain(`can't`);
    });
  });

});
