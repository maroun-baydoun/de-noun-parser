## de-noun-parser
##### Parse Wikitext's de-noun template


[![npm version](https://badge.fury.io/js/de-noun-parser.svg)](https://badge.fury.io/js/de-noun-parser)

### Install

``` 
npm i de-noun-parser 
```
Or

``` 
yarn add de-noun-parser 
```

### Usage

``` ts

import parse from 'de-noun-parser';

const wikitext = '...';
const parsed = parse(wikitext);

```

### Parse result

| Field            | Type                                                                        | Note                                                                                                                      |
| ---------------- | --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| **gender**       | `string`                                                                    | `m` or `f` or `n`                                                                                                         |
| **plural**       | `string`                                                                    | If `-en`, the plural form should default to the word + -en                                                                |
| **genetive**     | `string` \| `null`                                                          | If `-s`, the genetive form should default to the word + s. If `null`, the genetive form should default to the word itself |  |
| **diminutive**   | `string?`                                                                   | The diminutive form of the noun, or `undefined` when not applicable                                                       |
| **genderedForm** | `string?`                                                                   | The feminine form of a masculine noun, the masculine form of a feminine noun, or `undefined` when not applicable          |
| **template**         | `{ text: string, arguments: string, startIndex: number, endIndex: number }` | The template's full text, its arguments and its start and end indexes within the provided wikitext                        |

If the parsing is not successful, a subclass of `ParsingError` is thrown.

### Demo

Try the demo [here](https://dev.maroun-baydoun.com/de-noun-parser/#demo).

### About de-noun template

[Template:de-noun documentation](https://en.wiktionary.org/wiki/Template:de-noun)