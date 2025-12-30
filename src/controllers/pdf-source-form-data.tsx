import { renderToStream } from "@react-pdf/renderer";
import { Request, Response } from "express";
import type { LunaticData, LunaticSource } from "@inseefr/lunatic";
import { LunaticQuestionnaire } from "../components/LunaticQuestionnaire";
import { ErrorCode, handleError } from "../error/api";
import { logger } from "../logger";
import { readLunaticData } from "../utils/readLunaticData";

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

    const data = readLunaticData(JSON.parse(dataFile.buffer.toString("utf-8")));

    const pdfResult = await renderToStream(
      <LunaticQuestionnaire source={source} data={data} />
    );
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=export.pdf`);
    pdfResult.pipe(res);
    pdfResult.on("error", (err) => {
      return handleError(
        res,
        ErrorCode.PDF_GENERATION_ERROR,
        "Failed to generate PDF.",
        500,
        { error: err instanceof Error ? err.message : err },
        err
      );
    });
    logger.info("PDF successfully generated");
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
