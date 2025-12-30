import { describe, it, expect, beforeAll, vi } from "vitest";
import request from "supertest";
import { Express } from "express";
import createServer from "../app";

// The ./example.js module will be replaced with
// the result of a factory function, and the
// original ./example.js module will never be called

describe("Pdf with source as URI Controller", () => {
  let app: Express;

  beforeAll(async () => {
    vi.mock("../config/config", async () => {
      return {
        default: {
          port: 8080,
          appScheme: "http",
          appHost: "localhost",
          trustUriDomains: [".trust-domain.test"],
          oidcEnabled: false,
          isProd: true,
        },
      };
    });

    app = await createServer();
  });

  it("should return a 400 response when no URI", async () => {
    const response = await request(app)
      .post("/api/pdf/generate-from-source")
      .send({});
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      code: "INVALID_URI",
      message: "Missing source URI",
    });
  });

  it("should return a 400 response when invalid URI", async () => {
    const response = await request(app)
      .post("/api/pdf/generate-from-source?source=MyFakeInvalidURI")
      .send({});
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      code: "INVALID_URI",
      details: { uri: "MyFakeInvalidURI" },
      message: "The provided URI is invalid.",
    });
  });

  it("should return a 403 response if host is not authorized", async () => {
    const response = await request(app)
      .post(
        "/api/pdf/generate-from-source?source=http://unauthorized.com/source"
      )
      .send({});

    expect(response.status).toBe(403);
    expect(response.body).toEqual({
      code: "UNAUTHORIZED_HOST",
      details: {
        host: "unauthorized.com",
      },
      message: "The host is not authorized.",
    });
  });
});
