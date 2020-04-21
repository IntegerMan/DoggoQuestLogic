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
        }
    }
}
