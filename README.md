# mediawiki-history-dumps-scraper

This is the **npm** module of "Mediawiki history dumps scraper", refer to the [main branch](https://github.com/euberdeveloper/mediawiki-history-dumps-scraper) to see in general the projects' purpose.

## What does the module do?

This npm module allows you to get (also selectively), through a **scraper**, the available content in [Mediawiki history dumps](https://dumps.wikimedia.org/other/mediawiki_history/readme.html). You can check wich versions are available, which language, which datasets, the download links, the size...

## How was it made?

This module was written in **Typescript** and uses `axios` and regexps to **scrape** the content from the [Download site](https://dumps.wikimedia.org/other/mediawiki_history/). The code is linted with **eslint** and **prettier**, and bundled with **webpack**. A code documentation made with **Typedoc** and hosted with **Vercel** is available at [https://mhdscraper.euber.dev](https://mhdscraper.euber.dev).

## How to use it?

### Installation


```bash
npm install mhdscraper
```

### Examples

An example (you can add console.log of a variable to see the response).

```typescript
import * as mhdscraper from 'mhdscraper';

async function main() {
    // Returns the root url of the datasets site
    const root_url = mhdscraper.WIKI_URL;

    // Returns an array of versions, returning the version name and its url
    const versions = await mhdscraper.fetchVersions();
    // Returns an array of datasets, returning the dataset name, its url and 
    // including all the available wikies (name and url)
    const versionsWithLangs = await mhdscraper.fetchVersions({
        wikies: true
    });

    // Returns an array containing all the wikies of the latest version,
    // returning name and url
    const wikies = await mhdscraper.fetchWikies('latest');
    // Returns an array containing the wikies ending with 'wiki' of the 
    // latest version, returning name and url
    const wikiesEndingWIthWiki = await mhdscraper.fetchWikies('latest', {
        wikitype: 'wiki'
    });
    // Returns an array containing the wikies starting with 'it' of the latest version, 
    // returning name, url and the array of available dumps
    const wikiesWithDumps = await mhdscraper.fetchWikies('latest', {
        lang: 'it',
        dumps: true
    });

    // Returns an array containing all the dumps of 'itwiki' of the latest version, 
    // reurning many pieces of information such as filename, start and end date 
    // of the content, size in bytes, url to download it...
    const dumps = await mhdscraper.fetchDumps('latest', 'itwiki');
    // Returna an arrayo containing all the dumps of 'itwiki' of the latest version,
    // whose content is between 2004-01-01 and 2005-02-01
    const dumpsSelected = await mhdscraper.fetchDumps('latest', 'itwiki', {
        start: new Date('2004-01-01'),
        end: new Date('2005-02-01')
    });

}
main();
```

The result of:

```typescript
import * as mhdscraper from 'mhdscraper';

async function main() {
    const result = await mhdscraper.fetchWikies('latest', {
        lang: 'it',
        wikitype: 'wiki',
        dumps: true,
        start: new Date('2010-01-01'),
        end: new Date('2012-12-31'),
    });
}
main();
```

Would be (as of July 2021):

```json
[
    {
        "dumps": [
            {
                "bytes": "691419132",
                "filename": "2021-06.itwiki.2010.tsv.bz2",
                "from": "2010-01-01",
                "lastUpdate": "2021-07-03T10:38:00",
                "time": "2010",
                "to": "2010-12-31",
                "url": "https://dumps.wikimedia.org/other/mediawiki_history/2021-06/itwiki/2021-06.itwiki.2010.tsv.bz2"
            },
            {
                "bytes": "706208269",
                "filename": "2021-06.itwiki.2011.tsv.bz2",
                "from": "2011-01-01",
                "lastUpdate": "2021-07-03T10:57:00",
                "time": "2011",
                "to": "2011-12-31",
                "url": "https://dumps.wikimedia.org/other/mediawiki_history/2021-06/itwiki/2021-06.itwiki.2011.tsv.bz2"
            },
            {
                "bytes": "747376403",
                "filename": "2021-06.itwiki.2012.tsv.bz2",
                "from": "2012-01-01",
                "lastUpdate": "2021-07-03T10:11:00",
                "time": "2012",
                "to": "2012-12-31",
                "url": "https://dumps.wikimedia.org/other/mediawiki_history/2021-06/itwiki/2021-06.itwiki.2012.tsv.bz2"
            }
        ],
        "url": "https://dumps.wikimedia.org/other/mediawiki_history/2021-06/itwiki",
        "wiki": "itwiki"
    }
]
```

## API

### `WIKI_URL`

It is a constant containing the url of the root of the datasets site

### `async fetchLatestVersion(options)`

Fetches the last version of the mediawiki history dumps.

The version is the year-month of the release of the dumps

Options' fields:
* __wikies__ (booleanean, default=false)_: If for each returned version the wikies will be fetched
* __lang__ _(string, default=undefined)_: If the wikies argument is `true`, the language of the wikies to return (a wiki name starts with the language).
* __wikitype__ _(string, default=undefined)_: If the wikies argument is `true`, the wiki type of the wikies to return (a wiki name ends with the wiki type).
* __dumps__ _(boolean, default=false)_: If for each returned wiki the wikies will be fetched
* __start__ _(Date, default=undefined)_: If the wikies and dumps arguments are `true`, retrieve only the dumps newer than this date
* __end__ _(Date, default=undefined)_: If the wikies and dumps arguments are `true`, retrieve only the dumps older than this date

Returns an object with:
*  `version` _(string)_ for the version year-month
*  `url` _(string)_ for the url of that version. 
*  `wikies` will contain the fetched wikies if the argument was set to `true`.  
If no version is found, `None` is returned.

### `fetchVersions(options)`

Fetch the versions of the mediawiki history dumps

The versions are the year-month of the release of the dumps

Options' fields:
* __wikies__ (boolean, default=False)_: If for each returned version the wikies will be fetched
* __lang__ _(string, default=undefined)_: If the wikies argument is `true`, the language of the wikies to return (a wiki name starts with the language).
* __wikitype__ _(string, default=undefined)_: If the wikies argument is `true`, the wiki type of the wikies to return (a wiki name ends with the wiki type).
* __dumps__ _(boolean, default=false)_: If for each returned wiki the wikies will be fetched
* __start__ _(Date, default=undefined)_: If the wikies and dumps arguments are `true`, retrieve only the dumps newer than this date
* __end__ _(Date, default=undefined)_: If the wikies and dumps arguments are `true`, retrieve only the dumps older than this date

Returns an array of objects with:
* `version` _(string)_ for the version year-month
* `url` _(string)_ for the url of that version. 
* `wikies` will contain the fetched wikies if the argument was set to `true` (see *fetch_wikies* to see the result).

### `fetchWikies(version, options)`

Fetch the wikies of a version of the mediawiki history dumps

Parameters:
* version _(string)_: The version whose wikies will be returned. If "latest" is passed, the latest version is retrieved.

Options' fields:
* lang _(string, default=undefined)_: The language of the wikies to return (a wiki name starts with the language).
* wikitype _(string, default=undefined)_: The wiki type of the wikies to return (a wiki name ends with the wiki type).
* dumps _(boolean, default=false)_: If for each returned wiki the dumps will be fetched
* start _(Date, default=undefined)_: If the dumps argument is `true`, retrieve only the dumps newer than this date
* end _(Date, default=undefined)_: If the dumps argument is `true`, retrieve only the dumps older than this date

Returns an array of objects with:
* `wiki` _(string)_ for the wiki name
* `url` _(string)_ for the url of that wiki. 
In addition, if the `dumps` argument is `true`, a `dumps` (array) field contain the fetched dumps (see *fetch_dumps* to see the reuslt).

### `fetchDumps(version, wiki, options)`

Fetch the dumps of a wiki of the mediawiki history dumps

Parameters:
* version _(string)_: The version of the wiki
* wiki _(string)_: The wiki whose dumps will be returned

Options' fields:
* start _(Date, default=undefined)_: Retrieve only the dumps newer than this date
* end _(Date, default=undefined)_: Retrieve only the dumps older than this date

Returns an array of objects with:
* `filename` _(string)_ for dump file name
* `time` _(string)_ for the time of the data (`'all-time'`, year or year-month
* `lastUpdate` _(Datetime)_ for the last update date
* `bytes` _(int)_ for the size in bytes of the file
* `from` _(Date)_ for the start date of the data
* `to` _(Date)_ for the end date of the data
* `url` _(string)_ the url of the file
