import { readLunaticData } from "../utils/readLunaticData";
import { ErrorCode, handleError } from "../error/api";
import { Response } from "express";

export const readAndValidateLunaticData = (res: Response, data: any) => {
  try {
    return readLunaticData(data);
  } catch (e) {
    return handleError(
      res,
      ErrorCode.INVALID_DATA,
      "Invalid Lunatic Data.",
      400,
      { error: e instanceof Error ? e.message : e }
    );
  }
};
