import { readLunaticData } from "../utils/readLunaticData";
import { LunaticData } from "@inseefr/lunatic";

export const readAndValidateLunaticData = (data: unknown): LunaticData => {
  return readLunaticData(data);
};
