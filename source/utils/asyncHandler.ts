import { RequestHandler, Request, Response, NextFunction } from 'express';

export default function (fn: RequestHandler): RequestHandler {
    return async (req: Request, res: Response, next: NextFunction) => Promise.resolve(fn(req, res, next)).catch(next);
}
