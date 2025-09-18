import { renderToStream } from "@react-pdf/renderer";
import { Request, Response } from "express";
import type { LunaticData, LunaticSource } from "@inseefr/lunatic";
import { LunaticQuestionnaire } from "../components/LunaticQuestionnaire";
import config from "../config/config";
import { errorResponse } from "../error/api";

const { trustUriDomains } = config;

const handleError = (
  res: Response,
  code: string,
  message: string,
  status = 500,
  details?: unknown,
  error?: unknown
) => {
  console.error(error);
  return errorResponse(res, code, message, status, details);
};

const isUriAuthorized = (uri: string): boolean => {
  const url = new URL(uri);
  return trustUriDomains.some((trustDomain) => url.host.endsWith(trustDomain));
};

export const generatePdf = async (req: Request, res: Response) => {
  const data = req.body as { data: LunaticData };
  let sourceUri = req.query.source as string;

  if (!sourceUri) {
    return handleError(res, "INVALID_URI", "Missing source URI", 400);
  }

  let url: URL;
  try {
    url = new URL(sourceUri);
  } catch (e) {
    return handleError(
      res,
      "INVALID_URI",
      "The provided URI is invalid.",
      400,
      { uri: sourceUri }
    );
  }

  if (!isUriAuthorized(url.toString())) {
    return handleError(
      res,
      "UNAUTHORIZED_HOST",
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
        "SOURCE_FETCH_FAILED",
        "Failed to fetch the source.",
        responseSource.status
      );
    }
    source = await responseSource.json();
  } catch (e) {
    return handleError(
      res,
      "SOURCE_FETCH_ERROR",
      "An error occurred while fetching the source.",
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
        "PDF_GENERATION_ERROR",
        "Failed to generate PDF.",
        500,
        { error: err }
      );
    });
  } catch (e) {
    return errorResponse(
      res,
      "PDF_GENERATION_ERROR",
      "Failed to generate PDF.",
      500,
      { error: e instanceof Error ? e.message : e }
    );
  }
};
