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

| Field            | Type               | Note                                                                                                                      |
| ---------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------- |
| **gender**       | `string`           | `m` or `f` or `n`                                                                                                         |
| **plural**       | `string`           | If `-en`, the plural form should default to the word + -en                                                                |
| **genetive**     | `string` \| `null` | If `-s`, the genetive form should default to the word + s. If `null`, the genetive form should default to the word itself |
| **definitions**  | `string[]`         | An array of definition strings                                                                                            |
| **diminutive**   | `string?`          | The diminutive form of the noun, or `undefined` when not applicable                                                       |
| **genderedForm** | `string?`          | The feminine form of a masculine noun, the masculine form of a feminine noun, or `undefined` when not applicable          |

If the parsing is not successful, a subclass of `ParsingError` is thrown.

### About de-noun template

[Template:de-noun documentation](https://en.wiktionary.org/wiki/Template:de-noun)