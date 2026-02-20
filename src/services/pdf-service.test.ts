import { describe, it, expect, vi, beforeEach } from "vitest";
import { generatePdfStream } from "./pdf-service";
import { renderToStream } from "@react-pdf/renderer";
import { LunaticQuestionnaire } from "../components/LunaticQuestionnaire";
import { ErrorCode } from "../error/api";
import { LunaticData, LunaticSource } from "@inseefr/lunatic";
import { InterrogationInfos } from "../models/types";

vi.mock("@react-pdf/renderer", () => {
  return {
    renderToStream: vi.fn(),
  };
});

vi.mock("../components/LunaticQuestionnaire", () => {
  return {
    LunaticQuestionnaire: vi.fn(),
  };
});

describe("generatePdfStream", () => {
  let mockRes: any;
  let mockPdfResult: any;

  beforeEach(() => {
    vi.clearAllMocks();

    // Mock of express's Response
    mockRes = {
      setHeader: vi.fn(),
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
      pipe: vi.fn(),
    };

    // Mock of pdfResult (stream)
    mockPdfResult = {
      pipe: vi.fn(),
      on: vi.fn(),
    };

    // Mock renderToStream to return mockPdfResult
    vi.mocked(renderToStream).mockResolvedValue(mockPdfResult);
  });

  it("should generate PDF stream successfully", async () => {
    const mockSource = {} as LunaticSource;
    const mockData = {} as LunaticData;
    const mockInterrogationInfos = {} as InterrogationInfos

    await generatePdfStream(mockRes, mockSource, mockData, mockInterrogationInfos);

    expect(renderToStream).toHaveBeenCalledWith(
      expect.objectContaining({
        type: LunaticQuestionnaire,
        props: expect.objectContaining({
          source: mockSource,
          data: mockData,
          interrogationInfos: mockInterrogationInfos,
        }),
      })
    );

    expect(mockRes.setHeader).toHaveBeenCalledWith(
      "Content-Type",
      "application/pdf"
    );
    expect(mockRes.setHeader).toHaveBeenCalledWith(
      "Content-Disposition",
      "attachment; filename=export.pdf"
    );

    // Check that stream have been piped to response
    expect(mockPdfResult.pipe).toHaveBeenCalledWith(mockRes);

    // Vérifier que l'événement 'error' a été configuré
    expect(mockPdfResult.on).toHaveBeenCalledWith(
      "error",
      expect.any(Function)
    );
  });

  it("should handle PDF generation error", async () => {
    const mockError = new Error("Failed to generate PDF");
    mockPdfResult.on.mockImplementationOnce(
      (event: string, handler: Function) => {
        if (event === "error") {
          handler(mockError);
        }
      }
    );
    const mockSource = {} as LunaticSource;
    const mockData = {} as LunaticData;
    const mockInterrogationInfos = {} as InterrogationInfos

    await generatePdfStream(mockRes, mockSource, mockData, mockInterrogationInfos);

    // Check that handleError have been called with correct args
    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      code: ErrorCode.PDF_GENERATION_ERROR,
      message: "Failed to generate PDF.",
      details: { error: mockError.message },
    });
  });
});
