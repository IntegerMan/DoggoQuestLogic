import {GameObjectBase} from '../GameObjectBase';

export class GateObject extends GameObjectBase {
    constructor() {
        super('gate');

        this.look = 'The gate is kind of scary. You don\'t like it. Daddy has to open it for you, because if you touch it, it might fall on you.';
        this.smell = 'It smells like abject terror. I don\'t even want to get near the thing.';
        this.eat = `I don't want to get close enough to touch it!`;
        this.lick = `I don't want to get close enough to lick it!`;
        this.think = `Look, this gate is really scary, okay? It might fall on me and crush me again. It's very wobbly and mean.`;
        this.push = `No way. I'm not getting near that gate. It might fall on me again.`;
        this.pull = `No way. I'm not getting near that gate. It might fall on me again.`;
    }
}
