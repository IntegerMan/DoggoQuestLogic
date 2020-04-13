import {Sentence} from './Sentence';
import {Word} from './Word';
import nlp from 'compromise';

export class Parser {

  private static replaceAll(text: string, match: string, replacement: string): string {
    return text.split(match).join(replacement);
  }

  private static linkSentence(sentence: Sentence) {
    const verb: Word | undefined = sentence.verbWord;
    let lastNoun: Word | null = null;

    const reversedSentence = sentence.words.slice().reverse();
    for (const word of reversedSentence) {
      if (word.isNoun) {
        lastNoun = word;
        continue;
      }

      if (word.isVerb) {
        continue;
      }

      if (word.isAdverb) {
        if (verb) {
          word.parent = verb;
        } else {
          word.parent = null;
        }
        if (verb) {
          verb.addChild(word);
        }
      } else {
        word.parent = lastNoun;
        if (lastNoun) {
          lastNoun.addChild(word);
        }
      }
    }
  }

  private static expandShorthand(text: string) {

    // Ensure we start and with a blank space to allow for string replace operations
    if (text) {
      text = ' ' + text + ' ';
    } else {
      text = ' ';
    }

    // Do smart replacement. Split / join is the equivalent of "replaceAll"
    text = Parser.replaceAll(text, ' n ', ' north ');
    text = Parser.replaceAll(text, ' e ', ' east ');
    text = Parser.replaceAll(text, ' s ', ' south ');
    text = Parser.replaceAll(text, ' w ', ' west ');
    text = Parser.replaceAll(text, ' l ', ' look ');
    text = Parser.replaceAll(text, ' x ', ' examine ');

    return text;
  }

  public parse(text: string): Sentence {

    // Allow shorthand such as 'n' for north and 'l' for look
    text = Parser.expandShorthand(text);

    // Have Compromise NLP Parse the sentence
    const terms = nlp(text).termList();

    // Construct the sentence
    const sentence = this.buildSentence(terms);
    sentence.text = text;

    // Log and return
    return sentence;
  }

  private buildSentence(terms: nlp.Term[]): Sentence {
    const sentence = new Sentence();

    // Translate from NLP Terms to domain object Words
    // This serves as a layer of abstraction between Compromise and the rest of the code
    let word: Word;
    for (const term of terms) {
      const tags: string[] = [];
      for (const tag in term.tags) {
        if (term.tags.hasOwnProperty(tag)) {
          tags.push(tag);
        }
      }
      word = new Word(term.text, term.reduced, tags);

      this.adjustTags(word);

      sentence.addWord(word);
    }

    if (sentence.words.length > 0 && !sentence.verbWord && sentence.words[0].hasTag('Direction')) {
      sentence.assumeVerb('go');
    }

    // Now that we have our words, let's start linking them together
    Parser.linkSentence(sentence);

    return sentence;
  }

  private adjustTags(word: Word): void {

    const verbs = ['bark', 'roo', 'arf', 'yip', 'open', 'growl', 'howl', 'sniff', 'debug'];
    const nouns = ['crate', 'objects', 'object'];
    const preps = ['on', 'under', 'below', 'behind', 'above'];
    const directions = ['north', 'south', 'east', 'west', 'up', 'down', 'in', 'out'];

    if (verbs.find(v => v === word.reduced)) {
      word.removeTag('Noun').addTag('Verb');
    } else if (nouns.find(v => v === word.reduced)) {
      word.removeTag('Verb').addTag('Noun');
    } else if (preps.find(p => p === word.reduced)) {
      word.addTag('Preposition');
    } else if (directions.find(d => d === word.reduced)) {
      word.addTag('Noun').addTag('Direction');
    }

    // Possessive nouns should be treated as adjectives
    if (word.isNoun && word.hasTag('Possessive')) {
      word.removeTag('Noun');
    }
  }
}
