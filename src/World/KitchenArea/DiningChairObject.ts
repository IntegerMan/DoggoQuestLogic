import {GameObjectBase} from '../GameObjectBase';
import {Room} from '../Room';

export class DiningChairObject extends GameObjectBase {
    constructor(room: Room) {
        super('chair');

        this.look = `The chairs are all wooden and properly pushed in underneath the table.`;
        this.think = `Once or twice, mommy and daddy left a chair not pushed in and I was able to jump up on it. They don't do that anymore.`;
        this.smell = `The chairs all smell like wood.`;
        this.lick = `Nope, not gunna do it. Wood is yucky!`;
        this.eat = `Mommy and daddy used to coat the wood with yucky stuff and I just don't want to eat it anymore.`;
        this.push = `The chairs are all pushed in already`;
        this.pull = `The chairs are too heavy and stable for you to move`;
    }

}
