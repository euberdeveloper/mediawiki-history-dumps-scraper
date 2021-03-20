import * as express from 'express';
import * as helmet from 'helmet';
import * as morgan from 'morgan';
import * as cors from 'cors';
import * as compress from 'compress';

import {  } from 'whdtscraper';

const app = express();

app.use(compress());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

