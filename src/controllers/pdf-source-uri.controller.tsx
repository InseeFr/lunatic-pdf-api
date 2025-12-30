import type { LunaticSource } from "@inseefr/lunatic";
import { Request, Response } from "express";
import config from "../config/config";
import { ErrorCode, handleError } from "../error/api";
import { logger } from "../logger";
import { readAndValidateLunaticData } from "../services/data-service";
import { generatePdfStream } from "../services/pdf-service";

const { trustUriDomains, schemesList } = config;

const isUriAuthorized = (uri: URL): boolean => {
  return (
    schemesList.includes(uri.protocol) &&
    trustUriDomains.some((trustDomain) => uri.hostname.endsWith(trustDomain))
  );
};

export const generatePdf = async (req: Request, res: Response) => {
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
