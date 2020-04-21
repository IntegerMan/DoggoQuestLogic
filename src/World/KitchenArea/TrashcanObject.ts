import {GameObjectBase} from '../GameObjectBase';
import {Room} from '../Room';

export class TrashcanObject extends GameObjectBase {
    constructor() {
        super('trashcan');

        this.smell = 'Smells an awful lot like food. I like food.';
        this.lick = 'Isn\'t it a bit boring to just lick the trash can when there\'s more interesting things inside of it?';
        this.eat = 'Your teeth are too small to puncture the trash can and there\'s a better way to get to the food.';
        this.think = 'This can of goodness is where the humans put food they don\'t want to give me.';
        this.pull = 'It would be far easier just to push it.';
        this.push = context => {
          context.addText('You push over the trash can and spill food all over the floor. It is GLORIOUS!');
          // TODO: actually modify game state
        }
    }

  matches(reduced: string, room: Room): boolean {
    return super.matches(reduced, room) ||
      reduced === 'trash' ||
      reduced === 'can' ||
      reduced === 'waste' ||
      reduced === 'wastebasket' ||
      reduced === 'bin';
  }
}
