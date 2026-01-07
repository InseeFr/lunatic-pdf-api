import { LunaticData } from "@inseefr/lunatic";
import { readLunaticData } from "./readLunaticData";
import { describe, it, expect } from "vitest";

describe("readLunaticData", () => {
  // Test 1: Valid Lunatic data with "COLLECTED" key
  it('should return LunaticData if "COLLECTED" key is present', () => {
    const validData: LunaticData = {
      COLLECTED: { VAR: { COLLECTED: "test" } },
    };
    const result = readLunaticData(validData);
    expect(result).toEqual(validData);
  });

  // Test 2: Nested Lunatic data with "data" key
  it('should recursively read LunaticData if "data" key is present', () => {
    const nestedData = {
      data: {
        COLLECTED: { VAR: { COLLECTED: "test" } },
      },
    };
    const result = readLunaticData(nestedData);
    expect(result).toEqual(nestedData.data);
  });

  // Test 3: Invalid input (not an object)
  it("should throw an error if input is not an object", () => {
    const invalidData = "not an object";
    expect(() => readLunaticData(invalidData)).toThrow(
      "Invalid Lunatic Data: Lunatic data has to be an object"
    );
  });

  // Test 4: Invalid Lunatic data (missing keys)
  it('should throw an error if neither "COLLECTED" nor "data" keys are present', () => {
    const invalidData = { otherKey: "value" };
    expect(() => readLunaticData(invalidData)).toThrow("Invalid Lunatic Data");
  });

  // Test 5: Null input
  it("should throw an error if input is null", () => {
    const nullData = null;
    expect(() => readLunaticData(nullData)).toThrow(
      "Invalid Lunatic Data: Lunatic data has to be an object"
    );
  });

  // Test 6: Empty object
  it("should throw an error if input is an empty object", () => {
    const emptyData = {};
    expect(() => readLunaticData(emptyData)).toThrow("Invalid Lunatic Data");
  });
});
