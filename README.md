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

// When parsing is successful:

{
    diminutive: string | null,
    gender: string,
    genderedForm: string | null,
    genetive: string | null,
    plural: string
}

// When parsing is not successful:

null

```



### About de-noun template

[Template:de-noun documentation](https://en.wiktionary.org/wiki/Template:de-noun)