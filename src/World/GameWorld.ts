import {GameRoom} from './GameRoom';
import {Room} from './Room';
import {Crate} from './OfficeArea/Crate';
import {Dining} from './KitchenArea/Dining';
import {Entryway} from './KitchenArea/Entryway';
import {Kitchen} from './KitchenArea/Kitchen';
import {LivingRoom} from './LivingArea/LivingRoom';
import {Office} from './OfficeArea/Office';
import {OnChair} from './OfficeArea/OnChair';
import {UnderCouch} from './LivingArea/UnderCouch';

export class GameWorld {
  public score = 0;
  public currentRoom: Room = Room.InCrate;
  public isChairChewed: boolean = false;
  public foundCrumb: boolean = false;
  public ateCrumb: boolean = false;
  public timeAdvanced: number = 0;
  public isGameOver: boolean = false;

  constructor() {
  }

  isCrateOpen = false;

  public rooms: GameRoom[] = [
    new Office(),
    new OnChair(),
    new Crate(),
    new Entryway(),
    new Dining(),
    new LivingRoom(),
    new UnderCouch(),
    new Kitchen()
  ];

  public getRoom(room: Room): GameRoom | undefined {
    return this.rooms.find(r => r.id === room);
  }

  reset() {
    this.isCrateOpen = false;
    this.currentRoom = Room.InCrate;
    this.timeAdvanced = 0;
    this.isChairChewed = false;
    this.ateCrumb = false;
    this.score = 0;
    this.isGameOver = false;
  }
}
