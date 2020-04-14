import {CommandContext} from './CommandContext';
import {StoryEntry} from './StoryEntry';
import {StoryEntryType} from './StoryEntryType';
import {GameObject} from './World/GameObject';
import {GameWorld} from './World/GameWorld';
import {GameResponse} from './Parsing/GameResponse';
import {Parser} from './Parsing/Parser';
import {Sentence} from './Parsing/Sentence';
import {VerbHandler} from './Parsing/VerbHandler';

export class StoryEngine {

  private readonly verbs: VerbHandler;
  private readonly parser: Parser;
  public state: GameWorld;

  constructor() {
    this.parser = new Parser();
    this.state = new GameWorld();
    this.verbs = new VerbHandler();
  }

  public score = 0;

  public getInitialEntries(): StoryEntry[] {
    const entries = [
      new StoryEntry(StoryEntryType.SystemText, 'Welcome to Doggo Quest!'),
      new StoryEntry(StoryEntryType.SystemText,
        'Doggo Quest is an Interactive Fiction game created by Matt Eland (@IntegerMan)'),
      new StoryEntry(StoryEntryType.SystemText,
        'This game is implemented in Angular / TypeScript using Angular Material for styling with Compromise-NLP for text parsing.'),
      new StoryEntry(StoryEntryType.Divider, '')
    ];

    const context = new CommandContext(entries, new Sentence(), this.state);
    context.describeCurrentRoom(true);

    this.score = context.world.score;
    return entries;
  }

  public handlePlayerInput(text: string): StoryEntry[] {
    const entries: StoryEntry[] = [];
    const sentence = this.parser.parse(text);
    const context = new CommandContext(entries, sentence, this.state);

    this.mapNouns(context);

    // Add an event containing the player's command so we have a log of it in the UI
    context.addPlayerCommand();

    const validationResult = sentence.validate();

    if (validationResult) {
      // If the player said something we couldn't figure out, show that error response
      context.addError(validationResult);
    } else {
      this.handleCommand(context);
    }

    // Tell the user interface that we're done adding in commands
    this.score = context.world.score;

    // Directly returning the entries makes it easier for testing
    return entries;
  }

  public getResponseState(command: string): GameResponse {
    const results = this.handlePlayerInput(command);
    return {
      state: this.state,
      responses: results,
      responseText: results.map(r => r.Text).join('\r\n')
    };
  }

  public getResponse(command: string): string {
    return this.getResponseState(command).responseText;
  }

  private mapNouns(context: CommandContext): void {
    const currentRoom = this.state.getRoom(context.currentRoom);

    if (!currentRoom) {
      return;
    }

    for (const noun of context.sentence.rootWords.filter(w => w.isNoun)) {
      const target: GameObject | null = this.findMatchForNoun(currentRoom.objects, noun.reduced);
      noun.gameObject = target;
      noun.addTag('Mapped');
    }

    for (const dir of context.sentence.rootWords.filter(w => w.isDirection)) {
      const dirName = dir.reduced;
      if (dirName) {
        dir.room = currentRoom.getRoomTarget(dirName);
        dir.addTag('Mapped');
      }
    }
  }

  private findMatchForNoun(objects: GameObject[], reduced: string | undefined): GameObject | null {
    if (!reduced) return null;

    for (const obj of objects) {
      // If this object is a direct match, use it
      if (obj.matches(reduced)) {
        return obj;
      }

      // If it has children, we'll need to recursively check them
      if (obj.children) {
        const childResult = this.findMatchForNoun(obj.children, reduced);
        if (childResult) {
          return childResult;
        }
      }
    }

    // Okay, no match. Let's return null to indicate no object mapped
    return null;
  }

  private handleCommand(context: CommandContext): void {
    if (!context.sentence.verb) return;

    // Find a verb handler for the verb
    const handler = this.verbs.getHandler(context.sentence.verb);

    if (handler) {
      // Invoke the verb handler
      handler(context);
    } else {
      // Add a generic response saying that the verb is not supported
      context.addSystem( `You can't ${context.sentence.verb} in this game.`);
    }
  }

}
