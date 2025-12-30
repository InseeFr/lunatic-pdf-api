import { renderToStream } from "@react-pdf/renderer";
import type { LunaticSource } from "@inseefr/lunatic";
import { Request, Response } from "express";
import { LunaticQuestionnaire } from "../components/LunaticQuestionnaire";
import config from "../config/config";
import { ErrorCode, handleError } from "../error/api";
import { logger } from "../logger";
import { readLunaticData } from "../utils/readLunaticData";

const { trustUriDomains } = config;

const isUriAuthorized = (uri: string): boolean => {
  const url = new URL(uri);
  return trustUriDomains.some((trustDomain) => url.host.endsWith(trustDomain));
};

export const generatePdf = async (req: Request, res: Response) => {
  const data = readLunaticData(req.body);
  let sourceUri = req.query.source as string;

  logger.info(`Generating PDF (source=${sourceUri ?? "none"})`);

  if (!sourceUri) {
    return handleError(res, ErrorCode.INVALID_URI, "Missing source URI", 400);
  }

  let url: URL;
  try {
    url = new URL(sourceUri);
  } catch (e) {
    return handleError(
      res,
      ErrorCode.INVALID_URI,
      "The provided URI is invalid.",
      400,
      { uri: sourceUri },
      { error: e instanceof Error ? e.message : e }
    );
  }

  if (!isUriAuthorized(url.toString())) {
    return handleError(
      res,
      ErrorCode.UNAUTHORIZED_HOST,
      "The host is not authorized.",
      403,
      { host: url.host }
    );
  }

  let source: LunaticSource;
  try {
    const responseSource = await fetch(sourceUri);
    if (!responseSource.ok) {
      return handleError(
        res,
        ErrorCode.SOURCE_FETCH_ERROR,
        "Failed to fetch the source.",
        responseSource.status
      );
    }
    source = await responseSource.json();
  } catch (e) {
    return handleError(
      res,
      ErrorCode.SOURCE_FETCH_ERROR,
      "An error occurred while fetching the source.",
      500,
      { error: e instanceof Error ? e.message : e },
      e
    );
  }
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
