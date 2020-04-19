import {GameObjectBase} from '../GameObjectBase';
import {Room} from '../Room';

export class BowlObject extends GameObjectBase {
    constructor(room: Room) {
        super('bowl');

        if (room === Room.Dining) {
          this.look = `It's your water bowl! You love this bowl and drinking from it.`;
          this.eat = `You don't eat water! Just drink it!`;
          this.think = `The water tastes so good after running around the house.`;
          this.smell = `I dunno. I guess it smells like water?`;
          this.push = `You bat your paws in the water bowl. They get wet.`;
          this.pull = `You can't really pull the water bowl.`;
          this.lick = context => {
            context.addText('You lap up the water eagerly. It is cold, wet, and satisfying.');
            // TODO: Increment a count and describe differently for differing water levels
          }
        }
    }

  matches(reduced: string, room: Room): boolean {
    return super.matches(reduced, room) || (room === Room.Dining && reduced === 'water');
  }
}
