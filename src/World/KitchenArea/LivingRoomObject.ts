import {GameObjectBase} from '../GameObjectBase';
import {CouchObject} from '../LivingArea/CouchObject';
import {Room} from '../Room';
import {TableObject} from './TableObject';
import {TelevisionObject} from './TelevisionObject';
import {ToyBoxObject} from './ToyBoxObject';

export class LivingRoomObject extends GameObjectBase {
    constructor(room: Room) {
        super('livingroom');

        this.children = [
          new CouchObject(room),
          new TableObject(room),
          new TelevisionObject(room),
          new ToyBoxObject(room),
        ];

      if (room !== Room.Living) {
        this.smell = this.TooFarMessage;
        this.lick = this.TooFarMessage;
        this.eat = this.TooFarMessage;
      } else {
        this.smell = `It smells like fun! This is the room I get to play with toys and run around in!`;
        this.lick = `I don't think so. The carpet isn't that fun to lick.`;
        this.eat = this.CantBeSeriousMessage;
      }

      this.push = this.CantBeSeriousMessage;
      this.pull = this.CantBeSeriousMessage;
      this.think = `I love the living room! I get to run around and play here while mommy and daddy watch TV.`;
      this.look = `The living room has a bunch of carpet to run around in, as well as a couch, table, TV, and a toy box with all my fun stuff in it!`;
    }

  matches(reduced: string, room: Room): boolean {
    return super.matches(reduced, room) || reduced === 'room' || reduced === 'living';
  }
}
