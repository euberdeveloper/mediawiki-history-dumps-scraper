# mediawiki-history-dumps-scraper

This are the **nodejs api** of "Mediawiki history dumps scraper", refer to the [main branch](https://github.com/euberdeveloper/mediawiki-history-dumps-scraper) to see in general the projects' purpose.

## What does the api do?

This api allow you to get (also selectively), wrapping the **[npm module](https://github.com/euberdeveloper/mediawiki-history-dumps-scraper/blob/npm/README.md)**, the available content in [Mediawiki history dumps](https://dumps.wikimedia.org/other/mediawiki_history/readme.html). You can check wich versions are available, which language, which datasets, the download links, the size...

## How was it made?

This API are written in **Typescript** and use **express** as framework. It is also linted with **eslint** and **prettier**, and bundled with **webpack**.

## How to use it?

### Locally

1. Clone this repository 

    `git clone https://github.com/euberdeveloper/mediawiki-history-dumps-scraper.git`
2. Change branch

    `git checkout server-nodejs`
3. Install the dependencies

    `npm install`
4. Start the server

    `npm run serve`
5. The api are now listening at `http://localhost:3000` (note that you can specify a `PORT` env var)


### With docker

You can build on yourown the docker image by using the Dockerfile in the repository. 

Alternatively, you can pull the image from the dockerhub repo `euberdeveloper/mhdscraper-nodejs`. 

Note that the `PORT` env var is mandatory.

### With heroku

I have published these API with Heroku at [https://mhdscraper-nodejs.herokuapp.com](https://mhdscraper-nodejs.herokuapp.com).
However, Heroku for free has limited minutes and probably sometimes it will be down.
## API

### /origin

Returns the url of the root of the datasets site

### /versions/latest

Fetches the last version of the mediawiki history dumps.

The version is the year-month of the release of the dumps

Query parameters:
* __wikies__ (boolean, default=false)_: If for each returned version the wikies will be fetched
* __lang__ _(string, default=undefined)_: If the wikies argument is True, the language of the wikies to return (a wiki name starts with the language).
* __wikitype__ _(string, default=undefined)_: If the wikies argument is True, the wiki type of the wikies to return (a wiki name ends with the wiki type).
* __dumps__ _(boolean, default=false)_: If for each returned wiki the wikies will be fetched
* __start__ _(Date, default=undefined)_: If the wikies and dumps arguments are True, retrieve only the dumps newer than this Date
* __end__ _(Date, default=undefined)_: If the wikies and dumps arguments are True, retrieve only the dumps older than this Date

Returns a json with:
*  `version` _(string)_ for the version year-month
*  `url` _(string)_ for the url of that version. 
*  `wikies` will contain the fetched wikies if the argument was set to True.  
If no version is found, `undefined` is returned.

### /versions

Fetch the versions of the mediawiki history dumps

The versions are the year-month of the release of the dumps

Query parameters:
* __wikies__ (boolean, default=false)_: If for each returned version the wikies will be fetched
* __lang__ _(string, default=undefined)_: If the wikies argument is True, the language of the wikies to return (a wiki name starts with the language).
* __wikitype__ _(string, default=undefined)_: If the wikies argument is True, the wiki type of the wikies to return (a wiki name ends with the wiki type).
* __dumps__ _(boolean, default=false)_: If for each returned wiki the wikies will be fetched
* __start__ _(Date, default=undefined)_: If the wikies and dumps arguments are True, retrieve only the dumps newer than this Date
* __end__ _(Date, default=undefined)_: If the wikies and dumps arguments are True, retrieve only the dumps older than this Date

Returns an array of objects with:
* `version` _(string)_ for the version year-month
* `url` _(string)_ for the url of that version. 
* `wikies` will contain the fetched wikies if the argument was set to True (see *fetch_wikies* to see the result).

### /versions/_:version_/wikies

Fetch the wikies of a version of the mediawiki history dumps

Path parameters:
* version _(string)_: The version whose wikies will be returned. If "latest" is passed, the latest version is retrieved.

Query parameters:
* lang _(string, default=undefined)_: The language of the wikies to return (a wiki name starts with the language).
* wikitype _(string, default=undefined)_: The wiki type of the wikies to return (a wiki name ends with the wiki type).
* dumps _(boolean, default=false)_: If for each returned wiki the dumps will be fetched
* start _(Date, default=undefined)_: If the dumps argument is True, retrieve only the dumps newer than this Date
* end _(Date, default=undefined)_: If the dumps argument is True, retrieve only the dumps older than this Date

Returns an array of objects with:
* `wiki` _(string)_ for the wiki name
* `url` _(string)_ for the url of that wiki. 
In addition, if the `dumps` argument is True, a `dumps` (list) field contain the fetched dumps (see *fetch_dumps* to see the reuslt).

### /versions/_:version_/wikies/_:wiki_/dumps

Fetch the dumps of a wiki of the mediawiki history dumps

Path parameters:
* version _(string)_: The version of the wiki
* wiki _(string)_: The wiki whose dumps will be returned

Query parameters:
* start _(Date, default=undefined)_: Retrieve only the dumps newer than this Date
* end _(Date, default=undefined)_: Retrieve only the dumps older than this Date

Returns an array of objects with:
* `filename` _(string)_ for dump file name
* `time` _(string)_ for the time of the data (`'all-time'`, year or year-month
* `lastUpDate` _(Date)_ for the last upDate Date
* `bytes` _(number)_ for the size in bytes of the file
* `from` _(Date)_ for the start Date of the data
* `to` _(Date)_ for the end Date of the data
* `url` _(string)_ the url of the file
