import * as express from 'express';
import * as helmet from 'helmet';
import * as morgan from 'morgan';
import * as cors from 'cors';
import { Logger } from 'euberlog';
import { WIKI_URL, fetchLatestVersion, fetchVersions, fetchWikies, fetchDumps } from 'mhdscraper';

import asyncHandler from './utils/asyncHandler';
import errorHandler from './utils/errorHandler';
import { parseDumpQueryParams, parseVersionQueryParams, parseWikiQueryParams } from './utils/queryParams';

const PORT = process.env.PORT ?? 3000;

const logger = new Logger();

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(errorHandler());

app.get('/origin', (_req, res) => {
    res.json(WIKI_URL);
});

app.get(
    '/versions/latest',
    asyncHandler(async (req, res) => {
        const options = parseVersionQueryParams(req.query as any);
        const latestVersion = await fetchLatestVersion(options);
        res.json(latestVersion);
    })
);

app.get(
    '/versions',
    asyncHandler(async (req, res) => {
        const options = parseVersionQueryParams(req.query as any);
        const versions = await fetchVersions(options);
        res.json(versions);
    })
);

app.get(
    '/versions/:version/wikies',
    asyncHandler(async (req, res) => {
        const version = req.params.version;
        const options = parseWikiQueryParams(req.query as any);
        const versions = await fetchWikies(version, options);
        res.json(versions);
    })
);

app.get(
    '/versions/:version/wikies/:wiki/dumps',
    asyncHandler(async (req, res) => {
        const { version, wiki } = req.params;
        const options = parseDumpQueryParams(req.query as any);
        const versions = await fetchDumps(version, wiki, options);
        res.json(versions);
    })
);

app.listen(PORT, () => {
    logger.info('Server listening at port', PORT);
});
