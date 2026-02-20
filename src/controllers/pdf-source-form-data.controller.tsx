import { Response } from "express";
import { ErrorCode, handleError } from "../error/api";
import { readAndValidateLunaticData } from "../services/data-service";
import { generatePdfStream } from "../services/pdf-service";
import { PdfRequestFromBody } from "../models/types";
import { logger } from "../logger";

export const generatePdf = async (req: PdfRequestFromBody, res: Response) => {
  const requestBody = req.body;
  try {
    const source = requestBody.source;
    const { data: interrogationData, ...interrogationProps } = requestBody.interrogation;
    logger.info(`generate PDF with params: ${JSON.stringify(interrogationProps)}`)
    const data = readAndValidateLunaticData(res, interrogationData);
    await generatePdfStream(res, source, data, interrogationProps);
  } catch (e) {
    return handleError(
      res,
      ErrorCode.PDF_GENERATION_ERROR,
      "failed to generate PDF",
      500,
      { error: e instanceof Error ? e.message : e },
      e
    );
  }
};
