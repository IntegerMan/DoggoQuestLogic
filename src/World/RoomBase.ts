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

  public tryGo(direction: string, context: CommandContext): boolean {
    return false;
  }
}
