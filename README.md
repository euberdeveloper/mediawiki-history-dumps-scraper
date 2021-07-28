# mediawiki-history-dumps-scraper

"Mediawiki history dumps scraper" (**mhdscraper**) is a project that should make easier to write scripts that automatize things such as downloading the "Mediawiki history dumps" dataset.

## Mediawiki history dumps

[Mediawiki history dumps](https://dumps.wikimedia.org/archive/) is a dataset hosted by Wikimedia that contains the history of all events that ever happened in the Wikipedias of all the languages. It is recomputed every month and, in contrast with the XML dumps, is lighter due to the omission of pages' content and in TSV format. [Here](https://wikitech.wikimedia.org/wiki/Analytics/Data_Lake/Edits/Mediawiki_history_dumps) you can have more information.

## The purpose of the project

Manually downloading all the datasets would be a very tedious task and simple bash scripts could not be effective, because file names change in base of the language (actually its size) and every month a new version is added and an old version removed. This project uses the technique of **scraping** to provide the best way to download or just know which content is available on the dataset.

## Branches of the project

This project **contains nothing in the main branch** because it is divided in:
* __[pip](https://github.com/euberdeveloper/mediawiki-history-dumps-scraper/tree/pip)__: A pip module that provides functions to (selectively) get information of the available dumps
* __[npm](https://github.com/euberdeveloper/mediawiki-history-dumps-scraper/tree/npm)__: An npm module that provides functions to (selectively) get information of the available dumps
* __[server-python](https://github.com/euberdeveloper/mediawiki-history-dumps-scraper/tree/server-python)__: A python server that wraps the pip module and provides APIs to get the information.
* __[server-nodejs](https://github.com/euberdeveloper/mediawiki-history-dumps-scraper/tree/server-nodejs)__: A nodejs server that wraps the npm module and provides APIs to get the information.