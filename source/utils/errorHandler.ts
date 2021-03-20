import { ErrorRequestHandler } from 'express';
import { Logger } from 'euberlog';

const logger = new Logger();

export default function (): ErrorRequestHandler {
    return (err, _req, res, _next) => {
        logger.error('Server error', err);
        res.status(500).send('Internal server error');
    };
}
