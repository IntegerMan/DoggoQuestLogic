import {StoryEntry} from '../StoryEntry';
import {GameWorld} from '../World/GameWorld';

export interface GameResponse {
  state: GameWorld;
  responses: StoryEntry[];
  responseText: string;
}
