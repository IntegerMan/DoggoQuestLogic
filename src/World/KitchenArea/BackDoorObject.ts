import {GameObjectBase} from '../GameObjectBase';
import {WindowObject} from '../OfficeArea/WindowObject';
import {Room} from '../Room';

export class BackDoorObject extends GameObjectBase {
    constructor(room: Room) {
        super('door');
        this.children = [
            new WindowObject(room),
        ];

        this.look = 'The door has a large window that lets you see outside. The latch is well out of reach and beyond your ability to operate.';
        this.smell = 'The door smells like outside - and freedom.';
        this.lick = 'The door isn\'t really that tasty';
        this.eat = 'The door isn\'t really that tasty';
        this.think = 'Mommy and daddy open that door and put me on a leash when it\'s time to go potty.';
        this.push = 'You pound on the door repeatedly with your paw. This normally gets daddy to take you out, but nobody responds.';
        this.pull = 'There\'s nothing to grab hold of, and besides, it\'s locked and the latch is well out of reach.';
    }

}
