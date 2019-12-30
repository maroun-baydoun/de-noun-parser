
export type Gender = 'm' | 'f' | 'n';

export type ParseResult = {
  gender: Gender,
  plural: string,
  genetive: string | null,
  definitions: string[],
  diminutive?: string,
  genderedForm?: string,
};


export class ParsingError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ParsingError';
  }
}

export class UnrecognisedGenderError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UnrecognisedGenderError';
  }
}


export const parse = (wikitext: string): ParseResult => {
  const startIndex = wikitext.indexOf('{{de-noun|') + '{{de-noun|'.length;
  const endIndex = wikitext.indexOf('}}', startIndex);

  const tokens = wikitext.substring(startIndex, endIndex).split('|');
  const baseTokens = tokens.filter(token => token.indexOf('=') === -1);
  const additionalTokens = tokens.filter(token => token.indexOf('=') !== -1);


  if (['f', 'm', 'n'].indexOf(baseTokens[0]) < 0) {
    throw new UnrecognisedGenderError(`Expected m, f or n, but recieved ${baseTokens[0]}`);
  }

  const gender = baseTokens[0] as Gender;
  const genetive = baseTokens[1] || (gender === 'm' || gender === 'n' ? '-s' : null);
  const plural = baseTokens[2] || '-en';
  const diminutive = baseTokens[3] || null;
  const genderedForms = additionalTokens.filter(token => (
    token.indexOf('f=') !== -1 || token.indexOf('m=') !== -1
  ));
  const genderedForm = genderedForms.length ? genderedForms[0].split('=')[1] : null;

  return {
    gender,
    plural,
    genetive,
    definitions: parseDefinitions(wikitext, wikitext.indexOf('#', endIndex)),
    ...(diminutive !== null && { diminutive }),
    ...(genderedForm !== null && { genderedForm }),
  };
};



const parseDefinitions = (wikitext: string, startIndex: number, definitions: string[] = []): string[] => {
  const newLineIndex = wikitext.indexOf('\n', startIndex);
  const definition = wikitext.substring(startIndex, newLineIndex)
    //Remove the leading # and space
    .replace(/^#\s/, '')
    //Replace [[definition]] with `definition`
    .replace(/\[\[([^,\]\[]+)\]\]/g, '$1')
    //Replace {{gloss|word}} with (word)
    .replace(/{{gloss\|([^{}]+)}}/g, '($1)')
    //Replace {{label|lang|word}} with `word`
    .replace(/{{(?:lb|lbl|label)\|[\w-]+\|(.[^{}]+)}}/g, '($1)')
    //Replace {{link|lang|word}} with `word`
    .replace(/{{(?:l|link)\|[\w-]+\|(.[^{}]+)}}/g, '$1')
    //Replace {{clipping of|lang|word}} with `Short for word`
    .replace(/{{clipping of\|[\w-]+\|(.[^{}]+)}}/g, 'Short for $1')
    //Replace {{short for|lang|word}} with `Short for word`
    .replace(/{{short for\|[\w-]+\|(.[^{}]+)}}/g, 'Short for $1')
    .trim();

  if (wikitext.charAt(newLineIndex + 1) !== '#') {
    return [...definitions, definition].filter(def => def.match(/^(#:|#\*)\s/) == null);
  }

  return parseDefinitions(wikitext, newLineIndex + 1, [...definitions, definition]);

}

export default parse;
