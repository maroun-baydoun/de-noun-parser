
export const parse = (wikitext: string) => {
  const startIndex = wikitext.indexOf('{{de-noun|') + '{{de-noun|'.length;
  const endIndex = wikitext.indexOf('}}', startIndex);

  const tokens = wikitext.substring(startIndex, endIndex).split('|');
  const baseTokens =  tokens.filter(token => token.indexOf('=') === -1);
  const additionalTokens = tokens.filter(token => token.indexOf('=') !== -1);

  const gender = baseTokens[0];
  
  if(['f', 'm', 'n'].indexOf(gender) < 0) {
    return null;
  }

  const genetive = baseTokens[1] || null;
  const plural = baseTokens[2] || '-en';
  const diminutive = baseTokens[3] || null;
  const genderedForms = additionalTokens.filter(token => (
    token.indexOf('f=') !== -1 || token.indexOf('m=') !== -1
  ));
  const genderedForm = genderedForms.length ? genderedForms[0].split('=')[1] : null;

  return {
    diminutive,
    gender,
    genderedForm,
    genetive,
    plural,
  };
};

export default parse;
