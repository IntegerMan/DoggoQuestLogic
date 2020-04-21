import {GameObjectBase} from '../GameObjectBase';

export class KitchenCounterObject extends GameObjectBase {

  constructor() {
    super('counter');

    this.smell = 'The counter smells like food was prepared on it and then put away. There\'s nothing up there, but maybe some crumbs fell.';
    this.lick = this.TooFarMessage;
    this.eat = this.TooFarMessage;
    this.think = 'I\'ve never seen the top of the counter, but I know that this is the place mommy puts the food when she\'s making it.';
    this.push = `It's way too heavy for me to push it.`;
    this.pull = `It's way too heavy for me to pull it.`;
  }
}
