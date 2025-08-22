import { Request, Response } from 'express';

export const generatePdf = async (req: Request, res: Response) => {
    const source = req.query.source as string | undefined;

    const data = req.body;

    return res.send({ url: source, data: data })
};
