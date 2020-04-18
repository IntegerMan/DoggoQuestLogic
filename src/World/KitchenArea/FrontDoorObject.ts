import {GameObjectBase} from '../GameObjectBase';

export class FrontDoorObject extends GameObjectBase {
    constructor() {
        super('door');

        this.look = 'The front door is large and heavy. You get so excited when it opens, but have no hope of opening it yourself.';
        this.smell = 'The door smells like wood, mixed with the wonderful smells of nature from outside.';
        this.lick = 'The front door isn\'t really that tasty.';
        this.eat = 'The front door doesn\'t taste good. Don\'t think about how you know that.';
        this.think = 'This is the door that mommy and daddy open when they\'re going to take me for a walk!';
        this.push = 'The front door is heavy and opens inwards';
        this.pull = 'The front door is far too heavy to pull. Besides, it is latched shut.';
        this.open = 'You can\'t open the front door! It\'s far too big and you couldn\'t reach the handle with a running start.'
    }
}
