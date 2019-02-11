## de-noun-parser
##### Parse Wikitext's de-noun template

### Usage

``` ts

import parse from 'de-noun-parser';

const wikitext = '...';
const parsed = parse(wikitext);

// When parsing is successful:

{
    gender: string,
    genetive: string | null,
    plural: string
}

// When parsing is not successful:

null

```



### About de-noun template

[Template:de-noun documentation](https://en.wiktionary.org/wiki/Template:de-noun)