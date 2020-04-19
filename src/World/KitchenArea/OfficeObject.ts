import {GameObjectBase} from '../GameObjectBase';
import {Room} from '../Room';

export class OfficeObject extends GameObjectBase {
  constructor(room: Room) {
    super('office');

    this.think = `The office is where I go when it's time to sleep or when I want to watch outside through the window.`;

    if (room === Room.Entryway) {
      this.smell = `In order to really smell it, you'll need to get closer.`;
      this.lick = this.TooFarMessage;
      this.eat = this.TooFarMessage;
      this.push = this.TooFarMessage;
      this.pull = this.TooFarMessage;
    }
  }
}
