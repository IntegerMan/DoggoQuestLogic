import {GameObjectBase} from '../GameObjectBase';

export class StairsObject extends GameObjectBase {
    constructor() {
      super('stairs');

      this.look = 'The stairs going up to the bedroom are guarded by a scary gate.';
      this.smell = `It doesn't smell like a whole lot. Mostly feet.`;
      this.think = `I love running up those stairs and beating daddy to the top. I'm super fast!`;
      this.eat = `The gate stops you from reaching the stairs.`;
      this.lick = `The gate stops you from reaching the stairs.`;
      this.pull = `The gate stops you from reaching the stairs.`;
      this.push = `The gate stops you from reaching the stairs.`;
    }
}
