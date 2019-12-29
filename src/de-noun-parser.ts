import { Gender, ParseResult } from './types';
import { UnrecognisedGenderError } from './errors';

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
    ...(diminutive !== null && { diminutive }),
    ...(genderedForm !== null && { genderedForm }),
  };
};

export default parse;
