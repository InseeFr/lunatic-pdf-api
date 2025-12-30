import { Request, Response } from "express";
import type { LunaticSource } from "@inseefr/lunatic";
import { ErrorCode, handleError } from "../error/api";
import { readAndValidateLunaticData } from "../services/data-service";
import { generatePdfStream } from "../services/pdf-service";

export const generatePdf = async (req: Request, res: Response) => {
  const sourceFile = (req.files as { source?: Express.Multer.File[] })
    .source?.[0];
  const dataFile = (req.files as { data?: Express.Multer.File[] }).data?.[0];

  if (!sourceFile || !dataFile) {
    return handleError(
      res,
      ErrorCode.INVALID_URI,
      "Missing source file or data file ",
      400
    );
  }
  try {
    const source = JSON.parse(
      sourceFile.buffer.toString("utf-8")
    ) as LunaticSource;

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
