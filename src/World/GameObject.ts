import {CommandContext} from '../CommandContext';
import {Room} from './Room';

export type objectResponse = ((context: CommandContext) => void) | string;

export interface GameObject {
  name: objectResponse;
  look: objectResponse;
  smell: objectResponse;
  lick: objectResponse;
  push: objectResponse;
  pull: objectResponse;
  open: objectResponse;
  eat: objectResponse;
  take: objectResponse;
  think: objectResponse;
  children: GameObject[];

  matches(reduced: string, room: Room): boolean;

  getRoomMapping(): Room | undefined;
}
