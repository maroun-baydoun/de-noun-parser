## de-noun-parser
##### Parse Wikitext's de-noun template


[![npm version](https://badge.fury.io/js/de-noun-parser.svg)](https://badge.fury.io/js/de-noun-parser)

### Install

``` 
npm install de-noun-parser 
```

### Usage

``` ts

import parse from 'de-noun-parser';

const wikitext = '...';
const parsed = parse(wikitext);

```

### Parse result

| Field    |      Type           |  Note      |
|----------|---------------------|------------|
| **gender**   |  `string`       | `m` or `f` |
| **plural**   |  `string`       |            |
| **genetive** | `string \| null` | If `null`, the genetive form should default to the word + s  <br/> for masculine or neuter nouns, and the noun itself when feminine      |
| **diminutive** | `string \| null`|           |
| **genderedForm** | `string \| null` |      If applicable, the feminine form of a masculine noun, <br/> or the masculine form of a feminine noun     |

If the parsing is not successful, the parsed result will be `null`.

### About de-noun template

[Template:de-noun documentation](https://en.wiktionary.org/wiki/Template:de-noun)