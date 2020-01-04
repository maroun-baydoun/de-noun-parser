
export type Gender = 'm' | 'f' | 'n';

export type ParseResult = {
  template: {
    text: string,
    arguments: string,
    startIndex: number,
    endIndex: number,
  }
  gender: Gender,
  plural: string,
  genetive: string | null,
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
  const startIndex = wikitext.indexOf('{{de-noun|');
  const endIndex = wikitext.indexOf('}}', startIndex);

  const templateArguments = wikitext.substring(startIndex + '{{de-noun|'.length, endIndex);
  const tokens = templateArguments.split('|');
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
    template: {
      text: wikitext.substring(startIndex, endIndex + 2),
      arguments: templateArguments,
      startIndex,
      endIndex: endIndex + 1,
    },
    gender,
    plural,
    genetive,
    ...(diminutive !== null && { diminutive }),
    ...(genderedForm !== null && { genderedForm }),
  };
};


export default parse;
