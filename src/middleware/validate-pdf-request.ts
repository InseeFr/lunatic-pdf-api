import { Request, Response, NextFunction } from "express";
import { ErrorCode, handleError } from "../error/api";
import { PdfRequestFromBody } from "../models/types";


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
