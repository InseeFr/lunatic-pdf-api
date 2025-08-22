import { SwaggerOptions } from "swagger-ui-express";
import { version } from '../../package.json'

export const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',

        info: {
            title: 'Lunatic-pdf-api',
            description: 'Lunatic-pdf-api Information',
            version: version,
        },
        servers: [
            {
                url: "http://localhost:8080"
            }
        ],
    },
    apis: ['./src/routes/*.ts']
} as SwaggerOptions