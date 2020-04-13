import {GameObject} from '../World/GameObject';
import {GameRoom} from '../World/GameRoom';
import {Room} from '../World/Room';

export class Word {
  private readonly tags: string[];

  public parent: Word | null = null;
  public children: Word[] = [];

  /**
   * The object in the game this world has been mapped to
   */
  public gameObject: GameObject | undefined;

  public room: Room | undefined;

  constructor(public text: string, public reduced: string, initialTags: string[]) {
    this.tags = initialTags;
  }

  public get tagNames(): string[] {
    return this.tags;
  }

  public get hasChildren(): boolean {
    return this.children.length > 0;
  }

  public get isNoun(): boolean {
    return this.hasTag('Noun');
  }

  public get isDirection(): boolean {
    return this.hasTag('Direction');
  }

  public get isVerb(): boolean {
    return this.hasTag('Verb');
  }

  public get isAdverb(): boolean {
    return this.hasTag('Adverb');
  }

  public hasTag(tagName: string): boolean {
    return this.tags.findIndex(t => t === tagName) >= 0;
  }

  public addTag(tagName: string): Word {
    if (!this.hasTag(tagName)) {
      this.tags.push(tagName);
    }
    return this;
  }

  public removeTag(tagName: string): Word {
    const index = this.tags.findIndex(t => t === tagName);
    if (index >= 0) {
      this.tags.splice(index, 1);
    }
    return this;
  }

  public addChild(word: Word): Word {
    this.children.push(word);
    return this;
  }

}
