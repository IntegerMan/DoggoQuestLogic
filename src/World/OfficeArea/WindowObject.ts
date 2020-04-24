import {GameObjectBase} from '../GameObjectBase';
import {Room} from '../Room';
import {OutsideObject} from './OutsideObject';

export class WindowObject extends GameObjectBase {

    constructor(private room: Room) {
        super('window');

        this.children = [
          new OutsideObject(room)
        ];

        switch (this.room) {
          case Room.Office:
            const cantReachFloor = `You can't reach the window from down on the floor.`;
            this.lick = cantReachFloor;
            this.push = cantReachFloor;
            this.eat = cantReachFloor;
            this.take = cantReachFloor;
            this.smell = `You can't reach the window from down on the floor, but it smells vaguely like outside.`;
            this.look = `It's your favorite window. When you're up on the chair you can see out onto the street at bark at anything that ` +
              `walks by. You can't see much from down here, however.`;
            break;
          case Room.OnChair:
            this.look = `Looking outside you see the empty streets. Something will walk by eventually, you just know it!`;
            this.lick = `You can't reach the window from the chair, but even if you could, would you really want to lick it?`;
            this.eat = `You can't reach the window from the chair, but even if you could, would you really want to eat it?`;
            this.take = `You can't reach the window from the chair, but seriously? How could I possibly pick up a window?`;
            this.smell = `The window smells like outside and freedom. You don't smell any intruders out there, but maybe one is coming sooner or later.`;
            this.push = `You can't reach the window from the chair.`;
            this.pull = `You can't reach the window from the chair.`;
            break;
        }
    }

  matches(reduced: string, room: Room): boolean {
    return super.matches(reduced, room) || reduced === 'outside';
  }
}
