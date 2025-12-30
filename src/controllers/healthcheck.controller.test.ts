import { describe, it, expect, beforeAll } from "vitest";
import request from "supertest";
import { Express } from "express";
import createServer from "../app";

describe("Healthcheck Controller", () => {
  let app: Express;

  beforeAll(async () => {
    app = await createServer();
  });

  it("should return a success response", async () => {
    const response = await request(app).get("/api/healthcheck");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({});
  });
});
