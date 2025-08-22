import path from "path";
import { SwaggerOptions } from "swagger-ui-express";
import { version } from '../../package.json'

const isProd = process.env.NODE_ENV === "production";

const routesPath = isProd
    ? path.resolve(__dirname, "../routes/*.js")
    : path.resolve(__dirname, "../routes/*.ts");

export const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',

        info: {
            title: 'Lunatic-pdf-api',
            description: `Lunatic-pdf-api Information`,
            version: version,
        },
        servers: [
            {
                url: "http://localhost:8080"
            }
        ],
    },
    apis: [routesPath],
} as SwaggerOptions