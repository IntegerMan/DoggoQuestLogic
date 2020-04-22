import {GameObjectBase} from '../GameObjectBase';
import {Room} from '../Room';

export class TableObject extends GameObjectBase {
    constructor(room: Room) {
        super('table');

        this.look = `It's a large wooden table that you can comfortably lurk underneath.`;
        this.smell = 'The table mostly smells like wood. Sometimes it smells like food, but you don\'t smell any up there now.';
        this.lick = `Ew! Wood tastes yucky. No thank you.`;
        this.eat = `When you were a puppy it was fun to chew on tables, but not anymore.`;
        this.think = `Mommy and daddy take food from the kitchen and put it on the table at dinner time. It isn't dinner time now, though.`;
        this.push = `The table is way too heavy for you to move.`;
        this.pull = this.push;
    }
}
