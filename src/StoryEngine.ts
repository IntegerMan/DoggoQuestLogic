import {CommandContext} from './CommandContext';
import {GameResponse} from './Parsing/GameResponse';
import {NounMapper} from './Parsing/NounMapper';
import {Parser} from './Parsing/Parser';
import {Sentence} from './Parsing/Sentence';
import {VerbHandler} from './Parsing/VerbHandler';
import {StoryEntry} from './StoryEntry';
import {StoryEntryType} from './StoryEntryType';
import {GameWorld} from './World/GameWorld';

export class StoryEngine {

  private readonly mapper: NounMapper;
  private readonly verbs: VerbHandler;
  private readonly parser: Parser;
  public state: GameWorld;

  constructor() {
    this.parser = new Parser();
    this.state = new GameWorld();
    this.verbs = new VerbHandler();
    this.mapper = new NounMapper();
  }

  public score = 0;

  // noinspection JSUnusedGlobalSymbols
  public getInitialEntries(): StoryEntry[] {
    const entries = [];
    const context = new CommandContext(entries, new Sentence(), this.state);

    context.addInitialEntries();

    context.describeCurrentRoom(true);

    this.score = context.world.score;
    return entries;
  }

  public handlePlayerInput(text: string): StoryEntry[] {
    const entries: StoryEntry[] = [];
    const sentence = this.parser.parse(text);
    const context = new CommandContext(entries, sentence, this.state);

    this.mapper.mapNouns(context);

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

  public handleCommands(commands: string[]): GameWorld {
    commands.forEach(c => this.handlePlayerInput(c));

    return this.state;
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
