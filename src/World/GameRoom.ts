import {CommandContext} from '../CommandContext';
import {GameObject} from './GameObject';
import {Room} from './Room';

export interface GameRoom {
  getRoomTarget(direction: string): Room | undefined;

  displayName: string;
  id: Room;
  objects: GameObject[];
  north?: Room;
  south?: Room;
  west?: Room;
  east?: Room;
  up?: Room;
  down?: Room;
  in?: Room;
  out?: Room;

  tryGo(direction: string, context: CommandContext): boolean;

  describe(context: CommandContext): void;
}
