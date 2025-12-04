import { renderToStream } from "@react-pdf/renderer";
import { Request, Response } from "express";
import type { LunaticData, LunaticSource } from "@inseefr/lunatic";
import { LunaticQuestionnaire } from "../components/LunaticQuestionnaire";
import config from "../config/config";
import { ErrorCode, errorResponse } from "../error/api";
import { logger } from "../logger";
import { Nomenclature } from "../models/nomenclature";

const { trustUriDomains } = config;

const handleError = (
  res: Response,
  code: ErrorCode,
  message: string,
  status = 500,
  details?: unknown,
  error?: unknown
) => {
  console.error(error);
  logger.error(message);
  return errorResponse(res, code, message, status, details);
};

const isUriAuthorized = (uri: string): boolean => {
  const url = new URL(uri);
  return trustUriDomains.some((trustDomain) => url.host.endsWith(trustDomain));
};

export const generatePdf = async (req: Request, res: Response) => {
  const data = req.body as { data: LunaticData };
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
      return errorResponse(
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
      { error: e instanceof Error ? e.message : e }
    );
  }

  //TODO: cache
  let nomenclatures: Nomenclature[];
  try {
    const responseNomenclature = await fetch(sourceUri);
    if (!responseNomenclature.ok) {
      return errorResponse(
        res,
        ErrorCode.SOURCE_FETCH_ERROR,
        "Failed to fetch the nomenclature.",
        responseNomenclature.status
      );
    }
    nomenclatures = await responseNomenclature.json();
  } catch (e) {
    return handleError(
      res,
      ErrorCode.SOURCE_FETCH_ERROR,
      "An error occurred while fetching the nomenclature.",
      500,
      { error: e instanceof Error ? e.message : e }
    );
  }
  try {
    const pdfResult = await renderToStream(
      <LunaticQuestionnaire source={source} data={data.data} />
    );
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=export.pdf`);
    pdfResult.pipe(res);
    pdfResult.on("error", (err) => {
      errorResponse(
        res,
        ErrorCode.PDF_GENERATION_ERROR,
        "Failed to generate PDF.",
        500,
        { error: err }
      );
    });
    logger.info("PDF successfully generated");
  } catch (e) {
    return errorResponse(
      res,
      ErrorCode.PDF_GENERATION_ERROR,
      "Failed to generate PDF.",
      500,
      { error: e instanceof Error ? e.message : e }
    );
  }
};
