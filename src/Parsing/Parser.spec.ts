import {Parser} from './Parser';

describe('Parser', () => {

  let parser: Parser;
  beforeEach(() => {
    parser = new Parser();
  });

  it('should parse "smell dining room" correctly', () => {
    const sentence = parser.parse('smell dining room');
    expect(sentence.words[0].tagNames).toContain('Verb');
    expect(sentence.words[1].tagNames).toContain('Adjectives');
    expect(sentence.words[2].tagNames).toContain('Noun');
  });
});
