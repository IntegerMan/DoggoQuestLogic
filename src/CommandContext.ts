import {Sentence} from './Parsing/Sentence';
import {Word} from './Parsing/Word';
import {StoryEntry} from './StoryEntry';
import {StoryEntryType} from './StoryEntryType';
import {GameRoom} from './World/GameRoom';
import {GameWorld} from './World/GameWorld';
import {Room} from './World/Room';

export class CommandContext {

  constructor(private entries: StoryEntry[], public sentence: Sentence, public world: GameWorld) {

  }

  public get currentRoom(): Room {
    return this.world.currentRoom;
  }

  public get currentRoomObject(): GameRoom | undefined {
    return this.world.getRoom(this.world.currentRoom);
  }

  public get currentRoomName(): string {
    const room = this.currentRoomObject;
    if (!room) {
      return 'NO ROOM';
    }
    return room.displayName;
  }

  public describeCurrentRoom(isFullDescribe: boolean): void {
    const gameRoom = this.world.getRoom(this.world.currentRoom);

    if (!gameRoom) {
      return;
    }

    this.addRoomName(gameRoom.displayName);

    if (isFullDescribe) {
      if (gameRoom) {
        gameRoom.describe(this);
      } else {
        this.addError(`No description exists for room ${this.world.currentRoom}`);
      }
    }
  }

  public changeRoom(newRoom: Room, directionName: string): void {
    const currentRoom: GameRoom | undefined = this.world.getRoom(this.currentRoom);

    if (!currentRoom) {
      return;
    }

    // Check to see if we have something like canGoNorth and execute it if relevant
    if (currentRoom.tryGo(directionName.toLowerCase(), this)) {
      return;
    }

    if (newRoom == Room.CantGo) {
      this.addText('You can\'t go that way.');
      return;
    }

    this.addText(`You go ${directionName}`);
    this.world.currentRoom = newRoom;
    this.describeCurrentRoom(true); // TODO: Should only be true on first visit
  }

  public checkVerb(expectedVerb: string): void {
    if (this.sentence.verb !== expectedVerb) {
      this.addSystem( `[Handling as '${expectedVerb}' instead of '${this.sentence.verb}']`);
    }
  }

  public addPlayerCommand(): void {
    this.entries.push(new StoryEntry(StoryEntryType.PlayerCommand, this.sentence.text, this.sentence, this.currentRoomObject));
  }

  public addText(message: string): void {
    this.entries.push(new StoryEntry(StoryEntryType.StoryNarrative, message, this.sentence, this.currentRoomObject));
  }

  public addRoomName(message: string): void {
    this.entries.push(new StoryEntry(StoryEntryType.RoomName, message, this.sentence, this.currentRoomObject));
  }

  public addError(message: string): void {
    this.entries.push(new StoryEntry(StoryEntryType.CommandError, message, this.sentence, this.currentRoomObject));
  }

  public addSystem(message: string): void {
    this.entries.push(new StoryEntry(StoryEntryType.SystemText, message, this.sentence, this.currentRoomObject));
  }

  public addDontSee(target: Word): void {
    this.entries.push(new StoryEntry(StoryEntryType.CommandError,
      `You don't see a ${target.reduced} here.`,
      this.sentence,
      this.currentRoomObject));
  }

  public increaseScore(amount: number): void {
    this.addSystem(`Your score has gone up by ${amount}`);
    this.world.score += amount;
  }

  public addLocalObjects(): void {
    this.entries.push(new StoryEntry(StoryEntryType.ObjectList, 'Objects in this room', this.sentence, this.currentRoomObject));
  }
}
