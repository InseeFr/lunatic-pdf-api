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

    const data = readAndValidateLunaticData(interrogationData);

    await generatePdfStream(res, source, data, interrogationProps);
  } catch (e) {

    if (e instanceof Error && e.message.includes("Invalid Lunatic Data")) {
      return handleError(
        res,
        ErrorCode.INVALID_DATA,
        "Invalid Lunatic Data.",
        400,
        { error: e.message },
        e
      );
    }

    // Handle PDF generation errors
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
