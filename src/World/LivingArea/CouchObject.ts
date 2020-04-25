import {GameObjectBase} from '../GameObjectBase';
import {Room} from '../Room';

export class CouchObject extends GameObjectBase {
    constructor(private room: Room) {
      super('couch');

      this.smell = `The couch smells like mommy, daddy, and fabric.`;
      this.pull = this.CantBeSeriousMessage;

      if (room === Room.UnderCouch) {
        this.look = `The couch looks much different from underneath it. It's a lot less soft and a lot more wooden.`;
        this.think = `You like that you can hide under the couch if you want. It's like your personal den.`;
        this.lick = `I don't want to lick it; the inside is made out of rough wood and I might get a splinter.`;
        this.eat = `This wood isn't much fun to chew on.`;
        this.push = 'If you want to leave the couch, just go out';
      } else {
        this.look = `The couch is large and soft. There's a gab behind it where I can go underneath if I want.`
        this.think = `The couch is nice and comfy, but I don't like that mommy and daddy sit on it instead of playing with me.`;
        this.lick = `You lick the couch. It feels soft, but doesn't taste interesting. You regret the lick.`;
        this.eat = `It's way too soft to eat.`;
        this.push = 'If you want to go underneath, just go under the couch';
      }
    }

  getRoomMapping(): Room | undefined {
    if (this.room === Room.Living) {
      return Room.UnderCouch;
    }
    return Room.Living;
  }
}
