import {CommandContext} from '../../CommandContext';
import {GameObject} from '../GameObject';
import {Room} from '../Room';
import {RoomBase} from '../RoomBase';
import {CrateObject} from './CrateObject';

export class Crate extends RoomBase {
  objects: GameObject[];

  north = Room.Office;
  out = Room.Office;

  tryGo(direction: string, context: CommandContext): boolean {
    if ((direction == 'north' || direction == 'out') && !context.world.isCrateOpen) {
      context.addText('The crate door is shut and blocks your way.');
      return true;
    }
    return false;
  }

  constructor() {
    super('In Crate', Room.InCrate);
    this.objects = [
      new CrateObject(this.id)
    ];
  }

  describe(context: CommandContext): void {
    context.addText(`You're in your crate yet again. It's a small crate large enough for you to rest comfortably, but not move around in.`);
    context.addText('There is a blanket on the floor and a door to the crate in front of you.');
    context.addText('You do not like it here.');
  }

}
