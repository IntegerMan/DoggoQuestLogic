import {GameObjectBase} from '../GameObjectBase';
import {Room} from '../Room';
import {BackDoorObject} from './BackDoorObject';
import {BowlObject} from './BowlObject';
import {DiningChairObject} from './DiningChairObject';
import {TableObject} from './TableObject';

export class DiningObject extends GameObjectBase {
    constructor(private room: Room) {
        super('dining');

        this.children = [
            new TableObject(room),
            new DiningChairObject(room),
            new BackDoorObject(room),
            new BowlObject(room),
        ];

        if (this.room === Room.Dining) {
          this.smell = 'It smells like a mixture of old food and the air from outside.';
          this.lick = `You're not going to just lick the floor. You need to be more specific!`;
          this.eat = this.CantBeSeriousMessage;
          this.pull = this.CantBeSeriousMessage;
          this.push = this.CantBeSeriousMessage;
        } else {
          this.smell = `You can't really smell all the details from here; you'll need to get closer.`;
          this.lick = this.TooFarMessage;
          this.push = this.TooFarMessage;
          this.pull = this.TooFarMessage;
          this.eat = this.TooFarMessage;
        }

        this.think = 'The dining room is where I beg daddy for food while mommy and daddy are eating at the table.';
    }

  matches(reduced: string, room: Room): boolean {
    return super.matches(reduced, room) || (room === Room.Entryway && reduced === 'room');
  }
}
