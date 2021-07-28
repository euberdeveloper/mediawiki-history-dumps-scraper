from typing import Optional
from datetime import date
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import mhdscraper


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
    return mhdscraper.WIKI_URL


@app.get('/versions/latest')
def get_latest_version(wikies: bool = False, lang: str = None, wikitype: str = None, dumps: bool = False, start: Optional[date] = None, end: Optional[date] = None):
    return mhdscraper.fetch_latest_version(wikies=wikies, lang=lang, wikitype=wikitype, dumps=dumps, start=start, end=end)


@app.get('/versions')
def get_versions(wikies: bool = False, lang: str = None, wikitype: str = None, dumps: bool = False, start: Optional[date] = None, end: Optional[date] = None):
    return mhdscraper.fetch_versions(wikies=wikies, lang=lang, wikitype=wikitype, dumps=dumps, start=start, end=end)


@app.get('/versions/{version}/wikies')
def get_wikies(version: str, lang: str = None, wikitype: str = None, dumps: bool = False, start: Optional[date] = None, end: Optional[date] = None):
    return mhdscraper.fetch_wikies(version, lang=lang, wikitype=wikitype, dumps=dumps, start=start, end=end)


@app.get('/versions/{version}/wikies/{wiki}/dumps')
def get_dumps(version: str, wiki: str, start: Optional[date] = None, end: Optional[date] = None):
    return mhdscraper.fetch_dumps(version, wiki, start=start, end=end)
