import { LunaticData } from "@inseefr/lunatic";

/**
 * Parses and validates Lunatic data from an unknown input.
 *
 * This function recursively checks if the provided data matches the expected Lunatic data structure.
 * It looks for either a `COLLECTED` key (indicating valid Lunatic data) or a nested `data` key.
 * If neither is found, it throws an error.
 *
 * @param {unknown} supposedData - The input data to validate and parse as Lunatic data.
 * @returns {LunaticData} The validated Lunatic data object.
 *
 * @throws {Error} If the input is not an object, or if it does not contain the required `COLLECTED` or `data` keys.
 *                 - "Invalid Lunatic Data: Lunatic data has to be an object" if the input is not an object.
 *                 - "Invalid Lunatic Data" if the input does not contain `COLLECTED` or a nested `data` key.
 *
 * @example
 * // Example 1: Valid Lunatic data with "COLLECTED" key
 * const validLunaticData = { COLLECTED: {  ...  } };
 * const result = readLunaticData(validLunaticData); // Returns the input as LunaticData
 *
 * @example
 * // Example 2: Nested Lunatic data with "data" key
 * const nestedLunaticData = { data: { COLLECTED: {  ...  } } };
 * const result = readLunaticData(nestedLunaticData); // Returns the nested LunaticData
 *
 * @example
 * // Example 3: Invalid input (not an object)
 * const invalidData = "not an object";
 * const result = readLunaticData(invalidData); // Throws Error: "Invalid Lunatic Data: Lunatic data has to be an object"
 *
 * @example
 * // Example 4: Invalid Lunatic data (missing keys)
 * const invalidLunaticData = { otherKey: "value" };
 * const result = readLunaticData(invalidLunaticData); // Throws Error: "Invalid Lunatic Data"
 */
export const readLunaticData = (
  supposedData: unknown,
  canBeWrapped = true
): LunaticData => {
  if (typeof supposedData !== "object" || supposedData === null) {
    throw new Error("Invalid Lunatic Data: Lunatic data has to be an object");
  }
  if ("COLLECTED" in supposedData) return supposedData as LunaticData;
  if (canBeWrapped && "data" in supposedData)
    return readLunaticData(supposedData.data, false);
  throw new Error("Invalid Lunatic Data");
};
