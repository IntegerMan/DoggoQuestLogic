import {CommandContext} from '../CommandContext';
import {GameObject} from '../World/GameObject';
import {GameRoom} from '../World/GameRoom';
import {Room} from '../World/Room';

export class NounMapper {

  public mapNouns(context: CommandContext): void {
    const currentRoom: GameRoom | undefined = context.world.getRoom(context.currentRoom);

    if (!currentRoom) {
      return;
    }

    for (const noun of context.sentence.rootWords.filter(w => w.isNoun)) {
      noun.gameObject = this.findMatchForNoun(currentRoom, currentRoom.objects, noun.reduced);
      noun.addTag('Mapped');
    }

    for (const dir of context.sentence.rootWords.filter(w => w.isDirection)) {
      const dirName = dir.reduced;
      if (dirName) {
        dir.room = NounMapper.getRoomTarget(dirName, currentRoom);
        dir.addTag('Mapped');
      }
    }
  }

  private static getRoomTarget(direction: string, room: GameRoom): Room | undefined {
    switch (direction) {
      case 'north':
        return room.north || Room.CantGo;
      case 'east':
        return room.east || Room.CantGo;
      case 'south':
        return room.south || Room.CantGo;
      case 'west':
        return room.west || Room.CantGo;
      case 'up':
        return room.up || Room.CantGo;
      case 'down':
        return room.down || Room.CantGo;
      case 'in':
        return room.in || Room.CantGo;
      case 'out':
        return room.out || Room.CantGo;

      default:
        return undefined;
    }
  }

  private findMatchForNoun(room: GameRoom, objects: GameObject[], reduced: string | undefined): GameObject | null {
    if (!reduced) return null;

    for (const obj of objects) {
      // If this object is a direct match, use it
      if (obj.matches(reduced, room.id)) {
        return obj;
      }

      // If it has children, we'll need to recursively check them
      if (obj.children) {
        const childResult = this.findMatchForNoun(room, obj.children, reduced);
        if (childResult) {
          return childResult;
        }
      }
    }

    // Okay, no match. Let's return null to indicate no object mapped
    return null;
  }
}
