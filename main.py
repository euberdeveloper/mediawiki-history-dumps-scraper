from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional
from datetime import date

import whdtscraper


app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get('/origin')
def get_origin():
    return whdtscraper.WIKI_URL


@app.get('/versions/latest')
def get_latest_version(wikies: bool = False, lang: str = None, wikitype: str = None, dumps: bool = False, start: Optional[date] = None, end: Optional[date] = None):
    return whdtscraper.fetch_latest_version(wikies=wikies, lang=lang, wikitype=wikitype, dumps=dumps, start=start, end=end)


@app.get('/versions')
def get_versions(wikies: bool = False, lang: str = None, wikitype: str = None, dumps: bool = False, start: Optional[date] = None, end: Optional[date] = None):
    return whdtscraper.fetch_versions(wikies=wikies, lang=lang, wikitype=wikitype, dumps=dumps, start=start, end=end)


@app.get('/versions/{version}/wikies')
def get_wikies(version: str, lang: str = None, wikitype: str = None, dumps: bool = False, start: Optional[date] = None, end: Optional[date] = None):
    return whdtscraper.fetch_wikies(version, lang=lang, wikitype=wikitype, dumps=dumps, start=start, end=end)


@app.get('/versions/{version}/wikies/{wiki}/dumps')
def get_dumps(version: str, wiki: str, start: Optional[date] = None, end: Optional[date] = None):
    return whdtscraper.fetch_dumps(version, wiki, start=start, end=end)
