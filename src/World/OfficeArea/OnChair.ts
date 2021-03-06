import {CommandContext} from '../../CommandContext';
import {GameObject} from '../GameObject';
import {ChairObject} from './ChairObject';
import {CrateObject} from './CrateObject';
import {WindowObject} from './WindowObject';
import {Room} from '../Room';
import {RoomBase} from '../RoomBase';

export class OnChair extends RoomBase {
  objects: GameObject[];

  constructor() {
    super('Office (On Chair)', Room.OnChair);
    this.objects = [
      new CrateObject(this.id),
      new WindowObject(this.id),
      new ChairObject(this.id)
    ];
  }

  down = Room.Office;

  describe(context: CommandContext): void {
    context.addText(`You're in the office on top of your favorite chair. From here you have a good vantage point to look out the window to the yard outside ` +
      `and can still see the rest of the office below you.`);
  }
}
