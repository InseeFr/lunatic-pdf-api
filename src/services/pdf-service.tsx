import { renderToStream } from "@react-pdf/renderer";
import { LunaticQuestionnaire } from "../components/LunaticQuestionnaire";
import { ErrorCode, handleError } from "../error/api";
import { logger } from "../logger";
import { LunaticSource } from "@inseefr/lunatic";
import { Response } from "express";

export const generatePdfStream = async (
  res: Response,
  source: LunaticSource,
  data: any
) => {
  try {
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
