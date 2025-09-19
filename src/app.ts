import express, { Request, Response } from 'express';
import swaggerjsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import pdfRoute from './routes/pdf.route';
import healthRoute from './routes/health.route';
import { swaggerOptions } from './config/swagger';
import helmet from 'helmet';
import { initJwtMiddleware, jwtErrorHandler } from './middleware/auth';
import config from './config/config';


const swaggerDocs = swaggerjsdoc(swaggerOptions)

async function createServer() {
    const app = express();
    app.use(express.json());
    // See: https://helmetjs.github.io/ add http security header
    app.use(helmet());

    app.get("/", (_req: Request, res: Response) => {
        res.redirect("/api-docs");
    });

    if (config.oidcEnabled) {
        // Initialize JWT middleware
        const jwtMiddleware = await initJwtMiddleware();
        // Apply JWT middlware for routes
        app.use(
            jwtMiddleware.unless({
                path: [
                    /^\/api\/healthcheck/,   // exclude all routes start with /api/healthcheck
                    /^\/api-docs/,           // exclude swagger UI
                    "/",                     // exclude root (redirect to swagger-ui)
                ],
            })
        );
    }

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
    app.use('/api/pdf', pdfRoute);
    app.use('/api/healthcheck', healthRoute)

    // handle JWT error
    if (config.oidcEnabled) app.use(jwtErrorHandler);

    return app;
}

export default createServer;
