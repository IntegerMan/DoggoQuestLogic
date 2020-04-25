import {CommandContext} from '../../CommandContext';
import {GameObject} from '../GameObject';
import {Room} from '../Room';
import {RoomBase} from '../RoomBase';
import {DiningObject} from './DiningObject';
import {HallwayObject} from './HallwayObject';
import {KitchenObject} from './KitchenObject';
import {LivingRoomObject} from './LivingRoomObject';

export class Dining extends RoomBase {
  objects: GameObject[];

  west = Room.Kitchen;
  east = Room.Living;
  north = Room.Entryway;
  south = Room.CantGo;
  up = Room.CantGo;

  constructor() {
    super('Dining Room', Room.Dining);
    this.objects = [
      new DiningObject(Room.Dining),
      new KitchenObject(Room.Dining),
      new HallwayObject(Room.Dining),
      new LivingRoomObject(Room.Dining),
    ];
  }

  tryGo(direction: string, context: CommandContext): boolean {
    if (direction === 'south') {
      context.addText('The door is shut. You\'d need mommy or daddy to open it.');
      return true;
    } else if (direction === 'up') {
      context.addText('The table and chairs are too tall to jump up onto.');
      return true;
    }
    return false;
  }

  describe(context: CommandContext): void {
    context.addText(`This is the dining room. I like to beg at the table when mommy and daddy eat, but I usually have to eat out of my ` +
      `food bowl instead.`);
    context.addText(`The large glass door lets me see outside. I like that door.`);
    context.addText(`The kitchen is to the west and the living room is to the west. The hall goes north to the entryway.`);
  }


}
