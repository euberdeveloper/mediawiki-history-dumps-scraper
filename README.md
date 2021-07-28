# mediawiki-history-dumps-scraper

This are the **python api** of "Mediawiki history dumps scraper", refer to the [main branch](https://github.com/euberdeveloper/mediawiki-history-dumps-scraper) to see in general the projects' purpose.

## What does the api do?

This api allow you to get (also selectively), wrapping the **[pip module](https://github.com/euberdeveloper/mediawiki-history-dumps-scraper/blob/pip/README.md)**, the available content in [Mediawiki history dumps](https://dumps.wikimedia.org/other/mediawiki_history/readme.html). You can check wich versions are available, which language, which datasets, the download links, the size...

## How was it made?

This API are written in **Python 3.9** and use **FastAPI** as framework. The package manager is **pipenv**, because it is far better than just pip and because it has a useful commands-from-Pipfile shortcut. It is also linted with **pylint**.

## How to use it?

1. Clone this repository 

    `git clone https://github.com/euberdeveloper/mediawiki-history-dumps-scraper.git`
2. Change branch

    `git checkout server-python`
3. Install the dependencies and create virtualenv (with pipenv)

    `pipenv install`
4. Start the server for deveelopment

    `pipenv run dev`

    Or start it for production (with gunicorn)

    `pipenv run start`
5. The api are now listening at `http://localhost:3000` (note that for the production you need to specify a `PORT` env var)
## API

### /origin

Returns the url of the root of the datasets site

### /versions/latest

Fetches the last version of the mediawiki history dumps.

The version is the year-month of the release of the dumps

Query parameters:
* __wikies__ (_bool, default=False)_: If for each returned version the wikies will be fetched
* __lang__ _(str, default=None)_: If the wikies argument is True, the language of the wikies to return (a wiki name starts with the language).
* __wikitype__ _(str, default=None)_: If the wikies argument is True, the wiki type of the wikies to return (a wiki name ends with the wiki type).
* __dumps__ _(bool, default=false)_: If for each returned wiki the wikies will be fetched
* __start__ _(date, default=None)_: If the wikies and dumps arguments are True, retrieve only the dumps newer than this date
* __end__ _(date, default=None)_: If the wikies and dumps arguments are True, retrieve only the dumps older than this date

Returns a json with:
*  `version` _(str)_ for the version year-month
*  `url` _(str)_ for the url of that version. 
*  `wikies` will contain the fetched wikies if the argument was set to True.  
If no version is found, `None` is returned.

### /versions

Fetch the versions of the mediawiki history dumps

The versions are the year-month of the release of the dumps

Query parameters:
* __wikies__ (_bool, default=False)_: If for each returned version the wikies will be fetched
* __lang__ _(str, default=None)_: If the wikies argument is True, the language of the wikies to return (a wiki name starts with the language).
* __wikitype__ _(str, default=None)_: If the wikies argument is True, the wiki type of the wikies to return (a wiki name ends with the wiki type).
* __dumps__ _(bool, default=false)_: If for each returned wiki the wikies will be fetched
* __start__ _(date, default=None)_: If the wikies and dumps arguments are True, retrieve only the dumps newer than this date
* __end__ _(date, default=None)_: If the wikies and dumps arguments are True, retrieve only the dumps older than this date

Returns an array of objects with:
* `version` _(str)_ for the version year-month
* `url` _(str)_ for the url of that version. 
* `wikies` will contain the fetched wikies if the argument was set to True (see *fetch_wikies* to see the result).

### /versions/_:version_/wikies

Fetch the wikies of a version of the mediawiki history dumps

Path parameters:
* version _(str)_: The version whose wikies will be returned. If "latest" is passed, the latest version is retrieved.

Query parameters:
* lang _(str, default=None)_: The language of the wikies to return (a wiki name starts with the language).
* wikitype _(str, default=None)_: The wiki type of the wikies to return (a wiki name ends with the wiki type).
* dumps _(bool, default=false)_: If for each returned wiki the dumps will be fetched
* start _(date, default=None)_: If the dumps argument is True, retrieve only the dumps newer than this date
* end _(date, default=None)_: If the dumps argument is True, retrieve only the dumps older than this date

Returns an array of objects with:
* `wiki` _(str)_ for the wiki name
* `url` _(str)_ for the url of that wiki. 
In addition, if the `dumps` argument is True, a `dumps` (list) field contain the fetched dumps (see *fetch_dumps* to see the reuslt).

### /versions/_:version_/wikies/_:wiki_/dumps

Fetch the dumps of a wiki of the mediawiki history dumps

Path parameters:
* version _(str)_: The version of the wiki
* wiki _(str)_: The wiki whose dumps will be returned

Query parameters:
* start _(date, default=None)_: Retrieve only the dumps newer than this date
* end _(date, default=None)_: Retrieve only the dumps older than this date

Returns an array of objects with:
* `filename` _(str)_ for dump file name
* `time` _(str)_ for the time of the data (`'all-time'`, year or year-month
* `lastUpdate` _(datetime)_ for the last update date
* `bytes` _(int)_ for the size in bytes of the file
* `from` _(date)_ for the start date of the data
* `to` _(date)_ for the end date of the data
* `url` _(str)_ the url of the file
