import express, { Request, Response } from "express";
import swaggerjsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import pdfRoute from "./routes/pdf.route";
import healthRoute from "./routes/health.route";
import { swaggerOptions } from "./config/swagger";
import helmet from "helmet";
import { initJwtMiddleware, jwtErrorHandler } from "./middleware/auth";
import config from "./config/config";
import { loggerAuthMiddleware, loggerMiddleware } from "./middleware/logger";

const swaggerDocs = swaggerjsdoc(swaggerOptions);

async function createServer() {
  const app = express();
  app.use(express.json({ limit: config.jsonBodyLimit }));
  // See: https://helmetjs.github.io/ add http security header
  app.use(helmet());

  // handle request logging
  app.use(loggerMiddleware);

  if (config.oidcEnabled) {
    // Initialize JWT middleware
    const jwtMiddleware = await initJwtMiddleware();
    // Apply JWT middlware for routes
    app.use(jwtMiddleware);
    // handle JWT error
    app.use(jwtErrorHandler);
    // handle auth logging
    app.use(loggerAuthMiddleware);
  }

  app.get("/", (_req: Request, res: Response) => {
    res.redirect("/api-docs");
  });
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  app.use("/api/pdf", pdfRoute);
  app.use("/api/healthcheck", healthRoute);

  return app;
}

export default createServer;
