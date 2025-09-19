import { Response } from "express";

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
    PDF_GENERATION_ERROR = "PDF_GENERATION_ERROR"
}

export const errorResponse = (res: Response, code: ErrorCode, message: string, status = 500, details?: unknown) => {
    return res.status(status).json({
        code,
        message,
        details,
    } as ApiError);
};
