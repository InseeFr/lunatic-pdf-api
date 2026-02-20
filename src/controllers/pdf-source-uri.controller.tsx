import type { LunaticSource } from "@inseefr/lunatic";
import { Response } from "express";
import { ErrorCode, handleError } from "../error/api";
import { logger } from "../logger";
import { readAndValidateLunaticData } from "../services/data-service";
import { generatePdfStream } from "../services/pdf-service";
import config from "../config/config";
import { PdfRequestFromUri } from "../models/types";

const { trustUriDomains } = config;

const schemesList = new Set(["https:", "http:"]);

const isUriAuthorized = (uri: URL): boolean => {
  return (
    schemesList.has(uri.protocol) &&
    trustUriDomains.some((trustDomain) => uri.hostname.endsWith(trustDomain))
  );
};

export const generatePdf = async (req: PdfRequestFromUri, res: Response) => {
  const sourceUri = req.query.source as string;

  logger.info(`generate PDF: (source=${sourceUri ?? "none"})`);

  const url = new URL(sourceUri);

  if (!isUriAuthorized(url)) {
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
    const responseSource = await fetch(url);
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
  const data = readAndValidateLunaticData(res, req.body);
  await generatePdfStream(res, source, data);
};
