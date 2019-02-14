
export const parse = (wikitext: string) => {
  const startIndex = wikitext.indexOf('{{de-noun|') + '{{de-noun|'.length;
  const endIndex = wikitext.indexOf('}}', startIndex);
  const tokens = wikitext.substring(startIndex, endIndex)
                         .split('|')
                         .filter(token => token.indexOf('=') === -1);

  if (tokens.length < 3) {
    return null;
  }

  return {
    diminutive: tokens[3] || null,
    gender: tokens[0],
    genetive: tokens[1] || null,
    plural: tokens[2],
  };
};

export default parse;
