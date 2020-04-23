import {GameObjectBase} from '../GameObjectBase';
import {Room} from '../Room';
import {FrontDoorObject} from './FrontDoorObject';
import {GateObject} from './GateObject';
import {StairsObject} from './StairsObject';

export class HallwayObject extends GameObjectBase {
  constructor(room: Room) {
        super('hallway');

        this.children = [
            new FrontDoorObject(),
            new StairsObject(),
            new GateObject(),
        ];

        this.look = `The hallway is narrow, dark, and uninteresting. It exists to connect the stairs, front door, and office to the dining room and the rest of the floor.`;
        if (room !== Room.Entryway) {
          this.smell = this.TooFarMessage;
          this.lick = this.TooFarMessage;
          this.eat = this.TooFarMessage;
        } else {
          this.smell = `It smells sort of boring, honestly.`;
          this.lick = `There's nothing interesting on the floor to lick.`;
          this.eat = this.CantBeSeriousMessage;
        }

        this.push = this.CantBeSeriousMessage;
        this.pull = this.CantBeSeriousMessage;
        this.think = `I don't really love the hallway. It's just a place to be when I'm going to other places.`;
    }

  matches(reduced: string, room: Room): boolean {
    return super.matches(reduced, room) || reduced === 'hall' || reduced === 'entryway';
  }
}
