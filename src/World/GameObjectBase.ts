import {GameObject, objectResponse} from './GameObject';
import {Room} from './Room';

export abstract class GameObjectBase implements GameObject {

  protected TooFarMessage: string = `You can't do that from here!`;
  protected CantBeSeriousMessage: string = `You can't be serious!`;

  protected constructor(name: string) {
        this.name = name;
    }

    name: objectResponse;
    look!: objectResponse;
    push!: objectResponse;
    pull!: objectResponse;
    open!: objectResponse;
    smell!: objectResponse;
    take!: objectResponse;
    eat!: objectResponse;
    lick!: objectResponse;
    think!: objectResponse;
    children: GameObject[] = [];

  matches(reduced: string, room: Room): boolean {
    return reduced === this.name; // TODO: Check aliases as well
  }

  getRoomMapping(): Room | undefined {
    return undefined;
  }
}
