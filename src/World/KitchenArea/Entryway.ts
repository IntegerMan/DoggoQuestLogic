import {CommandContext} from '../../CommandContext';
import {GameObject} from '../GameObject';
import {Room} from '../Room';
import {RoomBase} from '../RoomBase';
import {HallwayObject} from './HallwayObject';
import {OfficeObject} from './OfficeObject';

export class Entryway extends RoomBase {
  objects: GameObject[] = [
    new HallwayObject(Room.Dining),
    new OfficeObject(),
  ];

  south = Room.Dining;
  west = Room.Office;
  up = Room.CantGo;

  constructor() {
    super('Entryway', Room.Entryway);
  }

  tryGo(direction: string, context: CommandContext): boolean {
    if (direction === 'up') {
      context.addText(`The gate is in the way and blocks you from climbing the stairs.`);
      return true;
    }
    return super.tryGo(direction, context);
  }

  describe(context: CommandContext): void {
    context.addText(`You're in the entryway at the front of the house. A large door leads outside while the office is to the west and a ` +
      `hallway leads south to the dining room and living area.`);
    context.addText(`Stairs lead up, but are blocked by a menacing gate that frequently falls on you if you get near it.`);
  }
}
