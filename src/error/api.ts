import { Response } from "express";
import { logger } from "../logger";

interface ApiError {
  code: ErrorCode; // Internal Code interne for error
  message: string; // explicite message
  details?: unknown; // other optional details
}

export enum ErrorCode {
  UNAUTHORIZED_ERROR = "UNAUTHORIZED_ERROR",
  INVALID_URI = "INVALID_URI",
  UNAUTHORIZED_HOST = "UNAUTHORIZED_HOST",
  SOURCE_FETCH_ERROR = "SOURCE_FETCH_ERROR",
  PDF_GENERATION_ERROR = "PDF_GENERATION_ERROR",
  INVALID_DATA = "INVALID_DATA",
}

export const handleError = (
  res: Response,
  code: ErrorCode,
  message: string,
  status = 500,
  details?: unknown,
  error?: unknown
) => {
  if (error) console.error(error);
  logger.error(`${message} : ${JSON.stringify(details)}`);
  return res.status(status).json({
    code,
    message,
    details,
  } as ApiError);
};
