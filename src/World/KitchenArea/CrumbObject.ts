import {GameObjectBase} from '../GameObjectBase';

export class CrumbObject extends GameObjectBase {
    constructor() {
        super('crumb');

      this.look = context => {
        if (context.world.foundCrumb) {
          context.addText('The crumb stares at you, inviting you to eat it.');
        } else {
          context.addText('You can\'t quite find the crumb just by looking for it, but you can definitely smell one.');
        }
      }

      this.smell = context => {
          if (context.world.foundCrumb) {
            context.addText('The crumb smells delicious');
          } else {
            context.addText('Sniffing around, you find a small crumb!');
            context.world.foundCrumb = true;
          }
        }

      this.eat = context => {
          if (context.world.foundCrumb) {
            context.addText('You wolf down the crumb');
            context.world.ateCrumb = true;
            // TODO: Remove this object
          } else {
            context.addText('You need to find it first!');
          }
        }

      this.lick = context => {
          if (context.world.foundCrumb) {
            context.addText('The crumb tastes amazing! You should totally eat it.');
          } else {
            context.addText('You need to find it first!');
          }
        }

      this.pull = context => {
          if (context.world.foundCrumb) {
            context.addText('You pull the crumb towards you, just to make sure it isn\'t some sort of bug waiting to sting you. It\'s not.');
          } else {
            context.addText('You need to find it first!');
          }
        }

      this.push = context => {
          if (context.world.foundCrumb) {
            context.addText('You push the crumb, just to make sure it isn\'t some sort of bug waiting to sting you. It\'s not.');
          } else {
            context.addText('You need to find it first!');
          }
        }

      this.think = 'You love crumbs. Crumbs are the best!';
    }
}
