import { Request, Response, NextFunction } from "express";
import { ErrorCode, handleError } from "../error/api";
import { PdfRequestFromFormData } from "../types";

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
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const sourceFile = (req as PdfRequestFromFormData).files.source[0];
  const dataFile = (req as PdfRequestFromFormData).files.data[0];

  if (!sourceFile || !dataFile) {
    return handleError(
      res,
      ErrorCode.INVALID_URI,
      "Missing source file or data file ",
      400
    );
  }
  next();
};
