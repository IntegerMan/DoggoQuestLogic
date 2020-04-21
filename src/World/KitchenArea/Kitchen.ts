import {CommandContext} from '../../CommandContext';
import {GameObject} from '../GameObject';
import {Room} from '../Room';
import {RoomBase} from '../RoomBase';
import {DiningObject} from './DiningObject';
import {KitchenObject} from './KitchenObject';

export class Kitchen extends RoomBase {
  objects: GameObject[];

  east = Room.Dining;

  constructor() {
    super('Kitchen', Room.Kitchen);
    this.objects = [
      new KitchenObject(Room.Kitchen),
      new DiningObject(Room.Kitchen)
    ];
  }

  describe(context: CommandContext): void {
    context.addText(`The kitchen is an amazing place. Mommy cooks food on the counter and sometimes gives me a crumb or two. ` +
      `Sometimes I can also find crumbs on the floor if I sniff around for them.`);
    context.addText(`The dining room and the rest of the house is to the east.`);
    context.addText(`A trashcan and my water bowl are here.`);
  }
}
