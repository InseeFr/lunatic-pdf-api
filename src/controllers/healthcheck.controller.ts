import { Request, Response } from 'express';
import { logger } from '../logger';

export const healthcheck = async (_req: Request, res: Response) => {
    logger.debug("Health check called")
    return res.status(200).send("ok")
};
