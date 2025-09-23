import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import { logger } from "../logger";

// Middleware for logging request
export function loggerMiddleware(req: Request, _res: Response, next: NextFunction) {
    logger.info(`${req.method} ${req.url}`);
    next();
}

// Middleware for logging authenticated request
export function loggerAuthMiddleware(req: Request, _res: Response, next: NextFunction) {
    if (req.auth) {
        const username =
            req.auth.preferred_username || req.auth.email || req.auth.sub;
        logger.info(`Authenticated user: ${username}`);
    }
    next();
}

