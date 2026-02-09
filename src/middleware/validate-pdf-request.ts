import { Request, Response, NextFunction } from "express";
import { ErrorCode, handleError } from "../error/api";
import { PdfRequestFromBody } from "../models/types";
import { logger } from "../logger";

/**
 * Check if request has a valid sourceUrl as query param
 * @param req
 * @param res
 * @param next
 * @returns
 */
export const validatePdfUriRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const sourceUri = req.query.source as string;
  if (!sourceUri) {
    return handleError(res, ErrorCode.INVALID_URI, "Missing source URI", 400);
  }
  try {
    // try to convert to URL
    new URL(sourceUri);
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

  next();
};

export const validatePdfFormDataRequest = (
  req: PdfRequestFromBody,
  res: Response,
  next: NextFunction
) => {
  const requestBody = req.body;
  if (!requestBody) {
    return handleError(res, ErrorCode.INVALID_REQUEST, "Missing body", 400);
  }

  const source = requestBody.source;
  const interrogation = requestBody.interrogation;

  if (!source || !interrogation) {
    return handleError(
      res,
      ErrorCode.INVALID_URI,
      "Missing source or interrogation",
      400
    );
  }
  next();
};
