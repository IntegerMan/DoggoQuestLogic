import {GameObjectBase} from '../GameObjectBase';
import {Room} from '../Room';
import {DiningObject} from './DiningObject';
import {KitchenCounterObject} from './KitchenCounterObject';
import {KitchenFloorObject} from './KitchenFloorObject';

export class KitchenObject extends GameObjectBase {
  constructor(room: Room) {
        super('kitchen');

        this.children = [
            new KitchenFloorObject(),
            new KitchenCounterObject(),
        ];

        if (room === Room.Kitchen) {
          this.children.push(new DiningObject(room));
        } else {
          this.smell = 'It smells like food, but you need to get closer';
          this.lick = this.TooFarMessage;
          this.eat = this.TooFarMessage;
          this.push = this.TooFarMessage;
          this.pull = this.TooFarMessage;
        }

        this.think = 'The kitchen is amazing! It\'s where all the food lives. Sadly, you don\'t always get to eat that food, but sometimes there are crumbs.';
    }
}
