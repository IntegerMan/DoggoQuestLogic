import {GameObjectBase} from '../GameObjectBase';
import {Room} from '../Room';

export class ToyBoxObject extends GameObjectBase {
    constructor(room: Room) {
        super('toybox');

        this.look = 'This is the heavy fabric box that stores my toys! There are so many toys in there, but none of them look interesting.';
        this.smell = `It smells like my toys! It's a mix of plastic and fabric. Unfortunately, I don't smell my squeaker in there.`;
        this.lick = `I don't like licking canvas.`;
        this.eat = `The canvas is too tough to chew through.`;
        this.think = `My squeaker used to be in there, but I think I took it under the couch last night`;
        this.push = `My old box was light enough to carry around the room, but this one is too heavy for me to move.`;
        this.pull = `My old box was light enough to carry around the room, but this one is too heavy for me to move.`;
    }

  matches(reduced: string, room: Room): boolean {
    return super.matches(reduced, room) || reduced === 'toy' || reduced === 'box';
  }
}
