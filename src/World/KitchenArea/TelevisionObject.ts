import {GameObjectBase} from '../GameObjectBase';
import {Room} from '../Room';

export class TelevisionObject extends GameObjectBase {
    constructor(room: Room) {
        super('tv');

        this.look = `The television is a black box on the wall. Sometimes it displays moving pictures and makes sounds, but right now it's off.`;
        this.smell = `It smells faintly of plastic. It's not that interesting.`;
        this.lick = this.TooFarMessage;
        this.eat = this.TooFarMessage;
        this.think = `One time the TV showed a dog show. That was a good day. I barked at so many good boys that day.`;
        this.push = this.TooFarMessage;
        this.pull = this.TooFarMessage;
    }

}
