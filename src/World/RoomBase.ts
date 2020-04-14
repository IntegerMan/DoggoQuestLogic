import {CommandContext} from '../CommandContext';
import {GameObject} from './GameObject';
import {GameRoom} from './GameRoom';
import {Room} from './Room';

export abstract class RoomBase implements GameRoom {

    protected constructor(public displayName: string, public id: Room) {
    }

    north?: Room;
    south?: Room;
    west?: Room;
    east?: Room;
    up?: Room;
    down?: Room;
    in?: Room;
    out?: Room;

    abstract objects: GameObject[];

    abstract describe(context: CommandContext): void;

    tryGo(direction: string, context: CommandContext): boolean {
      return false;
    }

  getRoomTarget(direction: string): Room | undefined {
    switch (direction) {
      case 'north': return this.north;
      case 'east': return this.east;
      case 'south': return this.south;
      case 'west': return this.west;
      case 'up': return this.up;
      case 'down': return this.down;
      case 'in': return this.in;
      case 'out': return this.out;

      default: return undefined;
    }
  }
}
