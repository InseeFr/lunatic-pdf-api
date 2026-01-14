import { Response } from "express";
import { ErrorCode, handleError } from "../error/api";
import { readAndValidateLunaticData } from "../services/data-service";
import { generatePdfStream } from "../services/pdf-service";
import { PdfRequestFromBody } from "../types";

export const generatePdf = async (req: PdfRequestFromBody, res: Response) => {
  const requestBody = req.body;
  try {
    const source = requestBody.source;
    const data = readAndValidateLunaticData(res, requestBody.interrogation);
    await generatePdfStream(res, source, data);
  } catch (e) {
    return handleError(
      res,
      ErrorCode.PDF_GENERATION_ERROR,
      "Failed to generate PDF.",
      500,
      { error: e instanceof Error ? e.message : e },
      e
    );
  }
};
