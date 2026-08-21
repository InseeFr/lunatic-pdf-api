import path from "path";
import { SwaggerOptions } from "swagger-ui-express";
import { version } from "../../package.json";
import config from "./config";

const routes = ["../routes/health.route.ts", "../routes/pdf.route.ts"];

const routesPath = routes
  .map((route) => (config.isProd ? route.replace(/\.ts$/, ".js") : route))
  .map((route) => path.resolve(__dirname, route));

export const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",

    info: {
      title: "Lunatic-pdf-api",
      description: `Lunatic-pdf-api Information`,
      version,
    },
    servers: [
      {
        url: `${config.appScheme}://${config.appHost}`,
        description: "Generated server url from properties",
      },
    ],
    security: [{ bearerAuth: ["read", "write"] }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          name: "bearerAuth",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: routesPath,
} as SwaggerOptions;
