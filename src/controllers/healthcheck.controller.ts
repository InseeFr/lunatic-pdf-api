import { Request, Response } from 'express';

export const healthcheck = async (_req: Request, res: Response) => {
    return res.status(200).send("ok")
};
