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
        } else if (room === Room.Kitchen) {
          this.look = `It's your food bowl. The food in here is okay, but mommy and daddy eat better food.`;
          this.eat = context => {
            context.addText('You grudgingly eat the food. It could be better.');
            // TODO: Impact game state
          };
          this.think = `The kibble in your food bowl tastes okay, but you really wish it was something different.`;
          this.smell = `Yep, smells like my food. Not the most appetizing, but it's edible.`;
          this.push = `You paw at the food in the bowl, just to make sure there's not anything better underneath it. There isn't.`;
          this.pull = `You can't really pull the food bowl.`;
          this.lick = 'Yep, it tastes like your food.'
        }
    }

  matches(reduced: string, room: Room): boolean {
    return super.matches(reduced, room) || (room === Room.Dining && reduced === 'water') || (room === Room.Kitchen && (reduced === 'food' || reduced === 'kibble'));
  }
}
