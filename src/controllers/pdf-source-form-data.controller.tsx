import { Request, Response } from "express";
import type { LunaticSource } from "@inseefr/lunatic";
import { ErrorCode, handleError } from "../error/api";
import { readAndValidateLunaticData } from "../services/data-service";
import { generatePdfStream } from "../services/pdf-service";
import { PdfRequestFromFormData } from "../types";

export const generatePdf = async (req: Request, res: Response) => {
  const sourceFile = (req as PdfRequestFromFormData).files.source[0];
  const dataFile = (req as PdfRequestFromFormData).files.data[0];

  try {
    const source: LunaticSource = JSON.parse(
      sourceFile.buffer.toString("utf-8")
    );

    const data = readAndValidateLunaticData(
      res,
      JSON.parse(dataFile.buffer.toString("utf-8"))
    );
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
